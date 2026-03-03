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

  function credDot(c, opts = {}) {
    const conf = c?.confidence || 'medium';
    const color = credColorMap[conf] || '#888';
    if (opts.labeled) {
      return `<span class="cred-badge" style="--cred-color:${color}"><span class="cred-dot" style="background:${color}"></span>Confidence: ${conf}</span>`;
    }
    return `<span class="cred-badge-compact" style="--cred-color:${color}"><span class="cred-dot" style="background:${color}"></span>${conf}</span>`;
  }

  function typeColor(type) { return state.colorMap[type] || '#666'; }

  // Get narratives that an entity belongs to
  function getEntityNarratives(entityId) {
    return (state.allNarratives || []).filter(n => 
      (n.entity_ids || []).includes(entityId)
    );
  }

  // Build narrative badges HTML for an entity
  function narrativeBadges(entityId) {
    const narratives = getEntityNarratives(entityId);
    if (narratives.length === 0) return '';
    const badges = narratives.map(n => 
      `<a class="nar-badge" href="#/narrative/${encodeURIComponent(n.context)}" onclick="event.stopPropagation()" title="${esc(n.context)}">📖 ${esc(n.context.length > 25 ? n.context.slice(0, 22) + '…' : n.context)}</a>`
    ).join('');
    return `<div class="card-narratives">${badges}</div>`;
  }

  function entityCard(entity) {
    const c = typeColor(entity.type);
    const desc = entity.metadata?.description || '';
    const narHtml = narrativeBadges(entity.id);
    return `<div class="card accent-left" style="--type-color:${c}" onclick="window.location.hash='#/entity/${entity.id}'">
      <div class="card-title">${icon(entity.type)} ${esc(entity.name)}</div>
      <div class="card-meta">
        <span class="type-badge">${esc(entity.type)}</span>
        ${credDot(entity.credibility)}
        ${entity.temporal ? `<span>${formatTemporal(entity.temporal)}</span>` : ''}
      </div>
      ${desc ? `<div class="card-excerpt">${esc(desc)}</div>` : ''}
      ${narHtml}
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
    // Root page: just "Home"
    if (!ns || ns === 'default') return [{ label: 'Home', href: '#/' }];
    const items = [{ label: 'Home', href: '#/' }];
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
    state.allRelations = allRelations; // Store in state for later use
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
    if (view === 'dashboard') return viewDashboard(parts[1] || 'maga-casualties');

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

    // DASHBOARD LINK (root only)
    if (isRoot) {
      html += `<div class="dash-link-card" onclick="window.location.hash='#/dashboard/maga-casualties'">
        <div class="dash-link-icon">📊</div>
        <div class="dash-link-content">
          <div class="dash-link-title">MAGA vs Casualties Dashboard</div>
          <div class="dash-link-desc">Trump approval ratings vs US military deaths in active conflicts</div>
        </div>
        <div class="dash-link-arrow">→</div>
      </div>`;
    }

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

    // SECTION 3: Entities (own + from all descendant namespaces)
    // Get all entities in this namespace and ALL descendants
    const allDescendantEntities = isRoot
      ? state.allEntities // root sees all
      : state.allEntities.filter(e => isDescendantOrSelf(e.namespace, ns));

    // Separate own vs descendant entities
    const ownEntities = directEntities;
    const descendantOnlyEntities = allDescendantEntities.filter(e => e.namespace !== ns);

    // Calculate connection count for each entity
    const connectionCount = {};
    (state.allRelations || []).forEach(r => {
      connectionCount[r.from_entity] = (connectionCount[r.from_entity] || 0) + 1;
      connectionCount[r.to_entity] = (connectionCount[r.to_entity] || 0) + 1;
    });

    // Sort entities by date (desc) then connection count (desc)
    const sortEntities = (entities) => {
      return entities.sort((a, b) => {
        const dateA = a.temporal?.timestamp ? new Date(a.temporal.timestamp).getTime() : 0;
        const dateB = b.temporal?.timestamp ? new Date(b.temporal.timestamp).getTime() : 0;
        if (dateB !== dateA) return dateB - dateA;
        const connA = connectionCount[a.id] || 0;
        const connB = connectionCount[b.id] || 0;
        return connB - connA;
      });
    };

    // Limit for entities display
    const ENTITY_LIMIT = 10;

    // Display entities section
    if (ownEntities.length > 0 || descendantOnlyEntities.length > 0) {
      // Own entities
      if (ownEntities.length > 0) {
        const sortedOwn = sortEntities([...ownEntities]);
        const groups = {};
        sortedOwn.forEach(e => {
          if (!groups[e.type]) groups[e.type] = [];
          groups[e.type].push(e);
        });

        html += `<div class="section-header"><span class="icon">⚡</span> Entities <span style="font-weight:400;text-transform:none;letter-spacing:0">(${ownEntities.length})</span></div>`;

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

      // Descendant entities (from sub-namespaces)
      if (descendantOnlyEntities.length > 0) {
        const sortedDesc = sortEntities([...descendantOnlyEntities]);
        const groups = {};
        sortedDesc.forEach(e => {
          if (!groups[e.type]) groups[e.type] = [];
          groups[e.type].push(e);
        });

        html += `<div class="section-header"><span class="icon">📂</span> From Sub-Namespaces <span style="font-weight:400;text-transform:none;letter-spacing:0">(${descendantOnlyEntities.length})</span></div>`;

        // Entity card with breadcrumb - same design as entityCard but with namespace path
        const entityCardWithBreadcrumb = (e) => {
          const c = typeColor(e.type);
          const desc = e.metadata?.description || '';
          const narHtml = narrativeBadges(e.id);
          // Build clickable namespace breadcrumb
          const nsParts = e.namespace.split('.');
          const nsLinks = nsParts.map((seg, i) => {
            const full = nsParts.slice(0, i + 1).join('.');
            return `<a class="ns-breadcrumb-link" href="#/ns/${encodeURIComponent(full)}" onclick="event.stopPropagation()">${esc(seg)}</a>`;
          }).join('<span class="ns-breadcrumb-sep">›</span>');
          return `<div class="card accent-left" style="--type-color:${c}" onclick="window.location.hash='#/entity/${encodeURIComponent(e.id)}'">
            <div class="card-ns-breadcrumb">${nsLinks}</div>
            <div class="card-title">${icon(e.type)} ${esc(e.name)}</div>
            <div class="card-meta">
              <span class="type-badge">${esc(e.type)}</span>
              ${credDot(e.credibility)}
              ${e.temporal ? `<span>${formatTemporal(e.temporal)}</span>` : ''}
            </div>
            ${desc ? `<div class="card-excerpt">${esc(desc)}</div>` : ''}
            ${narHtml}
          </div>`;
        };

        let totalShown = 0;
        const MAX_TOTAL = 20;
        let hasMoreEntities = false;

        for (const [type, items] of Object.entries(groups).sort((a, b) => b[1].length - a[1].length)) {
          const c = typeColor(type);
          const toShow = items.slice(0, Math.min(items.length, MAX_TOTAL - totalShown));
          if (toShow.length < items.length) hasMoreEntities = true;

          html += `<div class="type-group-header">
            <span class="color-dot" style="background:${c}"></span>
            ${icon(type)} ${esc(type)}
            <span class="count">${items.length}</span>
          </div>`;
          html += `<div class="stack" style="margin-bottom:16px;">`;
          for (const e of toShow) html += entityCardWithBreadcrumb(e);
          html += `</div>`;

          totalShown += toShow.length;
          if (totalShown >= MAX_TOTAL) {
            hasMoreEntities = true;
            break;
          }
        }

        if (hasMoreEntities) {
          const remaining = descendantOnlyEntities.length - totalShown;
          html += `<div class="show-more" id="show-more-entities" style="cursor:pointer;text-align:center;padding:10px;font-size:0.85rem;color:var(--accent);">Show ${remaining} more…</div>`;
        }
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

    // "Show more" handler for descendant entities
    const showMoreEntBtn = document.getElementById('show-more-entities');
    if (showMoreEntBtn) {
      showMoreEntBtn.addEventListener('click', async () => {
        // Fetch all relations to calculate connection counts
        const relData = await api('/relations');
        state.allRelations = relData.relations || [];
        const connCount = {};
        (state.allRelations || []).forEach(r => {
          connCount[r.from_entity] = (connCount[r.from_entity] || 0) + 1;
          connCount[r.to_entity] = (connCount[r.to_entity] || 0) + 1;
        });

        const sortedDesc = sortEntities([...descendantOnlyEntities]);
        const entityCardFull = (e) => {
          const conn = connCount[e.id] || 0;
          const date = e.temporal?.timestamp ? new Date(e.temporal.timestamp).toLocaleDateString() : '';
          return `<div class="card entity-card" onclick="window.location.hash='#/entity/${encodeURIComponent(e.id)}'">
            <div class="entity-type-badge" style="background:${typeColor(e.type)}">${esc(e.type)}</div>
            <div class="entity-name">${esc(e.name)}</div>
            <div class="entity-meta">
              ${date ? `<span>${date}</span>` : ''}
              ${conn > 0 ? `<span>🔗 ${conn}</span>` : ''}
            </div>
          </div>`;
        };

        // Find the section and replace content
        const section = showMoreEntBtn.closest('.section-header')?.nextElementSibling;
        if (section) {
          // Build all cards grouped by type
          const groups = {};
          sortedDesc.forEach(e => {
            if (!groups[e.type]) groups[e.type] = [];
            groups[e.type].push(e);
          });
          let newHtml = '';
          for (const [type, items] of Object.entries(groups).sort((a, b) => b[1].length - a[1].length)) {
            const c = typeColor(type);
            newHtml += `<div class="type-group-header">
              <span class="color-dot" style="background:${c}"></span>
              ${icon(type)} ${esc(type)}
              <span class="count">${items.length}</span>
            </div>`;
            newHtml += `<div class="stack" style="margin-bottom:16px;">`;
            for (const e of items) newHtml += entityCardFull(e);
            newHtml += `</div>`;
          }
          // Replace all content in the From Sub-Namespaces section
          const sectionHeader = showMoreEntBtn.previousElementSibling;
          while (sectionHeader?.previousElementSibling) {
            sectionHeader.previousElementSibling.remove();
          }
          sectionHeader?.remove();
          showMoreEntBtn.remove();
        }
        showMoreEntBtn.remove();
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
        ${credDot(entity.credibility, { labeled: true })}
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

      // Narrative info popup
      const infoBtn = document.getElementById('narrative-info-btn');
      const infoPopup = document.getElementById('narrative-info-popup');
      if (infoBtn && infoPopup) {
        infoBtn.onclick = (e) => { e.stopPropagation(); infoPopup.classList.toggle('visible'); };
        document.addEventListener('click', (e) => {
          if (!infoPopup.contains(e.target) && e.target !== infoBtn) infoPopup.classList.remove('visible');
        });
      }

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

  // === VIEW: ABOUT ===
  function viewAbout() {
    setBreadcrumb([
      { label: 'Home', href: '#/' },
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

      <h2>For AI Agents</h2>
      <p>NOESIS is designed to be queried by AI agents, not just browsed by humans. Unlike unstructured document retrieval (RAG), NOESIS gives agents <strong>typed relations</strong>, <strong>source provenance</strong>, and <strong>causal reasoning</strong> — the tools to answer "why?" instead of just "what?".</p>

      <h3>Quick Start</h3>
      <p>An agent's first call should be <code>GET /api/overview</code> — it returns everything needed to orient: instance stats, namespace tree, available entity types, relation types with inference properties, and recent activity. From there:</p>
      <ul>
        <li><strong>Find things:</strong> <code>GET /api/search?q=gold+rally</code> — full-text search across entities, sources, and narratives</li>
        <li><strong>Understand things:</strong> <code>GET /api/entities/:id?enrich=true</code> — returns the entity, all its relations (with resolved names), sources, and narratives in one call</li>
        <li><strong>Follow stories:</strong> <code>GET /api/narratives/:context?format=summary</code> — returns causal chains, key actors, and timeline as agent-friendly prose</li>
        <li><strong>Ask "why?":</strong> <code>GET /api/path?from=A&amp;to=B&amp;enrich=true</code> — finds and explains causal paths between any two entities</li>
      </ul>

      <h3>Why Not Just RAG?</h3>
      <p>Retrieval-augmented generation pulls relevant text chunks and hopes the model can reason over them. It works for simple questions. It fails for causal reasoning, temporal understanding, and evidence verification — exactly the things that matter when knowledge is complex.</p>
      <p>NOESIS provides what RAG cannot:</p>
      <table class="acro-table">
        <tr><td>🔗</td><td>Typed Relations</td><td>Not just "these things are related" — <em>how</em> they're related (causes, enables, contradicts), with inference properties</td></tr>
        <tr><td>📖</td><td>Narrative Sequence</td><td>Events are ordered into stories with causality — agents can follow the plot, not just find keywords</td></tr>
        <tr><td>📄</td><td>Source Provenance</td><td>Every claim links to source documents — agents can verify instead of hallucinate</td></tr>
        <tr><td>🔀</td><td>Transitive Inference</td><td>If A causes B and B causes C, the path endpoint finds A→B→C automatically</td></tr>
        <tr><td>🌐</td><td>Namespace Perspectives</td><td>The same entity viewed through different domain lenses — finance sees an asset, news sees a story</td></tr>
      </table>

      <h3>Example: Three Calls to Answer a Complex Question</h3>
      <p>Question: <em>"Why did gold reach an all-time high, and what were the downstream effects?"</em></p>
      <ol>
        <li><code>GET /api/search?q=gold+all-time+high</code> → finds <code>evt-gold-ath</code></li>
        <li><code>GET /api/entities/evt-gold-ath?enrich=true</code> → returns the event with all incoming causes and outgoing effects, plus source articles</li>
        <li><code>GET /api/path?from=evt-tariff-pause&amp;to=evt-gold-ath&amp;enrich=true</code> → traces the full causal chain from trigger to outcome</li>
      </ol>
      <p>Three calls. Typed, sourced, causal. No hallucination required.</p>

      <h3>Agent API Reference</h3>
      <table class="acro-table">
        <tr><td style="font-family:monospace;font-size:0.8rem;">/api/overview</td><td colspan="2">Instance discovery — stats, namespaces, types, relation properties, recent entities</td></tr>
        <tr><td style="font-family:monospace;font-size:0.8rem;">/api/search?q=...</td><td colspan="2">Full-text search across entities, sources, and narratives</td></tr>
        <tr><td style="font-family:monospace;font-size:0.8rem;">/api/path?from=...&amp;to=...</td><td colspan="2">Find causal paths between two entities</td></tr>
        <tr><td style="font-family:monospace;font-size:0.8rem;">/api/entities/:id?enrich=true</td><td colspan="2">Entity + relations + sources + narratives in one call</td></tr>
        <tr><td style="font-family:monospace;font-size:0.8rem;">/api/relations?entity=...&amp;enrich=true</td><td colspan="2">Relations with inline entity data (no N+1 queries)</td></tr>
        <tr><td style="font-family:monospace;font-size:0.8rem;">/api/narratives?namespace=...</td><td colspan="2">Namespace-scoped narrative listing</td></tr>
        <tr><td style="font-family:monospace;font-size:0.8rem;">/api/narratives/:ctx?format=summary</td><td colspan="2">Agent-friendly narrative digest with causal chains</td></tr>
      </table>

      <a href="#/" class="about-enter">Enter the Explorer →</a>
    </div>`;
  }


  // === VIEW: DASHBOARD ===
  function viewDashboard(dashboardId) {
    setBreadcrumb([
      { label: 'Home', href: '#/' },
      { label: 'Dashboards', href: '#/dashboard' },
      { label: 'MAGA vs Casualties', href: '#/dashboard/maga-casualties' },
    ]);

    // MAGA Enthusiasm Index: Trump Approval Rating (Gallup, Feb 2026: Gallup ceased polling)
    // Latest polls show Trump approval around 47-49%
    const magaData = [
      { date: '2025-01', approval: 47, disapproval: 48, source: 'Gallup' },
      { date: '2025-02', approval: 48, disapproval: 47, source: 'Gallup' },
      { date: '2025-06', approval: 45, disapproval: 50, source: 'RCP Average' },
      { date: '2025-12', approval: 44, disapproval: 51, source: 'RCP Average' },
      { date: '2026-01', approval: 49, disapproval: 46, source: 'RCP Average' },
      { date: '2026-02', approval: 52, disapproval: 44, source: 'RCP Average' }, // Post-Iran strike bump
    ];

    // US Military Casualties (Wikipedia data)
    const casualties = [
      { conflict: 'War in Afghanistan', years: '2001-2021', deaths: 2325, wounded: 20093, total: 22311 },
      { conflict: 'Iraq War', years: '2003-2011', deaths: 4492, wounded: 32222, total: 36710 },
      { conflict: '2026 Iran Conflict', years: '2026', deaths: 6, wounded: 18, total: 24 },
      { conflict: '2026 Venezuela Intervention', years: '2026', deaths: 0, wounded: 7, total: 7 },
      { conflict: 'Operation Inherent Resolve', years: '2014-2025', deaths: 120, wounded: 496, total: 616 },
    ];

    // Calculate total 2026 casualties
    const total2026Deaths = casualties.filter(c => c.years.includes('2026')).reduce((sum, c) => sum + c.deaths, 0);
    const total2026Wounded = casualties.filter(c => c.years.includes('2026')).reduce((sum, c) => sum + c.wounded, 0);

    let html = `<div class="dashboard-page">
      <h1>📊 MAGA Enthusiasm vs US Military Casualties</h1>
      <p class="dashboard-subtitle">Tracking the correlation between Trump approval ratings and American military deaths in active conflicts</p>

      <div class="dashboard-tabs">
        <a href="#/dashboard/maga-casualties" class="dash-tab active">📈 Overview</a>
        <a href="#/dashboard/approval-history" class="dash-tab">📅 Approval History</a>
        <a href="#/dashboard/casualty-details" class="dash-tab">⚔️ Casualty Details</a>
      </div>

      <div class="dash-grid">
        <div class="dash-card">
          <div class="dash-card-title">🇺🇸 Trump Approval Rating</div>
          <div class="dash-big-number">${magaData[magaData.length - 1].approval}%</div>
          <div class="dash-card-subtitle">${magaData[magaData.length - 1].date} · ${magaData[magaData.length - 1].source}</div>
          <div class="dash-trend up">+3 pts from Jan 2026</div>
          <div class="dash-note">Post-Iran strike rally effect</div>
        </div>

        <div class="dash-card">
          <div class="dash-card-title">⚔️ US Deaths (2026)</div>
          <div class="dash-big-number warn">${total2026Deaths}</div>
          <div class="dash-card-subtitle">Killed in Action</div>
          <div class="dash-detail">+${total2026Wounded} wounded</div>
        </div>

        <div class="dash-card">
          <div class="dash-card-title">Iran Conflict</div>
          <div class="dash-number">${casualties.find(c => c.conflict.includes('Iran')).deaths}</div>
          <div class="dash-card-subtitle">US combat deaths</div>
          <div class="dash-detail">${casualties.find(c => c.conflict.includes('Iran')).wounded} wounded</div>
        </div>

        <div class="dash-card">
          <div class="dash-card-title">Venezuela</div>
          <div class="dash-number">${casualties.find(c => c.conflict.includes('Venezuela')).deaths}</div>
          <div class="dash-card-subtitle">US combat deaths</div>
          <div class="dash-detail">${casualties.find(c => c.conflict.includes('Venezuela')).wounded} wounded</div>
        </div>
      </div>

      <div class="section-header"><span class="icon">📈</span>Trump Approval Trend</div>
      <div class="chart-container">
        <div class="simple-chart" id="approval-chart"></div>
      </div>

      <div class="section-header"><span class="icon">⚔️</span>Active Conflicts (2026)</div>
      <div class="conflict-table">
        <div class="conflict-row header">
          <span>Conflict</span>
          <span>Period</span>
          <span>Deaths</span>
          <span>Wounded</span>
          <span>Total</span>
        </div>
${casualties.filter(c => c.years.includes('2026') || c.years.includes('2014')).map(c => `        <div class="conflict-row">
          <span class="conflict-name">${c.conflict}</span>
          <span>${c.years}</span>
          <span class="${c.deaths > 0 ? 'deaths' : ''}">${c.deaths}</span>
          <span>${c.wounded}</span>
          <span>${c.total}</span>
        </div>`).join('
')}
      </div>

      <div class="section-header"><span class="icon">📊</span>Historical Context</div>
      <div class="history-cards">
        <div class="hist-card">
          <div class="hist-title">Afghanistan (2001-2021)</div>
          <div class="hist-deaths">2,325 deaths</div>
          <div class="hist-context">Longest US war · Ended under Biden withdrawal</div>
        </div>
        <div class="hist-card">
          <div class="hist-title">Iraq War (2003-2011)</div>
          <div class="hist-deaths">4,492 deaths</div>
          <div class="hist-context">Based on WMD claims · Major anti-war movement</div>
        </div>
        <div class="hist-card highlight">
          <div class="hist-title">Iran Conflict (2026)</div>
          <div class="hist-deaths">6 deaths</div>
          <div class="hist-context">Trump-ordered strikes · Approval rallied +5pts</div>
        </div>
      </div>

      <div class="dashboard-footer">
        <p><strong>Sources:</strong> Gallup (ceased Feb 2026), RealClearPolitics, Wikipedia US Military Casualties</p>
        <p><strong>Note:</strong> Gallup announced Feb 11, 2026 they would cease presidential approval polling after 88 years.</p>
      </div>
    </div>`;

    .innerHTML = html;

    // Draw simple chart
    setTimeout(() => drawApprovalChart(magaData), 50);
  }

  function drawApprovalChart(data) {
    const container = document.getElementById('approval-chart');
    if (!container) return;

    const maxApproval = Math.max(...data.map(d => d.approval));
    const minApproval = Math.min(...data.map(d => d.approval));
    const range = maxApproval - minApproval + 10;

    let bars = '';
    data.forEach((d, i) => {
      const h = ((d.approval - minApproval + 5) / range) * 100;
      const color = d.approval >= 50 ? '#4CAF50' : '#6BA3D6';
      bars += `<div class="chart-bar" style="height:${h}%">
        <div class="bar-fill" style="background:${color}"></div>
        <div class="bar-label">${d.approval}%</div>
        <div class="bar-date">${d.date.split('-')[1]}/${d.date.split('-')[0].slice(2)}</div>
      </div>`;
    });

    container.innerHTML = `<div class="chart-bars">${bars}</div><div class="chart-legend">▲ Higher = Better Approval</div>`;
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
