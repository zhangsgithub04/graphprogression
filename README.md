# Graph Progression Lab

A dependency-free HTML, CSS, and JavaScript conversion of the NetworkX graph progression notebook.

## Run locally

From this directory, start a static HTTP server:

    python3 -m http.server 8000 --directory dist

Open http://localhost:8000. Use an HTTP server rather than double-clicking index.html because browsers restrict Web Workers on file:// URLs. No Python packages or JavaScript installation are needed; Python only serves the files. Any static HTTP server works.

## Explore

- Choose n = 1–6 and generate the complete labeled state space.
- Drag to pan, use the wheel or pinch to zoom, or use + / − / Fit.
- Keyboard on the focused canvas: arrows pan, + / − zoom, 0 fits.
- Filter by basin; click any state to see its graph, degrees, and edges.
- Center the selection or trace its trajectory. Trajectories are paginated and expanded on demand.
- Export JSON includes all transitions, cycle membership, transient lengths, edge lists, and measured cycle periods.
- Expand the map to fullscreen on supporting browsers.

## Mathematical conventions

Nodes are 0,...,n−1. For each unordered pair, toggle adjacency if the two current degrees match; otherwise retain adjacency. Updates are simultaneous. IDs encode adjacency bits, in lexicographic unordered-pair order. IDs differ from the notebook's enumeration order (which groups graphs by edge count), but the labeled graphs and transitions are identical. Transient depth counts steps to the first cycle state; cycle states have depth zero. Every cycle state is marked as cycle, and only the final repeated state is marked as repeat.

The original fixed three layers and assumed period two are replaced by exact depths and measured periods. The app does not merge graph isomorphism classes. Complete enumeration grows as 2^(n(n−1)/2). n = 6 has 32,768 states; n = 7 has 2,097,152 and is intentionally excluded. Large overview maps require basin filtering and zoom for readable individual states. Canvas keeps rendering bounded without adding one DOM node per graph. The background worker keeps enumeration off the interface thread.

## Files

- dist/index.html — interface
- dist/style.css — responsive styling
- dist/app.js — canvas, navigation, inspectors, trajectory views, export
- dist/engine.js — exact enumeration and functional-graph analysis
- dist/worker.js — background computation

No external runtime libraries, fonts, APIs, or CDN connections are required.
# graphprogression
