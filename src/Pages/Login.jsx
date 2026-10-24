import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    if(!email || !password){
        setError("Please enter a valid email");
        return;
    }
    if(password.length<6){
        setError("Password must be at least 6 charactors");
        return;
    }

    setError("");
    alert("Login successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;