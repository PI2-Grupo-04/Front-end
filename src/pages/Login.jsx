import api from "../service/api";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const response = await api.post("auth/login", {
      username: username,
      password: password,
    });
    setUsername("");
    setPassword("");
    console.log(response);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col bg-yellow-400 mt-10 p-10 rounded text-yellow-900 font-semibold space-y-6">
        <h1 className="text-2xl">Login</h1>
        <div className="flex flex-col space-y-2">
          <label htmlFor="username">Username</label>
          <input
            className="rounded px-2 bg-yellow-100"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            className="rounded px-2 bg-yellow-100"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-green-500 text-white py-1 rounded font-semibold"
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default Login;
