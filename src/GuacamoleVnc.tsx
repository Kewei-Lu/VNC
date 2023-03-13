import React, { useEffect, useRef } from "react";
import Guacamole from "guacamole-common-js";

export default function GuacamoleVnc() {
  const GuacamoleVncWindow = useRef<HTMLDivElement>();
  useEffect(() => {
    var guac = new Guacamole.Client(
      new Guacamole.HTTPTunnel("http://10.67.103.83:4822", true, {})
    );
    GuacamoleVncWindow.current.appendChild(guac.getDisplay().getElement());
    guac.onerror = function (error) {
      alert(error);
    };

    // Connect
    guac.connect();

    // Disconnect on close
    window.onunload = function () {
      guac.disconnect();
    };
  }, []);
  return <div ref={GuacamoleVncWindow}></div>;
}
