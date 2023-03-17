import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import socket from "./socket";
import HomePage from "./views/HomePage";
import SignInPage from "./views/SignInPage";
import SignUpPage from "./views/SignUpPage";

type Props = {};

export default function App({}: Props) {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  function signIn(username: string, password: string) {
    socket.emit("sign_in", { username, password });
  }

  function signUp(username: string, password: string) {
    socket.emit("sign_up", { username, password });
  }

  useEffect(() => {
    if (!username) navigate("/sign-in");

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function signedIn(data: { username: string }) {
      setUsername(data.username);
      navigate("/");
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
    <div className="fixed w-full h-screen flex justify-center items-center px-4 py-8 pb-24">
      <Routes>
        <Route path="/" element={<HomePage username={username} />} />
        <Route path="/sign-up" element={<SignUpPage onSubmit={signUp} />} />
        <Route path="/sign-in" element={<SignInPage onSubmit={signIn} />} />
      </Routes>
    </div>
  );
}
