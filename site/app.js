/**
 * NOESIS Explorer — Main Application
 * Hash-based SPA, data-agnostic, mobile-first
 */
(() => {
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const API = '/api';

  // === TYPE ICONS ===
  const TYPE_ICONS = {
    Event: '⚡', Decision: '⚖️', Fact: '✓', Claim: '💬', System: '⚙️',
    Goal: '🎯', Concept: '💡', Person: '👤', Organization: '🏢',
    Article: '📰', Source: '📡', Topic: '🏷️', Asset: '💎', Token: '🪙',
    Trade: '📊', Policy: '📜', Sector: '📁', Protocol: '🔗',
    Conflict: '⚔️', Treaty: '🤝', Report: '📋', Indicator: '📈',
    DEX: '🔄', Chain: '⛓️', Sanction: '🚫', Alliance: '🤝',
  };

  // Credibility colors — loaded from namespace config at runtime
  let credColorMap = {};

  // === STATE ===
  let state = {
    namespaces: [],
    nsConfigs: {},
    colorMap: {},
    activeNs: null,
  };

  // === API HELPERS ===
  async function api(path) {
    const res = await fetch(API + path);
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  }

  // === HELPERS ===
  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function icon(type) { return TYPE_ICONS[type] || '●'; }

  function formatTemporal(t) {
    if (!t || !t.timestamp) return '';
    const d = new Date(t.timestamp);
    const p = t.precision || 'second';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (p === 'year') return `${d.getUTCFullYear()}`;
    if (p === 'month') return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
    if (p === 'day') return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
    if (p === 'hour') return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()} ${d.getUTCHours()}h`;
    return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()} ${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}`;
  }

  function credDot(c) {
    const conf = c?.confidence || 'medium';
    const color = credColorMap[conf] || '#888';
    return `<span class="cred-dot" style="background:${color}" title="${conf}"></span>`;
  }

  function typeColor(type) { return state.colorMap[type] || '#666'; }

  function entityCard(entity, opts = {}) {
    const c = typeColor(entity.type);
    return `<div class="card accent-left" style="--type-color:${c}" onclick="window.location.hash='#/entity/${entity.id}'">
      <div class="card-title">${icon(entity.type)} ${esc(entity.name)}</div>
      <div class="card-meta">
        <span class="type-badge">${esc(entity.type)}</span>
        ${credDot(entity.credibility)}
        <span>${esc(entity.namespace)}</span>
        ${entity.temporal ? `<span>· ${formatTemporal(entity.temporal)}</span>` : ''}
      </div>
      ${opts.excerpt ? `<div class="card-excerpt">${esc(opts.excerpt)}</div>` : ''}
    </div>`;
  }

  // === INIT: LOAD NAMESPACES & COLORS ===
  async function init() {
    const [nsData, configData] = await Promise.all([
      api('/namespaces'),
      api('/namespaces/default/config'),
    ]);
    state.namespaces = nsData.namespaces || [];
    state.nsConfigs['default'] = configData;
    state.colorMap = { ...(configData.colors?.types || {}) };
    credColorMap = { ...(configData.colors?.credibility || {}) };

    // Load child namespace colors
    for (const ns of state.namespaces) {
      if (ns.namespace !== 'default') {
        try {
          const cfg = await api(`/namespaces/${encodeURIComponent(ns.namespace)}/config`);
          state.nsConfigs[ns.namespace] = cfg;
          Object.assign(state.colorMap, cfg.colors?.types || {});
        } catch (e) { /* skip */ }
      }
    }

    renderNsPills();
    buildLegend();
    route();
  }

  // === NAMESPACE PILLS ===
  function renderNsPills() {
    const el = $('#ns-pills');
    el.innerHTML = state.namespaces.map(ns => {
      const active = ns.namespace === state.activeNs ? ' active' : '';
      return `<div class="pill${active}" onclick="window.location.hash='#/ns/${encodeURIComponent(ns.namespace)}'">
        <span class="dot" style="background:${ns.namespace === 'default' ? '#888' : typeColor(ns.namespace === 'news' ? 'Article' : ns.namespace === 'finance' ? 'Asset' : ns.namespace === 'geopolitics' ? 'Policy' : ns.namespace === 'finance.crypto' ? 'Token' : 'Concept')}"></span>
        ${esc(ns.namespace)}
      </div>`;
    }).join('');
  }

  // === BREADCRUMB ===
  function setBreadcrumb(items) {
    const el = $('#breadcrumb');
    el.innerHTML = items.map((item, i) => {
      if (i === items.length - 1) return `<span class="current">${esc(item.label)}</span>`;
      return `<a href="${item.href}">${esc(item.label)}</a><span class="sep">›</span>`;
    }).join('');
  }

  // === LOADING ===
  function showLoading() {
    $('#app').innerHTML = '<div class="loading"><div class="spinner"></div> Loading…</div>';
  }

  // === ROUTER ===
  function route() {
    const hash = window.location.hash || '#/';
    const parts = hash.slice(2).split('/');
    const view = parts[0] || '';

    showLoading();

    if (view === '' || view === '/') return viewHome();
    if (view === 'ns') return viewNamespace(decodeURIComponent(parts[1] || 'default'));
    if (view === 'entity') return viewEntity(parts[1]);
    if (view === 'narrative') return viewNarrative(decodeURIComponent(parts.slice(1).join('/')));
    if (view === 'graph') return viewGraph(parts[1]);
    if (view === 'key') return viewKey(decodeURIComponent(parts.slice(1).join('/')));

    $('#app').innerHTML = '<div class="empty-state">View not found</div>';
  }

  window.addEventListener('hashchange', route);

  // === VIEW: HOME ===
  async function viewHome() {
    state.activeNs = null;
    renderNsPills();
    setBreadcrumb([{ label: 'Home', href: '#/' }]);

    const [narrativesData, entitiesData] = await Promise.all([
      api('/narratives'),
      api('/entities'),
    ]);

    const narratives = narrativesData.narratives || [];
    const entities = entitiesData.entities || [];

    // Count per namespace
    const nsCounts = {};
    entities.forEach(e => { nsCounts[e.namespace] = (nsCounts[e.namespace] || 0) + 1; });

    // Sort entities by temporal desc
    const sorted = [...entities].sort((a, b) => {
      const ta = a.temporal?.timestamp || '';
      const tb = b.temporal?.timestamp || '';
      return tb.localeCompare(ta);
    });

    let html = '';

    // Narratives
    if (narratives.length > 0) {
      html += `<div class="section-header"><span class="icon">📖</span> Narratives</div>`;
      html += `<div class="stack">`;
      for (const n of narratives) {
        html += `<div class="card narrative-card" onclick="window.location.hash='#/narrative/${encodeURIComponent(n.context)}'">
          <div class="nar-title">⚡ ${esc(n.context)}</div>
          <div class="nar-meta">${n.relation_count} steps · ${n.max_sequence - n.min_sequence + 1} sequence points</div>
          <span class="nar-cta">Explore Story →</span>
        </div>`;
      }
      html += `</div>`;
    }

    // Namespaces grid
    const childNs = state.namespaces.filter(ns => ns.namespace !== 'default');
    if (childNs.length > 0) {
      html += `<div class="section-header"><span class="icon">🗂</span> Namespaces</div>`;
      html += `<div class="grid-fill">`;
      for (const ns of childNs) {
        const count = nsCounts[ns.namespace] || 0;
        const nsIcon = icon(ns.namespace === 'news' ? 'Article' : ns.namespace === 'finance' ? 'Asset' : ns.namespace === 'geopolitics' ? 'Policy' : ns.namespace === 'finance.crypto' ? 'Token' : 'Concept');
        html += `<div class="card ns-card" onclick="window.location.hash='#/ns/${encodeURIComponent(ns.namespace)}'">
          <div class="ns-icon">${nsIcon}</div>
          <div class="ns-name">${esc(ns.namespace)}</div>
          <div class="ns-count">${count} entities</div>
        </div>`;
      }
      html += `</div>`;
    }

    // Recent entities
    html += `<div class="section-header"><span class="icon">🕐</span> Recent Entities</div>`;
    html += `<div class="stack">`;
    for (const e of sorted.slice(0, 12)) {
      html += entityCard(e);
    }
    html += `</div>`;

    $('#app').innerHTML = html;
    updateLegend(sorted, []);
  }

  // === VIEW: NAMESPACE ===
  async function viewNamespace(ns) {
    state.activeNs = ns;
    renderNsPills();
    setBreadcrumb([
      { label: 'Home', href: '#/' },
      { label: ns, href: `#/ns/${encodeURIComponent(ns)}` },
    ]);

    const [entData, cfgData] = await Promise.all([
      api(`/entities?namespace=${encodeURIComponent(ns)}`),
      api(`/namespaces/${encodeURIComponent(ns)}/config`).catch(() => null),
    ]);

    const entities = entData.entities || [];

    // Group by type
    const groups = {};
    entities.forEach(e => {
      if (!groups[e.type]) groups[e.type] = [];
      groups[e.type].push(e);
    });

    let html = '';

    if (cfgData) {
      const extendsLabel = cfgData.chain ? cfgData.chain.join(' → ') : '';
      html += `<div style="font-size:0.85rem;color:var(--text-dim);margin-bottom:16px;">
        Extends: ${esc(extendsLabel)}<br>
        ${entities.length} entities across ${Object.keys(groups).length} types
      </div>`;
    }

    for (const [type, items] of Object.entries(groups).sort((a, b) => b[1].length - a[1].length)) {
      const c = typeColor(type);
      html += `<div class="type-group-header">
        <span class="color-dot" style="background:${c}"></span>
        ${icon(type)} ${esc(type)}
        <span class="count">${items.length}</span>
      </div>`;
      html += `<div class="stack" style="margin-bottom:16px;">`;
      for (const e of items) html += entityCard(e);
      html += `</div>`;
    }

    if (entities.length === 0) {
      html = '<div class="empty-state">No entities in this namespace</div>';
    }

    $('#app').innerHTML = html;
    updateLegend(entities, []);
  }

  // === VIEW: ENTITY DETAIL ===
  async function viewEntity(id) {
    state.activeNs = null;
    renderNsPills();

    const [entity, relData, dlData] = await Promise.all([
      api(`/entities/${encodeURIComponent(id)}`),
      api(`/relations?entity=${encodeURIComponent(id)}&depth=1`),
      api(`/datalayer/by-entity/${encodeURIComponent(id)}`).catch(() => ({ sources: [] })),
    ]);

    setBreadcrumb([
      { label: 'Home', href: '#/' },
      { label: entity.namespace, href: `#/ns/${encodeURIComponent(entity.namespace)}` },
      { label: entity.name, href: `#/entity/${id}` },
    ]);

    const c = typeColor(entity.type);
    let html = '';

    // Header
    html += `<div class="entity-header">
      <div class="entity-name" style="color:${c}">${icon(entity.type)} ${esc(entity.name)}</div>
      <div class="entity-info">
        <span class="type-badge" style="border:1px solid ${c}40">${esc(entity.type)}</span>
        ${credDot(entity.credibility)}
        <span>${esc(entity.credibility?.confidence || 'medium')}</span>
        <span>· ${esc(entity.namespace)}</span>
        ${entity.temporal ? `<span>· ${formatTemporal(entity.temporal)}</span>` : ''}
      </div>
      ${entity.key ? `<div class="entity-key" onclick="window.location.hash='#/key/${encodeURIComponent(entity.key)}'">🔑 ${esc(entity.key)}</div>` : ''}
    </div>`;

    // Load all entities for lookup (needed by graph + relations)
    const relations = relData.relations || [];
    const allEntData = await api('/entities');
    const entityLookup = {};
    (allEntData.entities || []).forEach(e => { entityLookup[e.id] = e; });
    entityLookup[id] = entity;

    // Mini graph
    if (relations.length > 0) {
      // Collect graph nodes
      const nodeIds = new Set([id]);
      relations.forEach(r => { nodeIds.add(r.from_entity); nodeIds.add(r.to_entity); });

      const graphNodes = [...nodeIds].map(nid => entityLookup[nid] || { id: nid, name: nid, type: 'Concept', namespace: '' });

      html += `<div class="graph-container mini" id="entity-graph"></div>`;
      html += `<div class="expand-link" onclick="window.location.hash='#/graph/${id}'">Expand full graph →</div>`;

      // Update legend for this entity's graph
      updateLegend(graphNodes, relations);

      // Render after DOM update
      setTimeout(() => {
        const container = document.getElementById('entity-graph');
        if (!container) return;
        window.GraphEngine.render(container, graphNodes, relations, {
          mode: 'force',
          fixedCenter: id,
          colorMap: state.colorMap,
          iconMap: TYPE_ICONS,
          credColorMap: credColorMap,
          selectedId: id,
          onNodeClick: (node) => { if (node.id !== id) window.location.hash = `#/entity/${node.id}`; },
        });
      }, 50);
    }

    // Metadata
    if (entity.metadata && Object.keys(entity.metadata).length > 0) {
      html += `<div class="section-header"><span class="icon">📋</span> Metadata</div>`;
      html += `<div class="metadata-grid">`;
      for (const [k, v] of Object.entries(entity.metadata)) {
        html += `<span class="key">${esc(k)}</span><span class="val">${esc(typeof v === 'object' ? JSON.stringify(v) : String(v))}</span>`;
      }
      html += `</div>`;
    }

    // Relations grouped by direction
    if (relations.length > 0) {
      html += `<div class="section-header"><span class="icon">🔗</span> Relations <span style="font-weight:400;text-transform:none;letter-spacing:0">(${relations.length})</span></div>`;

      // Group: incoming (this entity is to_entity) vs outgoing
      const incoming = [], outgoing = [];
      for (const r of relations) {
        if (r.to_entity === id) incoming.push(r);
        else if (r.from_entity === id) outgoing.push(r);
        else {
          // Related but indirect — show as outgoing
          outgoing.push(r);
        }
      }

      // Get inverse names from config
      const relConfig = state.nsConfigs['default']?.relations || {};

      function renderRelGroup(label, rels, getId) {
        if (rels.length === 0) return '';
        // Sub-group by type
        const byType = {};
        rels.forEach(r => {
          const key = label === 'incoming' ? (relConfig[r.type]?.inverse || r.type) : r.type;
          if (!byType[key]) byType[key] = [];
          byType[key].push(r);
        });
        let out = '';
        for (const [type, group] of Object.entries(byType)) {
          out += `<div class="rel-group-header">${esc(type.replace(/_/g, ' '))}</div>`;
          out += `<div class="stack">`;
          for (const r of group) {
            const targetId = getId(r);
            const targetEntity = entityLookup[targetId] || { name: targetId, type: '', namespace: '' };
            const targetColor = typeColor(targetEntity.type);
            out += `<div class="rel-card" onclick="window.location.hash='#/entity/${targetId}'">
              <span class="arrow" style="color:${targetColor}">→</span>
              <div class="rel-info">
                <div class="rel-entity">${icon(targetEntity.type)} ${esc(targetEntity.name)}</div>
                <div class="rel-meta">${esc(targetEntity.type)} · ${esc(targetEntity.namespace)}</div>
                ${r.context ? `<div class="rel-context">📖 ${esc(r.context)}</div>` : ''}
              </div>
            </div>`;
          }
          out += `</div>`;
        }
        return out;
      }

      html += renderRelGroup('incoming', incoming, r => r.from_entity);
      html += renderRelGroup('outgoing', outgoing, r => r.from_entity === id ? r.to_entity : (r.to_entity === id ? r.from_entity : r.to_entity));
    }

    // Sources
    const sources = dlData.sources || [];
    if (sources.length > 0) {
      html += `<div class="section-header"><span class="icon">📄</span> Sources <span style="font-weight:400;text-transform:none;letter-spacing:0">(${sources.length})</span></div>`;
      html += `<div class="stack">`;
      for (const s of sources) {
        html += `<div class="source-card">
          <div class="source-title">${esc(s.title || 'Untitled')}</div>
          <div class="source-meta">${esc(s.source_name || '')} · ${s.published_at ? formatTemporal({ timestamp: s.published_at, precision: 'day' }) : ''}</div>
          ${s.excerpt ? `<div class="source-excerpt">"${esc(s.excerpt)}"</div>` : ''}
          ${s.url ? `<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a>` : ''}
        </div>`;
      }
      html += `</div>`;
    }

    $('#app').innerHTML = html;
  }

  // === VIEW: NARRATIVE ===
  async function viewNarrative(context) {
    state.activeNs = null;
    renderNsPills();
    setBreadcrumb([
      { label: 'Home', href: '#/' },
      { label: context, href: `#/narrative/${encodeURIComponent(context)}` },
    ]);

    const data = await api(`/narratives/${encodeURIComponent(context)}`);
    const story = data.story || [];
    const entities = data.entities || [];
    const relations = story.map(s => s.relation);

    let mode = 'graph';

    function render() {
      let html = '';
      html += `<div style="margin-bottom:12px;">
        <div class="narrative-label-row">
          <span class="narrative-badge">Narrative</span>
          <span class="narrative-info-icon" id="narrative-info-btn" aria-label="What is a narrative?" tabindex="0">ⓘ</span>
        </div>
        <div style="font-size:1.3rem;font-weight:700;color:var(--text-bright);margin-top:6px;">📖 ${esc(context)}</div>
        <div style="font-size:0.85rem;color:var(--text-dim);margin-top:4px;">${story.length} steps · ${entities.length} entities</div>
        <div class="narrative-info-popup" id="narrative-info-popup">
          <div class="narrative-info-popup-title">What is a Narrative?</div>
          <div class="narrative-info-popup-body">A narrative is a chain of connected events, decisions, and facts that tell a story. Each step shows how one thing led to, enabled, or influenced another — forming a walkable, explorable path through the knowledge graph.</div>
        </div>
      </div>`;

      // Tabs
      html += `<div class="narrative-tabs">
        <button class="narrative-tab ${mode === 'graph' ? 'active' : ''}" id="tab-graph">● Graph</button>
        <button class="narrative-tab ${mode === 'steps' ? 'active' : ''}" id="tab-steps">≡ Steps</button>
      </div>`;

      if (mode === 'graph') {
        html += `<div class="graph-container full" id="narrative-graph"></div>`;
        html += `<div style="font-size:0.7rem;color:var(--text-dim);text-align:center;margin-top:6px;">Scroll/pinch to zoom · Drag to pan · Tap nodes to explore</div>`;
      } else {
        html += `<div class="stack">`;
        for (const step of story) {
          const r = step.relation;
          const fromE = step.from_entity;
          const toE = step.to_entity;
          const desc = r.metadata?.description || '';
          html += `<div class="step-card">
            <div class="step-num">Step ${step.sequence}</div>
            <div class="step-from" onclick="window.location.hash='#/entity/${r.from_entity}'">${icon(fromE?.type || '')} ${esc(fromE?.name || r.from_entity)}</div>
            <div class="step-rel-type">↓ ${esc(r.type)} ↓</div>
            <div class="step-to" onclick="window.location.hash='#/entity/${r.to_entity}'">${icon(toE?.type || '')} ${esc(toE?.name || r.to_entity)}</div>
            ${desc ? `<div class="step-desc">"${esc(desc)}"</div>` : ''}
          </div>`;
          if (step !== story[story.length - 1]) {
            html += `<div class="step-connector"></div>`;
          }
        }
        html += `</div>`;
      }

      $('#app').innerHTML = html;

      // Attach tab handlers
      const tabGraph = document.getElementById('tab-graph');
      const tabSteps = document.getElementById('tab-steps');
      if (tabGraph) tabGraph.onclick = () => { mode = 'graph'; render(); };
      if (tabSteps) tabSteps.onclick = () => { mode = 'steps'; render(); };

      // Narrative info popup
      const infoBtn = document.getElementById('narrative-info-btn');
      const infoPopup = document.getElementById('narrative-info-popup');
      if (infoBtn && infoPopup) {
        infoBtn.onclick = (e) => { e.stopPropagation(); infoPopup.classList.toggle('visible'); };
        document.addEventListener('click', (e) => {
          if (!infoPopup.contains(e.target) && e.target !== infoBtn) infoPopup.classList.remove('visible');
        }, { once: false });
      }

      // Render graph
      if (mode === 'graph') {
        updateLegend(entities, relations);
        setTimeout(() => {
          const container = document.getElementById('narrative-graph');
          if (!container) return;
          window.GraphEngine.render(container, entities, relations, {
            mode: 'layered',
            colorMap: state.colorMap,
            iconMap: TYPE_ICONS,
          credColorMap: credColorMap,
            onNodeClick: (node) => { window.location.hash = `#/entity/${node.id}`; },
          });
        }, 50);
      } else {
        updateLegend(entities, relations);
      }
    }

    render();
  }

  // === VIEW: FULL GRAPH ===
  async function viewGraph(id) {
    state.activeNs = null;
    renderNsPills();

    const [entity, relData, allEntData] = await Promise.all([
      api(`/entities/${encodeURIComponent(id)}`),
      api(`/relations?entity=${encodeURIComponent(id)}&depth=2`),
      api('/entities'),
    ]);

    setBreadcrumb([
      { label: 'Home', href: '#/' },
      { label: entity.name, href: `#/entity/${id}` },
      { label: 'Graph', href: `#/graph/${id}` },
    ]);

    const relations = relData.relations || [];
    const entityLookup = {};
    (allEntData.entities || []).forEach(e => { entityLookup[e.id] = e; });
    entityLookup[id] = entity;

    const nodeIds = new Set([id]);
    relations.forEach(r => { nodeIds.add(r.from_entity); nodeIds.add(r.to_entity); });
    const nodes = [...nodeIds].map(nid => entityLookup[nid] || { id: nid, name: nid, type: 'Concept', namespace: '' });

    let html = `<div style="margin-bottom:12px;">
      <div style="font-size:1.1rem;font-weight:700;color:var(--text-bright);">${icon(entity.type)} ${esc(entity.name)} — Graph</div>
      <div style="font-size:0.85rem;color:var(--text-dim);">${nodes.length} nodes · ${relations.length} edges · depth 2</div>
    </div>`;
    html += `<div class="graph-container full" id="full-graph"></div>`;
    html += `<div style="font-size:0.7rem;color:var(--text-dim);text-align:center;margin-top:6px;">Scroll/pinch to zoom · Drag to pan · Tap nodes to explore</div>`;

    $('#app').innerHTML = html;
    updateLegend(nodes, relations);

    setTimeout(() => {
      const container = document.getElementById('full-graph');
      if (!container) return;
      window.GraphEngine.render(container, nodes, relations, {
        mode: 'force',
        fixedCenter: id,
        colorMap: state.colorMap,
        iconMap: TYPE_ICONS,
          credColorMap: credColorMap,
        selectedId: id,
        onNodeClick: (node) => { window.location.hash = `#/entity/${node.id}`; },
      });
    }, 50);
  }

  // === VIEW: KEY RESOLUTION ===
  async function viewKey(key) {
    state.activeNs = null;
    renderNsPills();
    setBreadcrumb([
      { label: 'Home', href: '#/' },
      { label: `🔑 ${key}`, href: `#/key/${encodeURIComponent(key)}` },
    ]);

    const data = await api(`/entities/by-key/${encodeURIComponent(key)}`);
    const entities = data.entities || [];

    let html = `<div style="margin-bottom:16px;">
      <div style="font-size:1.1rem;font-weight:700;color:var(--text-bright);">🔑 ${esc(key)}</div>
      <div style="font-size:0.85rem;color:var(--text-dim);">Found in ${entities.length} namespace${entities.length !== 1 ? 's' : ''}</div>
    </div>`;

    if (entities.length === 0) {
      html += '<div class="empty-state">No entities share this key</div>';
    } else {
      html += `<div class="stack">`;
      for (const e of entities) html += entityCard(e);
      html += `</div>`;
    }

    $('#app').innerHTML = html;
  }

  // === LEGEND ===
  function ensureLegendElements() {
    let btn = document.getElementById('legend-toggle');
    let panel = document.getElementById('legend-panel');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'legend-toggle';
      btn.className = 'legend-toggle';
      btn.innerHTML = '🎨';
      btn.title = 'Type Legend';
      document.body.appendChild(btn);
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.toggle('open');
        btn.classList.toggle('active');
      });
      document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && e.target !== btn) {
          panel.classList.remove('open');
          btn.classList.remove('active');
        }
      });
    }
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'legend-panel';
      panel.className = 'legend-panel';
      document.body.appendChild(panel);
    }
    return { btn, panel };
  }

  // credColorMap is populated from namespace config at init

  // Update legend contents for a specific set of entities and relations
  function updateLegend(entities = [], relations = []) {
    const { btn, panel } = ensureLegendElements();

    // Collect types with counts and confidence breakdown
    const typeStats = {};
    for (const e of entities) {
      if (!e.type) continue;
      if (!typeStats[e.type]) typeStats[e.type] = { count: 0, cred: {} };
      typeStats[e.type].count++;
      const conf = e.credibility?.confidence || 'medium';
      typeStats[e.type].cred[conf] = (typeStats[e.type].cred[conf] || 0) + 1;
    }
    const usedTypes = Object.keys(typeStats).sort();

    // Collect relation types with counts
    const relStats = {};
    for (const r of relations) {
      if (!r.type) continue;
      relStats[r.type] = (relStats[r.type] || 0) + 1;
    }
    const usedRelTypes = Object.keys(relStats).sort();

    if (usedTypes.length === 0 && usedRelTypes.length === 0) {
      btn.style.display = 'none';
      return;
    }
    btn.style.display = '';

    const relConfig = state.nsConfigs['default']?.relations || {};

    let html = '<div class="legend-title">Entity Types</div>';
    html += '<div class="legend-section">';
    for (const type of usedTypes) {
      const c = state.colorMap[type] || '#666';
      const stats = typeStats[type];
      // Mini confidence bar
      const total = stats.count;
      let credHtml = '<span class="legend-cred-bar">';
      for (const [level, color] of Object.entries(credColorMap)) {
        const n = stats.cred[level] || 0;
        if (n > 0) {
          const pct = Math.round((n / total) * 100);
          credHtml += `<span class="legend-cred-seg" style="background:${color};width:${Math.max(pct, 8)}%" title="${n} ${level}"></span>`;
        }
      }
      credHtml += '</span>';
      html += `<div class="legend-item-rich">
        <span class="legend-dot" style="background:${c}"></span>
        <span class="legend-type-name">${esc(type)}</span>
        <span class="legend-count">${stats.count}</span>
        ${credHtml}
      </div>`;
    }
    html += '</div>';

    if (usedRelTypes.length > 0) {
      html += '<div class="legend-section"><div class="legend-title">Relations</div>';
      for (const name of usedRelTypes) {
        const props = relConfig[name] || {};
        const count = relStats[name];
        const tags = [];
        if (props.transitive) tags.push('transitive');
        if (props.traversable) tags.push('traversable');
        html += `<div class="legend-item-rich">
          <span style="color:var(--text-dim);font-size:0.7rem;width:10px;text-align:center;flex-shrink:0;">→</span>
          <span class="legend-type-name">${esc(name)}</span>
          <span class="legend-count">${count}</span>
          ${tags.length ? `<span class="legend-tags">${tags.map(t => `<span class="legend-tag">${t[0].toUpperCase()}</span>`).join('')}</span>` : ''}
        </div>`;
      }
      html += '</div>';
    }

    // Confidence key — from namespace config
    if (Object.keys(credColorMap).length > 0) {
      html += '<div class="legend-section"><div class="legend-title">Confidence</div>';
      html += '<div class="legend-cred-key">';
      for (const [level, color] of Object.entries(credColorMap)) {
        html += `<span class="legend-cred-key-item"><span class="legend-dot" style="background:${color};width:7px;height:7px;"></span>${level}</span>`;
      }
      html += '</div></div>';
    }

    panel.innerHTML = html;
  }

  // Build initial legend with all types (for non-graph views)
  function buildLegend() {
    ensureLegendElements();
    // Start with all known types
    const allEntities = Object.keys(state.colorMap).map(type => ({ type }));
    updateLegend(allEntities, []);
  }

  // === BOOT ===
  init().catch(err => {
    console.error('NOESIS init error:', err);
    $('#app').innerHTML = `<div class="empty-state">Failed to connect to API<br><small>${esc(err.message)}</small></div>`;
  });
})();
