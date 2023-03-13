import React, { useEffect, useRef, useState } from "react";
import RFB from "@novnc/novnc/core/rfb";

const sendPasteToRemote = (rfb: RFB, text: string) => {
  rfb.clipboardPasteFrom(text);
};

export default function Vnc() {
  const vncWindow = useRef<HTMLDivElement>();
  const [vncStatus, setVncStatus] = useState<string>("");
  // name of vnc desktop name
  const desktopName = useRef<string>("");
  const [pasteContent, setPasteContent] = useState<string>("");
  const vncClient = useRef<RFB | undefined>();

  useEffect(() => {
    // const rfb = new RFB(vncWindow.current, "ws://10.67.103.83:6080/websockify");
    const rfb = new RFB(vncWindow.current, "ws://10.67.103.83:6080");
    // give it back to ref for use outside useEffect
    vncClient.current = rfb;
    rfb.clipViewport = true;
    rfb.scaleViewport = true;
    rfb.addEventListener("connect", (e) => {
      setVncStatus(`Connect to ${desktopName.current}`);
    });
    rfb.addEventListener("credentialsrequired", () => {
      // const password = prompt("Password Required:");
      rfb.sendCredentials({ password: "123456", username: "", target: "" });
    });
    rfb.addEventListener("disconnect", (e) => {
      if (e.detail.clean) {
        setVncStatus(`Disconnect from ${desktopName.current}`);
      } else {
        setVncStatus("Something went wrong, connection is closed");
      }
    });
    rfb.addEventListener("desktopname", (e) => {
      console.log("desktopname: ", e.detail.name);
      desktopName.current = e.detail.name;
    });
    rfb.addEventListener("clipboard", (e) => {
      console.log("clipboard: ", e.detail.text);
      setPasteContent(e.detail.text);
    });
    console.log("vncStatus", vncStatus);
  }, []);

  return (
    <div
      style={{
        width: "100wh",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: "10%" }}>
        <div>{vncStatus}</div>
        <div>
          <textarea
            style={{ marginRight: "1rem" }}
            placeholder="input"
            value={pasteContent}
            onChange={(e) => {
              console.log(setPasteContent(e.target.value));
              sendPasteToRemote(vncClient.current, e.target.value);
              console.log("pasteContent", e.target.value);
            }}
          ></textarea>
          {/* <button
            style={{ verticalAlign: "bottom" }}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              sendPasteToRemote(vncClient.current, pasteContent);
              alert("clipboard sent to vnc machine successfully");
            }}
          >
            Send to remote host
          </button> */}
        </div>
      </div>

      <div
        id="screen"
        ref={vncWindow}
        style={{
          flex: 1,
          height: "90%",
          width: "100%",
        }}
      ></div>
    </div>
  );
}
