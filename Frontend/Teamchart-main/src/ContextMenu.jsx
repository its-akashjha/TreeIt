// import React, { useCallback } from "react";
// import { useReactFlow } from "reactflow";
// import { layoutNodesWithDagre } from "./layoutNodesWithDagre";

// export default function ContextMenu({
//   id,
//   top,
//   left,
//   right,
//   bottom,
//   ...props
// }) 
import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { layoutNodesWithDagre } from "./layoutNodesWithDagre";




export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}) 
{

  const { getNode, setNodes, addNodes, setEdges, getNodes, getEdges } = useReactFlow();
  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };

    addNodes({ ...node, id: `${node.id}-copy`, position });
  }, [id, getNode, addNodes]);

  const applyAutoLayout = () => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();
    const layouted = layoutNodesWithDagre(currentNodes, currentEdges, "TB"); // or "LR"
    setNodes(layouted);
  };

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <div
      style={{ top, left, right, bottom }}
      className="absolute z-10 bg-white border rounded-md shadow-xl outline"
      {...props}
    >
      <p style={{ margin: "0.5em" }}>
        <small>node: {id}</small>
      </p>
      <button
        onClick={duplicateNode}
        className="hover:bg-slate-200 bg-slate-100  block p-[0.5em] text-left w-[100%]"
      >
        <small>Duplicate</small>
      </button>
      <button
        onClick={deleteNode}
        className="hover:bg-slate-200 bg-slate-100 block p-[0.5em] text-left w-[100%]"
      >
        <small>Delete</small>
      </button>

      <button onClick={applyAutoLayout} className="px-2 py-1 bg-blue-500 text-white rounded">
        Auto Layout
      </button>

    </div>
  );
}
