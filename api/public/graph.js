/**
 * NOESIS Graph Engine — SVG-based graph renderer
 * Supports layered (narrative) and force-directed layouts
 */
window.GraphEngine = (() => {
  const DEFAULTS = {
    nodeRadius: 24,
    fontSize: 11,
    labelOffset: 32,
    arrowSize: 8,
    padding: 60,
    springLength: 120,
    springK: 0.004,
    repulsion: 800,
    gravity: 0.02,
    damping: 0.85,
    iterations: 200,
  };

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
    const pad = DEFAULTS.padding;
    // Assign layers by narrative_sequence
    const seqs = [...new Set(edges.map(e => e.narrative_sequence || 0))].sort((a, b) => a - b);
    const seqMap = {};
    seqs.forEach((s, i) => seqMap[s] = i);

    // Assign entities to their first appearance sequence
    const nodeSeq = {};
    for (const edge of edges) {
      const seq = edge.narrative_sequence || 0;
      if (!(edge.from_entity in nodeSeq)) nodeSeq[edge.from_entity] = seq;
      if (!(edge.to_entity in nodeSeq)) nodeSeq[edge.to_entity] = Math.max(seq, (nodeSeq[edge.to_entity] || 0));
    }
    // Entities not in edges get last layer
    for (const n of nodes) {
      if (!(n.id in nodeSeq)) nodeSeq[n.id] = seqs.length;
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
    const usableW = width - pad * 2;
    const usableH = height - pad * 2;
    const positions = {};

    layerKeys.forEach((lk, li) => {
      const group = layers[lk];
      const x = numLayers === 1 ? width / 2 : pad + (li / (numLayers - 1)) * usableW;
      group.forEach((n, ni) => {
        const spread = group.length === 1 ? 0 : (ni / (group.length - 1) - 0.5) * usableH * 0.8;
        positions[n.id] = { x, y: height / 2 + spread };
      });
    });

    return positions;
  }

  function forceLayout(nodes, edges, width, height, fixedCenter = null) {
    const O = DEFAULTS;
    const pos = {};

    // Initialize positions
    nodes.forEach((n, i) => {
      if (fixedCenter && n.id === fixedCenter) {
        pos[n.id] = { x: width / 2, y: height / 2, fx: true };
      } else {
        const angle = (i / nodes.length) * Math.PI * 2;
        const r = 100 + Math.random() * 60;
        pos[n.id] = {
          x: width / 2 + Math.cos(angle) * r,
          y: height / 2 + Math.sin(angle) * r,
          vx: 0, vy: 0, fx: false,
        };
      }
    });

    // Build adjacency
    const adj = {};
    for (const n of nodes) adj[n.id] = new Set();
    for (const e of edges) {
      if (adj[e.from_entity]) adj[e.from_entity].add(e.to_entity);
      if (adj[e.to_entity]) adj[e.to_entity].add(e.from_entity);
    }

    // Simulate
    for (let iter = 0; iter < O.iterations; iter++) {
      const t = 1 - iter / O.iterations; // cooling

      // Repulsion between all pairs
      const ids = Object.keys(pos);
      for (let i = 0; i < ids.length; i++) {
        for (let j = i + 1; j < ids.length; j++) {
          const a = pos[ids[i]], b = pos[ids[j]];
          let dx = b.x - a.x, dy = b.y - a.y;
          let dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = O.repulsion / (dist * dist) * t;
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
        const force = (dist - O.springLength) * O.springK * t;
        const fx = (dx / dist) * force, fy = (dy / dist) * force;
        if (!a.fx) { a.vx += fx; a.vy += fy; }
        if (!b.fx) { b.vx -= fx; b.vy -= fy; }
      }

      // Gravity toward center
      for (const id of ids) {
        const p = pos[id];
        if (p.fx) continue;
        p.vx += (width / 2 - p.x) * O.gravity * t;
        p.vy += (height / 2 - p.y) * O.gravity * t;
      }

      // Update positions
      for (const id of ids) {
        const p = pos[id];
        if (p.fx) continue;
        p.vx *= O.damping;
        p.vy *= O.damping;
        p.x += p.vx;
        p.y += p.vy;
        // Keep in bounds
        p.x = Math.max(O.padding, Math.min(width - O.padding, p.x));
        p.y = Math.max(O.padding, Math.min(height - O.padding, p.y));
      }
    }

    return pos;
  }

  // === RENDERING ===

  function render(container, nodes, edges, options = {}) {
    const {
      mode = 'force',
      fixedCenter = null,
      onNodeClick = null,
      onEdgeClick = null,
      colorMap = {},
      iconMap = {},
      selectedId = null,
    } = options;

    const rect = container.getBoundingClientRect();
    const W = rect.width || 600;
    const H = parseInt(container.style.height) || rect.height || 400;

    // Deduplicate nodes
    const nodeMap = {};
    nodes.forEach(n => { nodeMap[n.id] = n; });
    const uniqueNodes = Object.values(nodeMap);

    // Compute layout
    const positions = mode === 'layered'
      ? layeredLayout(uniqueNodes, edges, W, H)
      : forceLayout(uniqueNodes, edges, W, H, fixedCenter);

    // Create SVG
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H });

    // Defs: arrowhead
    const defs = el('defs');
    const marker = el('marker', {
      id: 'arrow', viewBox: '0 0 10 10', refX: '10', refY: '5',
      markerWidth: '8', markerHeight: '8', orient: 'auto-start-reverse',
      fill: 'rgba(255,255,255,0.3)',
    }, [el('path', { d: 'M 0 0 L 10 5 L 0 10 z' })]);
    defs.appendChild(marker);
    svg.appendChild(defs);

    // Edge group
    const edgeGroup = el('g', { class: 'edges' });
    for (const edge of edges) {
      const from = positions[edge.from_entity];
      const to = positions[edge.to_entity];
      if (!from || !to) continue;

      // Calculate offset for arrowhead (stop at node boundary)
      const dx = to.x - from.x, dy = to.y - from.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const r = DEFAULTS.nodeRadius;
      const sx = from.x + (dx / dist) * r;
      const sy = from.y + (dy / dist) * r;
      const ex = to.x - (dx / dist) * (r + 6);
      const ey = to.y - (dy / dist) * (r + 6);

      const isDashed = edge.type === 'contradicts';
      const line = el('line', {
        x1: sx, y1: sy, x2: ex, y2: ey,
        stroke: 'rgba(255,255,255,0.15)',
        'stroke-width': edge.context ? '2' : '1.5',
        'stroke-dasharray': isDashed ? '6,4' : 'none',
        'marker-end': 'url(#arrow)',
        'data-edge-id': edge.id || '',
        style: 'cursor:pointer',
      });

      if (onEdgeClick) {
        line.addEventListener('click', (ev) => { ev.stopPropagation(); onEdgeClick(edge); });
      }
      edgeGroup.appendChild(line);

      // Edge label
      const mx = (sx + ex) / 2, my = (sy + ey) / 2;
      const label = el('text', {
        x: mx, y: my - 5,
        'text-anchor': 'middle',
        'font-size': '9',
        fill: 'rgba(255,255,255,0.35)',
      }, [edge.type || '']);
      edgeGroup.appendChild(label);
    }
    svg.appendChild(edgeGroup);

    // Node group
    const nodeGroup = el('g', { class: 'nodes' });
    for (const node of uniqueNodes) {
      const p = positions[node.id];
      if (!p) continue;

      const color = colorMap[node.type] || '#666';
      const icon = iconMap[node.type] || '●';
      const isSelected = node.id === selectedId;
      const g = el('g', {
        transform: `translate(${p.x},${p.y})`,
        style: 'cursor:pointer',
        'data-node-id': node.id,
      });

      // Glow for selected
      if (isSelected) {
        g.appendChild(el('circle', {
          r: DEFAULTS.nodeRadius + 6,
          fill: 'none',
          stroke: color,
          'stroke-width': '2',
          opacity: '0.4',
        }));
      }

      // Node circle
      g.appendChild(el('circle', {
        r: isSelected ? DEFAULTS.nodeRadius + 2 : DEFAULTS.nodeRadius,
        fill: color,
        opacity: isSelected ? '1' : '0.85',
        stroke: 'rgba(255,255,255,0.1)',
        'stroke-width': '1',
      }));

      // Icon
      g.appendChild(el('text', {
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
        'font-size': '16',
        fill: '#fff',
      }, [icon]));

      // Label
      const name = node.name || node.id;
      const shortName = name.length > 22 ? name.substring(0, 20) + '…' : name;
      g.appendChild(el('text', {
        y: DEFAULTS.labelOffset,
        'text-anchor': 'middle',
        'font-size': DEFAULTS.fontSize,
        fill: isSelected ? '#fff' : 'rgba(255,255,255,0.7)',
        'font-weight': isSelected ? '600' : '400',
      }, [shortName]));

      if (onNodeClick) {
        g.addEventListener('click', (ev) => { ev.stopPropagation(); onNodeClick(node); });
      }

      nodeGroup.appendChild(g);
    }
    svg.appendChild(nodeGroup);

    // Clear container and add SVG
    container.innerHTML = '';
    container.appendChild(svg);

    // === INTERACTIONS: Pan & Zoom ===
    let viewBox = { x: 0, y: 0, w: W, h: H };
    let isPanning = false, panStart = { x: 0, y: 0 };

    function setViewBox() {
      svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    }

    function toSVG(clientX, clientY) {
      const r = container.getBoundingClientRect();
      return {
        x: viewBox.x + (clientX - r.left) / r.width * viewBox.w,
        y: viewBox.y + (clientY - r.top) / r.height * viewBox.h,
      };
    }

    // Wheel zoom
    container.addEventListener('wheel', (ev) => {
      ev.preventDefault();
      const scale = ev.deltaY > 0 ? 1.1 : 0.9;
      const p = toSVG(ev.clientX, ev.clientY);
      viewBox.x = p.x - (p.x - viewBox.x) * scale;
      viewBox.y = p.y - (p.y - viewBox.y) * scale;
      viewBox.w *= scale;
      viewBox.h *= scale;
      setViewBox();
    }, { passive: false });

    // Mouse pan
    container.addEventListener('mousedown', (ev) => {
      if (ev.target === svg || ev.target.tagName === 'svg') {
        isPanning = true;
        panStart = { x: ev.clientX, y: ev.clientY };
      }
    });
    window.addEventListener('mousemove', (ev) => {
      if (!isPanning) return;
      const r = container.getBoundingClientRect();
      const dx = (ev.clientX - panStart.x) / r.width * viewBox.w;
      const dy = (ev.clientY - panStart.y) / r.height * viewBox.h;
      viewBox.x -= dx;
      viewBox.y -= dy;
      panStart = { x: ev.clientX, y: ev.clientY };
      setViewBox();
    });
    window.addEventListener('mouseup', () => { isPanning = false; });

    // Touch pan & pinch zoom
    let touches = [];
    container.addEventListener('touchstart', (ev) => {
      touches = [...ev.touches];
      if (ev.touches.length === 1) {
        isPanning = true;
        panStart = { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
      }
    }, { passive: true });

    container.addEventListener('touchmove', (ev) => {
      if (ev.touches.length === 1 && isPanning) {
        const r = container.getBoundingClientRect();
        const t = ev.touches[0];
        const dx = (t.clientX - panStart.x) / r.width * viewBox.w;
        const dy = (t.clientY - panStart.y) / r.height * viewBox.h;
        viewBox.x -= dx;
        viewBox.y -= dy;
        panStart = { x: t.clientX, y: t.clientY };
        setViewBox();
      } else if (ev.touches.length === 2 && touches.length === 2) {
        const oldDist = Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
        const newDist = Math.hypot(ev.touches[0].clientX - ev.touches[1].clientX, ev.touches[0].clientY - ev.touches[1].clientY);
        const scale = oldDist / newDist;
        const cx = (ev.touches[0].clientX + ev.touches[1].clientX) / 2;
        const cy = (ev.touches[0].clientY + ev.touches[1].clientY) / 2;
        const p = toSVG(cx, cy);
        viewBox.x = p.x - (p.x - viewBox.x) * scale;
        viewBox.y = p.y - (p.y - viewBox.y) * scale;
        viewBox.w *= scale;
        viewBox.h *= scale;
        setViewBox();
        touches = [...ev.touches];
      }
    }, { passive: true });

    container.addEventListener('touchend', () => { isPanning = false; touches = []; });

    return svg;
  }

  return { render, layeredLayout, forceLayout };
})();
