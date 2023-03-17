import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import socket from "../socket";

type Props = {};

export default function LoginPage({}: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function usernameOnChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function passwordOnChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return (
    <form
      onSubmit={submitHandler}
      className="bg-gray-100 px-4 py-8 gap-8 flex flex-col rounded-md shadow-md"
    >
      <h1 className="text-emerald-500 text-4xl font-bold text-center">Login</h1>
      <input
        className="bg-gray-100 placeholder-emerald-500 border-gray-300 font-medium border-b text-lg px-4 py-2 rounded-none outline-none"
        placeholder="Username"
        type="text"
        value={username}
        onChange={usernameOnChangeHandler}
      />
      <input
        className="bg-gray-100 placeholder-emerald-500 border-gray-300 font-medium border-b text-lg px-4 py-2 rounded-none outline-none"
        placeholder="Password"
        type="password"
        value={password}
        onChange={passwordOnChangeHandler}
      />
      <button
        type="submit"
        className="bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-bold text-lg py-3"
      >
        Login
      </button>
    </form>
  );
}
