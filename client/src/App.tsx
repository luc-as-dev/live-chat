import React, { useEffect, useState } from "react";
import socket from "./socket";
import LoginPage from "./views/LoginPage";

type Props = {};

export default function App({}: Props) {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  function login(username: string, password: string) {}

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

  return (
    <div className="max-w-lg mx-auto my-20 p-4">
      <LoginPage />
    </div>
  );
}
