import React, { useEffect, useState } from "react";
import socket from "./socket";
import SignInPage from "./views/SignInPage";
import SignUpPage from "./views/SignUpPage";

type Props = {};

export default function App({}: Props) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  function signIn(username: string, password: string) {
    socket.emit("sign_in", { username, password });
  }

  function signUp(username: string, password: string) {
    socket.emit("sign_up", { username, password });
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function signedIn(data: { username: string }) {
      setUsername(data.username);
    }

    function invalid() {
      console.log("Invalid");
    }

    function error() {
      console.log("Error");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("sign_up_invalid", invalid);
    socket.on("sign_up_error", error);

    socket.on("signed_in", signedIn);
    socket.on("sign_in_invalid", invalid);
    socket.on("sign_in_error", error);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("sign_up_invalid", onDisconnect);
      socket.off("sign_up_error", onDisconnect);
      socket.off("signed_in", onDisconnect);
      socket.off("sign_in_invalid", onDisconnect);
      socket.off("sign_in_error", onDisconnect);
    };
  }, []);

  return (
    <div className="max-w-lg mx-auto my-20 p-4">
      {!username && <SignUpPage onSubmit={signUp} />}
    </div>
  );
}
