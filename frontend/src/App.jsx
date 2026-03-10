import React, { useMemo } from "react";
import ReactFlow, { Background, Controls } from "reactflow";

const initialNodes = [
  {
    id: "device-1",
    type: "input",
    position: { x: 40, y: 40 },
    data: { label: "Device: PGx Selector" }
  },
  {
    id: "group-1",
    position: { x: 320, y: 40 },
    data: { label: "Group: Main" }
  },
  {
    id: "component-1",
    position: { x: 320, y: 140 },
    data: { label: "Component: Options" }
  }
];

const initialEdges = [
  { id: "e1-2", source: "device-1", target: "component-1", animated: true }
];

const App = () => {
  const nodes = useMemo(() => initialNodes, []);
  const edges = useMemo(() => initialEdges, []);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>xControl Visual Configurator</h1>
        <p>Graph-driven editor for xControl settings.yaml</p>
      </header>
      <div className="app-body">
        <section className="panel graph-panel">
          <div className="panel-header">Node Graph</div>
          <div className="panel-body">
            <ReactFlow nodes={nodes} edges={edges} fitView>
              <Background gap={16} />
              <Controls />
            </ReactFlow>
          </div>
        </section>
        <section className="panel inspector-panel">
          <div className="panel-header">Inspector</div>
          <div className="panel-body">
            <div className="field">
              <label>Selected Node</label>
              <div className="field-value">Component: Options</div>
            </div>
            <div className="field">
              <label>Default Value</label>
              <input type="number" defaultValue={1} />
            </div>
            <div className="field">
              <label>Status Mapping</label>
              <input type="text" defaultValue="$PGxMeter-1.state" />
            </div>
          </div>
        </section>
        <section className="panel preview-panel">
          <div className="panel-header">Live Preview</div>
          <div className="panel-body preview-body">
            <div className="preview-card">
              <div className="preview-title">PGx Source</div>
              <div className="preview-options">
                <button type="button" className="preview-option is-selected">Source 1</button>
                <button type="button" className="preview-option">Source 2</button>
                <button type="button" className="preview-option">Source 3</button>
              </div>
              <div className="preview-status">Selected: 1 (from $PGxMeter-1.state)</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
