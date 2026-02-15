/**
 * NOESIS Explorer v2.0 — Namespace-as-Page Model
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
    Layer: '📐', Component: '⚙️', Principle: '📏', Feature: '🔧',
    Battle: '⚔️', Campaign: '🗺️', Army: '🏴', 'Military Unit': '🎖️',
  };

  // Namespace icons based on name heuristics
  const NS_ICONS = {
    news: '📰', finance: '💹', geopolitics: '🌍', noesis: '🧠', history: '📜',
    crypto: '🪙', default: '⚙️',
  };

  let credColorMap = {};

  // === STATE ===
  let state = {
    namespaces: [],
    nsConfigs: {},
    colorMap: {},
    allNarratives: [],
    allEntities: [],
    entityLookup: {},
  };

  // === API HELPERS ===
  async function api(path) {
    const res = await fetch(API + path);
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  }

  // Cached fetch
  const cache = {};
  async function cachedApi(path, ttl = 60000) {
    if (cache[path] && Date.now() - cache[path].t < ttl) return cache[path].d;
    const d = await api(path);
    cache[path] = { d, t: Date.now() };
    return d;
  }

  // === HELPERS ===
  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function icon(type) { return TYPE_ICONS[type] || '●'; }

  function nsIcon(ns) {
    const parts = ns.split('.');
    for (let i = parts.length; i > 0; i--) {
      const key = parts.slice(0, i).join('.');
      if (NS_ICONS[key]) return NS_ICONS[key];
    }
    // Check last segment
    const last = parts[parts.length - 1];
    if (NS_ICONS[last]) return NS_ICONS[last];
    return '📂';
  }

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

  function entityCard(entity) {
    const c = typeColor(entity.type);
    const desc = entity.metadata?.description || '';
    return `<div class="card accent-left" style="--type-color:${c}" onclick="window.location.hash='#/entity/${entity.id}'">
      <div class="card-title">${icon(entity.type)} ${esc(entity.name)}</div>
      <div class="card-meta">
        <span class="type-badge">${esc(entity.type)}</span>
        ${credDot(entity.credibility)}
        ${entity.temporal ? `<span>${formatTemporal(entity.temporal)}</span>` : ''}
      </div>
      ${desc ? `<div class="card-excerpt">${esc(desc)}</div>` : ''}
    </div>`;
  }

  // === NAMESPACE HELPERS ===

  // Get direct children of a namespace
  function getChildren(parentNs) {
    const prefix = parentNs === 'default' ? '' : parentNs + '.';
    const parentDepth = parentNs === 'default' ? 0 : parentNs.split('.').length;
    return state.namespaces.filter(ns => {
      if (ns.namespace === 'default') return false;
      if (parentNs === 'default') {
        // Root children: namespaces with depth 1 (no dots)
        return !ns.namespace.includes('.');
      }
      return ns.namespace.startsWith(prefix) &&
             ns.namespace.split('.').length === parentDepth + 1;
    });
  }

  // Check if a namespace is a descendant (or equal to) another
  function isDescendantOrSelf(ns, ancestor) {
    if (ancestor === 'default') return true;
    return ns === ancestor || ns.startsWith(ancestor + '.');
  }

  // Get narratives scoped to a namespace and its descendants
  function getScopedNarratives(ns) {
    // Find all entity IDs in this namespace and descendants
    const scopedEntityIds = new Set();
    state.allEntities.forEach(e => {
      if (isDescendantOrSelf(e.namespace, ns === 'default' ? 'default' : ns)) {
        scopedEntityIds.add(e.id);
      }
    });

    // Filter narratives: keep if any of its entities are in scope
    return state.allNarratives.filter(n => {
      if (!n.entity_ids || n.entity_ids.length === 0) return false;
      return n.entity_ids.some(id => scopedEntityIds.has(id));
    });
  }

  // === BREADCRUMB ===
  function setBreadcrumb(items) {
    const el = $('#breadcrumb');
    el.innerHTML = items.map((item, i) => {
      if (i === items.length - 1) return `<span class="current">${esc(item.label)}</span>`;
      return `<a href="${item.href}">${esc(item.label)}</a><span class="sep">›</span>`;
    }).join('');
  }

  function nsBreadcrumb(ns) {
    // Root page: no breadcrumb (logo already shows ν NOESIS)
    if (!ns || ns === 'default') return [];
    const items = [{ label: 'ν NOESIS', href: '#/' }];
    const parts = ns.split('.');
    for (let i = 0; i < parts.length; i++) {
      const path = parts.slice(0, i + 1).join('.');
      items.push({ label: parts[i], href: `#/ns/${encodeURIComponent(path)}` });
    }
    return items;
  }

  // === LOADING ===
  function showLoading() {
    $('#app').innerHTML = '<div class="loading"><div class="spinner"></div> Loading…</div>';
  }

  // === INIT: LOAD ALL DATA ===
  async function init() {
    const [nsData, configData, narrativesData, allEntData, allRelData] = await Promise.all([
      api('/namespaces'),
      api('/namespaces/default/config'),
      api('/narratives'),
      api('/entities'),
      api('/relations'),
    ]);

    state.namespaces = nsData.namespaces || [];
    state.nsConfigs['default'] = configData;
    state.colorMap = { ...(configData.colors?.types || {}) };
    credColorMap = { ...(configData.colors?.credibility || {}) };
    state.allNarratives = narrativesData.narratives || [];
    state.allEntities = allEntData.entities || [];
    state.allEntities.forEach(e => { state.entityLookup[e.id] = e; });

    // Build narrative → entity_ids mapping from relations
    const allRelations = allRelData.relations || [];
    const narrativeEntities = {};
    for (const r of allRelations) {
      if (!r.context) continue;
      if (!narrativeEntities[r.context]) narrativeEntities[r.context] = new Set();
      narrativeEntities[r.context].add(r.from_entity);
      narrativeEntities[r.context].add(r.to_entity);
    }
    // Enrich narratives with entity_ids
    for (const n of state.allNarratives) {
      const ids = narrativeEntities[n.context];
      n.entity_ids = ids ? [...ids] : [];
      n.entity_count = n.entity_ids.length;
    }

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

    buildLegend();
    route();
  }

  // === ROUTER ===
  function route() {
    const hash = window.location.hash || '#/';
    const parts = hash.slice(2).split('/');
    const view = parts[0] || '';

    showLoading();

    if (view === '' || view === '/') return viewNamespacePage('default');
    if (view === 'ns') return viewNamespacePage(decodeURIComponent(parts.slice(1).join('.')));
    if (view === 'entity') return viewEntity(parts[1]);
    if (view === 'narrative') return viewNarrative(decodeURIComponent(parts.slice(1).join('/')));
    if (view === 'graph') return viewGraph(parts[1]);
    if (view === 'key') return viewKey(decodeURIComponent(parts.slice(1).join('/')));
    if (view === 'about') return viewAbout();

    $('#app').innerHTML = '<div class="empty-state">View not found</div>';
  }

  window.addEventListener('hashchange', route);

  // === VIEW: UNIVERSAL NAMESPACE PAGE ===
  async function viewNamespacePage(ns) {
    const isRoot = ns === 'default';
    setBreadcrumb(nsBreadcrumb(isRoot ? null : ns));

    // Get children namespaces
    const children = getChildren(ns);

    // Get entities directly in this namespace
    const directEntities = isRoot
      ? [] // default namespace is schema-only
      : state.allEntities.filter(e => e.namespace === ns);

    // Get scoped narratives (own + bubbled from children)
    const scopedNarratives = isRoot
      ? state.allNarratives // root sees all
      : getScopedNarratives(ns);

    // Sort narratives: by relation_count × recency
    scopedNarratives.sort((a, b) => {
      const sa = (a.relation_count || 0);
      const sb = (b.relation_count || 0);
      return sb - sa;
    });

    // Separate own vs child narratives
    const ownEntityIds = new Set(directEntities.map(e => e.id));
    const ownNarratives = [];
    const childNarratives = [];
    for (const n of scopedNarratives) {
      const ids = n.entity_ids || [];
      if (ids.some(id => ownEntityIds.has(id))) {
        ownNarratives.push(n);
      } else {
        childNarratives.push(n);
      }
    }

    // Sort child narratives by entity count (desc) then recency (desc)
    childNarratives.sort((a, b) => {
      const ea = (a.entity_ids || []).length;
      const eb = (b.entity_ids || []).length;
      if (eb !== ea) return eb - ea;
      // Recency: find most recent entity timestamp in each narrative
      const recentA = Math.max(...(a.entity_ids || []).map(id => {
        const e = state.entityLookup[id];
        return e?.temporal?.timestamp ? new Date(e.temporal.timestamp).getTime() : 0;
      }));
      const recentB = Math.max(...(b.entity_ids || []).map(id => {
        const e = state.entityLookup[id];
        return e?.temporal?.timestamp ? new Date(e.temporal.timestamp).getTime() : 0;
      }));
      return recentB - recentA;
    });

    // Cap child narratives — show top 5 (expandable)
    const CHILD_NAR_LIMIT = 5;
    const childToShow = childNarratives.slice(0, CHILD_NAR_LIMIT);
    const childHasMore = childNarratives.length > CHILD_NAR_LIMIT;

    let html = '';

    // SECTION 1: Narratives
    const hasOwn = ownNarratives.length > 0;
    const hasChild = childToShow.length > 0;
    if (hasOwn || hasChild) {
      html += `<div class="section-header"><span class="icon">📖</span> Narratives</div>`;

      if (hasOwn && hasChild) {
        html += `<div class="subsection-label">This Namespace</div>`;
      }
      if (hasOwn) {
        html += `<div class="stack">${ownNarratives.map(narrativeCard).join('')}</div>`;
      }
      if (hasOwn && hasChild) {
        html += `<div class="subsection-label">Top from Sub-Namespaces</div>`;
      }
      if (hasChild || (isRoot && scopedNarratives.length > 0 && !hasOwn)) {
        const toShow = isRoot
          ? childNarratives.slice(0, CHILD_NAR_LIMIT)
          : childToShow;
        html += `<div class="stack">${toShow.map(narrativeCard).join('')}</div>`;
        const remaining = isRoot
          ? scopedNarratives.length - CHILD_NAR_LIMIT
          : childNarratives.length - CHILD_NAR_LIMIT;
        if (remaining > 0) {
          html += `<div class="show-more" id="show-more-nar" style="cursor:pointer;text-align:center;padding:10px;font-size:0.85rem;color:var(--accent);">Show ${remaining} more…</div>`;
        }
      }
    }

    // SECTION 2: Sub-Namespaces
    if (children.length > 0) {
      html += `<div class="section-header"><span class="icon">🗂</span> Sub-Namespaces</div>`;
      html += `<div class="grid-fill">`;

      for (const child of children) {
        // Count entities in this child + descendants
        const count = state.allEntities.filter(e =>
          isDescendantOrSelf(e.namespace, child.namespace)
        ).length;
        const lastSegment = child.namespace.split('.').pop();
        html += `<div class="card ns-card" onclick="window.location.hash='#/ns/${encodeURIComponent(child.namespace)}'">
          <div class="ns-icon">${nsIcon(child.namespace)}</div>
          <div class="ns-name">${esc(lastSegment)}</div>
          <div class="ns-count">${count} entities</div>
        </div>`;
      }

      html += `</div>`;
    }

    // SECTION 3: Entities (grouped by type)
    if (directEntities.length > 0) {
      const groups = {};
      directEntities.forEach(e => {
        if (!groups[e.type]) groups[e.type] = [];
        groups[e.type].push(e);
      });

      html += `<div class="section-header"><span class="icon">⚡</span> Entities <span style="font-weight:400;text-transform:none;letter-spacing:0">(${directEntities.length})</span></div>`;

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
    }

    if (!html) {
      html = '<div class="empty-state">This namespace is empty</div>';
    }

    $('#app').innerHTML = html;
    updateLegend(directEntities.length > 0 ? directEntities : state.allEntities, []);

    // "Show more" handler for child narratives
    const showMoreBtn = document.getElementById('show-more-nar');
    if (showMoreBtn) {
      showMoreBtn.addEventListener('click', () => {
        const allChild = isRoot ? scopedNarratives : childNarratives;
        const parent = showMoreBtn.parentElement;
        const stack = showMoreBtn.previousElementSibling;
        if (stack) {
          stack.innerHTML = allChild.map(narrativeCard).join('');
        }
        showMoreBtn.remove();
      });
    }
  }

  function narrativeCard(n) {
    // Derive primary namespace from the narrative's entities
    const nsCount = {};
    (n.entity_ids || []).forEach(id => {
      const e = state.entityLookup[id];
      if (e) { nsCount[e.namespace] = (nsCount[e.namespace] || 0) + 1; }
    });
    const primaryNs = Object.entries(nsCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

    // Build clickable namespace path breadcrumb
    let pathHtml = '';
    if (primaryNs && primaryNs !== 'default') {
      const parts = primaryNs.split('.');
      const crumbs = parts.map((seg, i) => {
        const full = parts.slice(0, i + 1).join('.');
        return `<a class="nar-path-link" href="#/ns/${encodeURIComponent(full)}" onclick="event.stopPropagation()">${esc(seg)}</a>`;
      });
      pathHtml = `<div class="nar-path">${crumbs.join('<span class="nar-path-sep">›</span>')}</div>`;
    }

    return `<div class="card narrative-card" onclick="window.location.hash='#/narrative/${encodeURIComponent(n.context)}'">
      ${pathHtml}
      <div class="nar-title">📖 ${esc(n.context)}</div>
      <div class="nar-meta">${n.relation_count || 0} steps · ${n.entity_count || '?'} entities</div>
      <span class="nar-cta">Explore Story →</span>
    </div>`;
  }

  // === VIEW: ENTITY DETAIL ===
  async function viewEntity(id) {
    const [entity, relData, dlData] = await Promise.all([
      api(`/entities/${encodeURIComponent(id)}`),
      api(`/relations?entity=${encodeURIComponent(id)}&depth=1`),
      api(`/datalayer/by-entity/${encodeURIComponent(id)}`).catch(() => ({ sources: [] })),
    ]);

    // Build breadcrumb from entity namespace
    const bc = nsBreadcrumb(entity.namespace);
    bc.push({ label: entity.name, href: `#/entity/${id}` });
    setBreadcrumb(bc);

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

    const relations = relData.relations || [];
    // Merge lookup
    const lookup = { ...state.entityLookup };
    lookup[id] = entity;

    // Mini graph
    if (relations.length > 0) {
      const nodeIds = new Set([id]);
      relations.forEach(r => { nodeIds.add(r.from_entity); nodeIds.add(r.to_entity); });
      const graphNodes = [...nodeIds].map(nid => lookup[nid] || { id: nid, name: nid, type: 'Concept', namespace: '' });

      html += `<div class="graph-container mini" id="entity-graph"></div>`;
      html += `<div class="expand-link" onclick="window.location.hash='#/graph/${id}'">Expand full graph →</div>`;

      updateLegend(graphNodes, relations);

      setTimeout(() => {
        const container = document.getElementById('entity-graph');
        if (!container) return;
        window.GraphEngine.render(container, graphNodes, relations, {
          mode: 'force',
          fixedCenter: id,
          colorMap: state.colorMap,
          iconMap: TYPE_ICONS,
          credColorMap,
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

    // Relations
    if (relations.length > 0) {
      html += `<div class="section-header"><span class="icon">🔗</span> Relations <span style="font-weight:400;text-transform:none;letter-spacing:0">(${relations.length})</span></div>`;

      const relConfig = state.nsConfigs['default']?.relations || {};
      const incoming = [], outgoing = [];
      for (const r of relations) {
        if (r.to_entity === id) incoming.push(r);
        else outgoing.push(r);
      }

      function renderRelGroup(label, rels, getId) {
        if (rels.length === 0) return '';
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
            const te = lookup[targetId] || { name: targetId, type: '', namespace: '' };
            const tc = typeColor(te.type);
            out += `<div class="rel-card" onclick="window.location.hash='#/entity/${targetId}'">
              <span class="arrow" style="color:${tc}">→</span>
              <div class="rel-info">
                <div class="rel-entity">${icon(te.type)} ${esc(te.name)}</div>
                <div class="rel-meta">${esc(te.type)} · ${esc(te.namespace)}</div>
                ${r.context ? `<div class="rel-context">📖 ${esc(r.context)}</div>` : ''}
              </div>
            </div>`;
          }
          out += `</div>`;
        }
        return out;
      }

      html += renderRelGroup('incoming', incoming, r => r.from_entity);
      html += renderRelGroup('outgoing', outgoing, r => r.from_entity === id ? r.to_entity : r.to_entity);
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
    const data = await api(`/narratives/${encodeURIComponent(context)}`);
    const story = data.story || [];
    const entities = data.entities || [];
    const relations = story.map(s => s.relation);

    // Find the primary namespace for this narrative
    const nsCount = {};
    entities.forEach(e => {
      const ns = e.namespace || 'default';
      nsCount[ns] = (nsCount[ns] || 0) + 1;
    });
    const primaryNs = Object.entries(nsCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'default';

    const bc = nsBreadcrumb(primaryNs);
    bc.push({ label: context, href: `#/narrative/${encodeURIComponent(context)}` });
    setBreadcrumb(bc);

    let mode = 'graph';

    function render() {
      let html = '';
      html += `<div style="margin-bottom:12px;">
        <div style="font-size:1.3rem;font-weight:700;color:var(--text-bright);">📖 ${esc(context)}</div>
        <div style="font-size:0.85rem;color:var(--text-dim);margin-top:4px;">${story.length} steps · ${entities.length} entities</div>
      </div>`;

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

      const tabGraph = document.getElementById('tab-graph');
      const tabSteps = document.getElementById('tab-steps');
      if (tabGraph) tabGraph.onclick = () => { mode = 'graph'; render(); };
      if (tabSteps) tabSteps.onclick = () => { mode = 'steps'; render(); };

      if (mode === 'graph') {
        updateLegend(entities, relations);
        setTimeout(() => {
          const container = document.getElementById('narrative-graph');
          if (!container) return;
          window.GraphEngine.render(container, entities, relations, {
            mode: 'layered',
            colorMap: state.colorMap,
            iconMap: TYPE_ICONS,
            credColorMap,
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
    const [entity, relData] = await Promise.all([
      api(`/entities/${encodeURIComponent(id)}`),
      api(`/relations?entity=${encodeURIComponent(id)}&depth=2`),
    ]);

    const bc = nsBreadcrumb(entity.namespace);
    bc.push({ label: entity.name, href: `#/entity/${id}` });
    bc.push({ label: 'Graph', href: `#/graph/${id}` });
    setBreadcrumb(bc);

    const relations = relData.relations || [];
    const lookup = { ...state.entityLookup };
    lookup[id] = entity;

    const nodeIds = new Set([id]);
    relations.forEach(r => { nodeIds.add(r.from_entity); nodeIds.add(r.to_entity); });
    const nodes = [...nodeIds].map(nid => lookup[nid] || { id: nid, name: nid, type: 'Concept', namespace: '' });

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
        credColorMap,
        selectedId: id,
        onNodeClick: (node) => { window.location.hash = `#/entity/${node.id}`; },
      });
    }, 50);
  }

  // === VIEW: KEY RESOLUTION ===
  async function viewKey(key) {
    setBreadcrumb([
      { label: 'ν NOESIS', href: '#/' },
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

  // === VIEW: ABOUT ===
  function viewAbout() {
    setBreadcrumb([
      { label: 'ν NOESIS', href: '#/' },
      { label: 'About', href: '#/about' },
    ]);

    // Count stats from loaded data
    const entCount = state.allEntities.length;
    const nsCount = state.namespaces.length;
    const narCount = state.allNarratives.length;

    $('#app').innerHTML = `<div class="about-page">
      <h1>NOESIS</h1>
      <div class="about-greek">νόησις (noēsis) — understanding, intellection</div>
      <div class="about-subtitle">Structured knowledge for AI and humans</div>

      <h2>The Problem of Knowing</h2>
      <p>We drown in data yet starve for understanding. Every day, billions of events, decisions, and claims pour through our systems — disconnected fragments that no mind, human or artificial, can hold together. Search engines retrieve documents. Databases store rows. Knowledge graphs link nodes. But none of them <em>understand</em>.</p>
      <p>Aristotle distinguished between <em>epistēmē</em> (scientific knowledge), <em>technē</em> (craft knowledge), and <em>noēsis</em> — the highest form: direct intellectual apprehension of truth. Not just knowing <em>that</em> something is, but grasping <em>why</em> it is, how it connects, what it means in the sweep of a story.</p>
      <p>That is what this system pursues.</p>

      <h2>What NOESIS Is</h2>
      <p>NOESIS is a universal structured knowledge representation language. It combines <strong>narrative</strong> (stories with actors and causality), <strong>ontology</strong> (formal classification of what things are), and <strong>evidence</strong> (traceable links to source documents) into a single coherent framework.</p>
      <p>It is designed to be read by humans, queried by machines, and reasoned over by AI agents. The same graph that a journalist navigates to understand a geopolitical crisis is the graph an AI agent traverses to answer a question about cause and effect.</p>

      <table class="acro-table">
        <tr><td>N</td><td>Narrative</td><td>Stories with actors, events, and causal chains — knowledge as interconnected stories, not isolated facts</td></tr>
        <tr><td>O</td><td>Ontology</td><td>Formal classification of what things are — configurable per domain</td></tr>
        <tr><td>E</td><td>Evidence-based</td><td>Every claim links to source documents — traceable, verifiable</td></tr>
        <tr><td>S</td><td>Systems</td><td>Entities form interconnected graphs — not isolated data points</td></tr>
        <tr><td>I</td><td>Inferencing</td><td>Relations enable reasoning — if A causes B and B causes C, then A causes C</td></tr>
        <tr><td>S</td><td>Structure</td><td>Five-layer architecture from core ontology to presentation</td></tr>
      </table>

      <h2>The Five Layers</h2>
      <p>Everything in NOESIS passes through five layers — from universal logic down to raw evidence, and up to visual presentation. Each layer has a distinct responsibility. Together, they turn fragments into understanding.</p>
      <div class="layers">
Layer 5: Presentation — how knowledge is visualised and navigated<br>
Layer 4: Datalayer — source documents, raw evidence, articles<br>
Layer 3: Temporal &amp; Credibility — when things happened, how certain we are<br>
Layer 2: Namespace — domain-specific extensions, hierarchy, versioning<br>
Layer 1: Core Ontology — universal types, configurable inference rules
      </div>

      <h2>Narrative First</h2>
      <p>Most knowledge systems treat stories as decoration on top of data. NOESIS inverts this. Narrative is the <em>primary organising principle</em>. Relations carry sequence numbers. Contexts group causal chains into named stories. A set of nodes isn't just a graph — it's a plot, with a beginning, escalation, climax, and consequence.</p>
      <p>This mirrors how humans actually understand the world: through stories. Not through tables, not through triples, but through narrative threads that connect cause to effect across time.</p>

      <h2>Namespaces as Worldviews</h2>
      <p>A financial analyst sees "Bitcoin" as an asset with a price chart. A journalist sees it as a story about regulation and adoption. A technologist sees it as a protocol. In NOESIS, these are not contradictions — they are <em>namespaces</em>. The same real-world entity, viewed through different lenses, each adding its own types, metadata, and meaning.</p>
      <p>Namespaces inherit from parents. The root namespace defines universal logic. Children extend it for their domain. This creates a tree of worldviews, unified at the root but richly diverse at the leaves.</p>

      <h2>Goals</h2>
      <p><strong>For humans:</strong> Navigate complex knowledge visually. Follow narratives. Trace claims to evidence. Understand <em>why</em>, not just <em>what</em>.</p>
      <p><strong>For AI agents:</strong> A structured, queryable knowledge graph with typed relations, inference properties, and source provenance. Ask "what caused X?" and get a traversable answer, not a hallucination.</p>
      <p><strong>For the gap between them:</strong> A shared language where human narrative intuition and machine graph traversal meet on the same substrate.</p>

      <h2>This Explorer</h2>
      <p>What you're looking at is the NOESIS Explorer — a presentation layer (Layer 5) built to navigate any NOESIS knowledge graph. It reads all structure from the API at runtime. No hardcoded types, no fixed layouts. Feed it a different domain, and it adapts.</p>
      <p>Currently exploring <strong>${entCount} entities</strong> across <strong>${nsCount} namespaces</strong> with <strong>${narCount} narratives</strong>.</p>

      <a href="#/" class="about-enter">Enter the Explorer →</a>
    </div>`;
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

  function updateLegend(entities = [], relations = []) {
    const { btn, panel } = ensureLegendElements();

    const typeStats = {};
    for (const e of entities) {
      if (!e.type) continue;
      if (!typeStats[e.type]) typeStats[e.type] = { count: 0, cred: {} };
      typeStats[e.type].count++;
      const conf = e.credibility?.confidence || 'medium';
      typeStats[e.type].cred[conf] = (typeStats[e.type].cred[conf] || 0) + 1;
    }
    const usedTypes = Object.keys(typeStats).sort();

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

  function buildLegend() {
    ensureLegendElements();
    const allEntities = Object.keys(state.colorMap).map(type => ({ type }));
    updateLegend(allEntities, []);
  }

  // === BOOT ===
  init().catch(err => {
    console.error('NOESIS init error:', err);
    $('#app').innerHTML = `<div class="empty-state">Failed to connect to API<br><small>${esc(err.message)}</small></div>`;
  });
})();
