import React from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <h1>INDEX</h1>
      <button
        onClick={() => {
          navigate("vnc");
        }}
      >
        VNC window
      </button>
    </>
  );
}
export default App;
