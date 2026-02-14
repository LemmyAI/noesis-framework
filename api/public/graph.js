/**
 * NOESIS Graph Engine — SVG-based graph renderer
 * Supports layered (narrative) and force-directed layouts
 */
window.GraphEngine = (() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs = {}, children = []) {
    const e = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    for (const c of children) {
      if (typeof c === 'string') e.appendChild(document.createTextNode(c));
      else e.appendChild(c);
    }
    return e;
  }

  // === LAYOUTS ===

  function layeredLayout(nodes, edges, width, height) {
    const pad = 80;

    // Assign entities to their first appearance sequence
    const nodeSeq = {};
    const seqSet = new Set();
    for (const edge of edges) {
      const seq = edge.narrative_sequence || 0;
      seqSet.add(seq);
      if (!(edge.from_entity in nodeSeq)) nodeSeq[edge.from_entity] = seq;
      if (!(edge.to_entity in nodeSeq)) nodeSeq[edge.to_entity] = Math.max(seq, (nodeSeq[edge.to_entity] || 0));
    }
    for (const n of nodes) {
      if (!(n.id in nodeSeq)) nodeSeq[n.id] = 0;
    }

    // Group by layer
    const layers = {};
    for (const n of nodes) {
      const l = nodeSeq[n.id] || 0;
      if (!layers[l]) layers[l] = [];
      layers[l].push(n);
    }

    const layerKeys = Object.keys(layers).map(Number).sort((a, b) => a - b);
    const numLayers = Math.max(layerKeys.length, 1);

    // Scale the canvas to fit — generous spacing
    const colSpacing = Math.max(160, (width - pad * 2) / Math.max(numLayers - 1, 1));
    const actualW = pad * 2 + colSpacing * (numLayers - 1);
    const maxPerLayer = Math.max(...Object.values(layers).map(l => l.length));
    const rowSpacing = Math.max(100, 80);
    const actualH = Math.max(height, pad * 2 + rowSpacing * (maxPerLayer - 1));

    const positions = {};
    layerKeys.forEach((lk, li) => {
      const group = layers[lk];
      const x = numLayers === 1 ? actualW / 2 : pad + li * colSpacing;
      const totalH = (group.length - 1) * rowSpacing;
      group.forEach((n, ni) => {
        const y = actualH / 2 + (group.length === 1 ? 0 : (ni - (group.length - 1) / 2) * rowSpacing);
        positions[n.id] = { x, y };
      });
    });

    return { positions, canvasW: actualW, canvasH: actualH };
  }

  function forceLayout(nodes, edges, width, height, fixedCenter = null) {
    // Scale parameters based on node count
    const n = nodes.length;
    const springLength = Math.max(150, 80 + n * 8);
    const repulsion = Math.max(2000, 600 * n);
    const springK = 0.003;
    const gravity = 0.015;
    const damping = 0.82;
    const iterations = Math.min(400, 150 + n * 10);
    const pad = 40;

    // Use a larger canvas for more nodes
    const scale = Math.max(1, n / 10);
    const W = width * scale;
    const H = height * scale;

    const pos = {};

    // Initialize in a circle
    nodes.forEach((node, i) => {
      if (fixedCenter && node.id === fixedCenter) {
        pos[node.id] = { x: W / 2, y: H / 2, vx: 0, vy: 0, fx: true };
      } else {
        const angle = (i / nodes.length) * Math.PI * 2;
        const r = springLength * 0.8 + Math.random() * 40;
        pos[node.id] = {
          x: W / 2 + Math.cos(angle) * r,
          y: H / 2 + Math.sin(angle) * r,
          vx: 0, vy: 0, fx: false,
        };
      }
    });

    // Simulate
    for (let iter = 0; iter < iterations; iter++) {
      const t = 1 - iter / iterations;
      const ids = Object.keys(pos);

      // Repulsion between all pairs
      for (let i = 0; i < ids.length; i++) {
        for (let j = i + 1; j < ids.length; j++) {
          const a = pos[ids[i]], b = pos[ids[j]];
          let dx = b.x - a.x, dy = b.y - a.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 1) { dist = 1; dx = Math.random() - 0.5; dy = Math.random() - 0.5; }
          const force = repulsion / (dist * dist) * t;
          const fx = (dx / dist) * force, fy = (dy / dist) * force;
          if (!a.fx) { a.vx -= fx; a.vy -= fy; }
          if (!b.fx) { b.vx += fx; b.vy += fy; }
        }
      }

      // Springs along edges
      for (const e of edges) {
        const a = pos[e.from_entity], b = pos[e.to_entity];
        if (!a || !b) continue;
        let dx = b.x - a.x, dy = b.y - a.y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (dist - springLength) * springK * t;
        const fx = (dx / dist) * force, fy = (dy / dist) * force;
        if (!a.fx) { a.vx += fx; a.vy += fy; }
        if (!b.fx) { b.vx -= fx; b.vy -= fy; }
      }

      // Gravity toward center
      for (const id of ids) {
        const p = pos[id];
        if (p.fx) continue;
        p.vx += (W / 2 - p.x) * gravity * t;
        p.vy += (H / 2 - p.y) * gravity * t;
      }

      // Update positions
      for (const id of ids) {
        const p = pos[id];
        if (p.fx) continue;
        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx;
        p.y += p.vy;
      }
    }

    // Compute bounding box and reframe
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of Object.values(pos)) {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    }

    const bw = maxX - minX + pad * 2;
    const bh = maxY - minY + pad * 2;
    const ox = minX - pad;
    const oy = minY - pad;

    // Shift positions to start from padding
    const positions = {};
    for (const [id, p] of Object.entries(pos)) {
      positions[id] = { x: p.x - ox, y: p.y - oy };
    }

    return { positions, canvasW: Math.max(bw, width), canvasH: Math.max(bh, height) };
  }

  // === RENDERING ===

  function render(container, nodes, edges, options = {}) {
    const {
      mode = 'force',
      fixedCenter = null,
      onNodeClick = null,
      colorMap = {},
      iconMap = {},
      selectedId = null,
    } = options;

    const rect = container.getBoundingClientRect();
    const displayW = rect.width || 600;
    const displayH = parseInt(container.style.height) || rect.height || 400;
    const nodeRadius = 22;
    const labelOffset = 30;

    // Deduplicate nodes
    const nodeMap = {};
    nodes.forEach(n => { nodeMap[n.id] = n; });
    const uniqueNodes = Object.values(nodeMap);

    // Compute layout
    const layout = mode === 'layered'
      ? layeredLayout(uniqueNodes, edges, displayW, displayH)
      : forceLayout(uniqueNodes, edges, displayW, displayH, fixedCenter);

    const { positions, canvasW, canvasH } = layout;

    // Create SVG
    const svg = el('svg', {
      viewBox: `0 0 ${canvasW} ${canvasH}`,
      width: '100%',
      height: '100%',
      preserveAspectRatio: 'xMidYMid meet',
    });

    // Defs: arrowhead + glow filter
    const defs = el('defs');
    defs.appendChild(el('marker', {
      id: 'arrow', viewBox: '0 0 10 10', refX: '10', refY: '5',
      markerWidth: '7', markerHeight: '7', orient: 'auto-start-reverse',
      fill: 'rgba(255,255,255,0.35)',
    }, [el('path', { d: 'M 0 0 L 10 5 L 0 10 z' })]));

    // Glow filter for selected
    const glow = el('filter', { id: 'glow', x: '-50%', y: '-50%', width: '200%', height: '200%' });
    const blur = el('feGaussianBlur', { stdDeviation: '4', result: 'blur' });
    const merge = el('feMerge', {}, [
      el('feMergeNode', { in: 'blur' }),
      el('feMergeNode', { in: 'SourceGraphic' }),
    ]);
    glow.appendChild(blur);
    glow.appendChild(merge);
    defs.appendChild(glow);
    svg.appendChild(defs);

    // Background (for pan detection)
    svg.appendChild(el('rect', {
      width: canvasW, height: canvasH, fill: 'transparent',
    }));

    // === EDGES ===
    const edgeGroup = el('g', { class: 'edges' });
    for (const edge of edges) {
      const from = positions[edge.from_entity];
      const to = positions[edge.to_entity];
      if (!from || !to) continue;

      const dx = to.x - from.x, dy = to.y - from.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const r = nodeRadius;
      const sx = from.x + (dx / dist) * (r + 2);
      const sy = from.y + (dy / dist) * (r + 2);
      const ex = to.x - (dx / dist) * (r + 8);
      const ey = to.y - (dy / dist) * (r + 8);

      // Curved edge for parallel edges
      const isDashed = edge.type === 'contradicts';
      const line = el('line', {
        x1: sx, y1: sy, x2: ex, y2: ey,
        stroke: isDashed ? 'rgba(217,74,74,0.3)' : 'rgba(255,255,255,0.12)',
        'stroke-width': edge.context ? '2' : '1.5',
        'stroke-dasharray': isDashed ? '6,4' : 'none',
        'marker-end': 'url(#arrow)',
      });
      edgeGroup.appendChild(line);

      // Edge label at midpoint
      const mx = (sx + ex) / 2, my = (sy + ey) / 2;
      // Offset label perpendicular to edge to avoid overlap
      const perpX = -dy / dist * 10;
      const perpY = dx / dist * 10;
      edgeGroup.appendChild(el('text', {
        x: mx + perpX, y: my + perpY,
        'text-anchor': 'middle',
        'font-size': '9',
        fill: 'rgba(255,255,255,0.3)',
      }, [edge.type || '']));
    }
    svg.appendChild(edgeGroup);

    // === NODES ===
    const nodeGroup = el('g', { class: 'nodes' });
    for (const node of uniqueNodes) {
      const p = positions[node.id];
      if (!p) continue;

      const color = colorMap[node.type] || '#555';
      const nodeIcon = iconMap[node.type] || '●';
      const isSelected = node.id === selectedId;

      const g = el('g', {
        transform: `translate(${p.x},${p.y})`,
        style: 'cursor:pointer',
      });

      // Glow ring for selected
      if (isSelected) {
        g.appendChild(el('circle', {
          r: nodeRadius + 8,
          fill: 'none', stroke: color, 'stroke-width': '2', opacity: '0.5',
          filter: 'url(#glow)',
        }));
      }

      // Shadow
      g.appendChild(el('circle', {
        r: nodeRadius, fill: 'rgba(0,0,0,0.4)',
        transform: 'translate(2,2)',
      }));

      // Main circle
      g.appendChild(el('circle', {
        r: nodeRadius,
        fill: color,
        opacity: isSelected ? '1' : '0.9',
        stroke: isSelected ? '#fff' : 'rgba(255,255,255,0.15)',
        'stroke-width': isSelected ? '2' : '1',
      }));

      // Icon
      g.appendChild(el('text', {
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
        'font-size': '14',
        fill: '#fff',
      }, [nodeIcon]));

      // Label — wrap long names
      const name = node.name || node.id;
      const maxLen = 20;
      if (name.length <= maxLen) {
        g.appendChild(el('text', {
          y: labelOffset,
          'text-anchor': 'middle',
          'font-size': '10',
          fill: isSelected ? '#fff' : 'rgba(255,255,255,0.65)',
          'font-weight': isSelected ? '600' : '400',
        }, [name]));
      } else {
        // Split into two lines
        const mid = name.lastIndexOf(' ', maxLen);
        const line1 = mid > 0 ? name.substring(0, mid) : name.substring(0, maxLen);
        const line2 = mid > 0 ? name.substring(mid + 1) : name.substring(maxLen);
        const shortLine2 = line2.length > maxLen ? line2.substring(0, maxLen - 1) + '…' : line2;
        g.appendChild(el('text', {
          y: labelOffset,
          'text-anchor': 'middle',
          'font-size': '10',
          fill: isSelected ? '#fff' : 'rgba(255,255,255,0.65)',
          'font-weight': isSelected ? '600' : '400',
        }, [line1]));
        g.appendChild(el('text', {
          y: labelOffset + 12,
          'text-anchor': 'middle',
          'font-size': '10',
          fill: isSelected ? '#fff' : 'rgba(255,255,255,0.5)',
        }, [shortLine2]));
      }

      // Hover tooltip
      g.addEventListener('mouseenter', (ev) => {
        let tooltip = container.querySelector('.graph-tooltip');
        if (!tooltip) {
          tooltip = document.createElement('div');
          tooltip.className = 'graph-tooltip';
          container.appendChild(tooltip);
        }
        tooltip.innerHTML = `<div class="tt-name">${nodeIcon} ${(node.name || node.id).replace(/</g, '&lt;')}</div>
          <div class="tt-meta">${(node.type || '')} · ${(node.namespace || '')}</div>`;
        tooltip.classList.add('visible');
        const cr = container.getBoundingClientRect();
        const mx = ev.clientX - cr.left + 12;
        const my = ev.clientY - cr.top - 40;
        tooltip.style.left = Math.min(mx, cr.width - 260) + 'px';
        tooltip.style.top = Math.max(my, 4) + 'px';
      });
      g.addEventListener('mouseleave', () => {
        const tooltip = container.querySelector('.graph-tooltip');
        if (tooltip) tooltip.classList.remove('visible');
      });

      if (onNodeClick) {
        g.addEventListener('click', (ev) => { ev.stopPropagation(); onNodeClick(node); });
      }
      nodeGroup.appendChild(g);
    }
    svg.appendChild(nodeGroup);

    // === MOUNT ===
    container.innerHTML = '';
    container.appendChild(svg);

    // === INTERACTIONS: Pan & Zoom ===
    let vb = { x: 0, y: 0, w: canvasW, h: canvasH };
    let isPanning = false, panStart = { x: 0, y: 0 };

    function setVB() { svg.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`); }

    function toSVG(cx, cy) {
      const r = container.getBoundingClientRect();
      return {
        x: vb.x + (cx - r.left) / r.width * vb.w,
        y: vb.y + (cy - r.top) / r.height * vb.h,
      };
    }

    // Wheel zoom
    container.addEventListener('wheel', (ev) => {
      ev.preventDefault();
      const scale = ev.deltaY > 0 ? 1.12 : 0.89;
      const p = toSVG(ev.clientX, ev.clientY);
      vb.x = p.x - (p.x - vb.x) * scale;
      vb.y = p.y - (p.y - vb.y) * scale;
      vb.w *= scale;
      vb.h *= scale;
      setVB();
    }, { passive: false });

    // Mouse pan
    container.addEventListener('mousedown', (ev) => {
      if (ev.target.closest('g[style*="cursor"]')) return; // Don't pan on node click
      isPanning = true;
      panStart = { x: ev.clientX, y: ev.clientY };
      container.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', (ev) => {
      if (!isPanning) return;
      const r = container.getBoundingClientRect();
      const dx = (ev.clientX - panStart.x) / r.width * vb.w;
      const dy = (ev.clientY - panStart.y) / r.height * vb.h;
      vb.x -= dx; vb.y -= dy;
      panStart = { x: ev.clientX, y: ev.clientY };
      setVB();
    });
    window.addEventListener('mouseup', () => { isPanning = false; container.style.cursor = ''; });

    // Touch pan & pinch
    let lastTouches = [];
    container.addEventListener('touchstart', (ev) => {
      lastTouches = [...ev.touches];
      if (ev.touches.length === 1) {
        isPanning = true;
        panStart = { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
      }
    }, { passive: true });

    container.addEventListener('touchmove', (ev) => {
      if (ev.touches.length === 1 && isPanning) {
        const r = container.getBoundingClientRect();
        const t = ev.touches[0];
        const dx = (t.clientX - panStart.x) / r.width * vb.w;
        const dy = (t.clientY - panStart.y) / r.height * vb.h;
        vb.x -= dx; vb.y -= dy;
        panStart = { x: t.clientX, y: t.clientY };
        setVB();
      } else if (ev.touches.length === 2 && lastTouches.length === 2) {
        const oldD = Math.hypot(lastTouches[0].clientX - lastTouches[1].clientX, lastTouches[0].clientY - lastTouches[1].clientY);
        const newD = Math.hypot(ev.touches[0].clientX - ev.touches[1].clientX, ev.touches[0].clientY - ev.touches[1].clientY);
        if (oldD > 0) {
          const scale = oldD / newD;
          const cx = (ev.touches[0].clientX + ev.touches[1].clientX) / 2;
          const cy = (ev.touches[0].clientY + ev.touches[1].clientY) / 2;
          const p = toSVG(cx, cy);
          vb.x = p.x - (p.x - vb.x) * scale;
          vb.y = p.y - (p.y - vb.y) * scale;
          vb.w *= scale; vb.h *= scale;
          setVB();
        }
        lastTouches = [...ev.touches];
      }
    }, { passive: true });

    container.addEventListener('touchend', () => { isPanning = false; lastTouches = []; });

    return svg;
  }

  return { render };
})();
