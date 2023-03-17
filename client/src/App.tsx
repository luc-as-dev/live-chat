import React, { useEffect, useState } from "react";
import socket from "./socket";

type Props = {};

export default function App({}: Props) {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return <div>isConnected={isConnected ? "true" : "false"}</div>;
}
