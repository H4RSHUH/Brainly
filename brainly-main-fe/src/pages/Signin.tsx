import { useRef, useState } from "react";
import { Button } from "../components/button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function SignIn() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username) { setError("Username cannot be empty"); return; }
    if (!password) { setError("Password cannot be empty"); return; }

    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, { username, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (e: any) {
      setError(e.response?.data?.msg || "Invalid credentials or network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-grain relative flex min-h-screen items-center justify-center bg-surface-50 px-4 dark:bg-surface-950">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-amber-300/15 blur-3xl dark:bg-amber-500/10" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-sage-400/10 blur-3xl dark:bg-sage-500/5" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Brand */}
        <div className="mb-8 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-surface-900 dark:text-surface-100">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-surface-500 dark:text-surface-400">
            Sign in to your second brain
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-surface-200 bg-white p-6 shadow-lg shadow-surface-900/5 dark:border-surface-800 dark:bg-surface-900 dark:shadow-none">
          <form 
            className="space-y-4" 
            onSubmit={(e) => { e.preventDefault(); signin(); }}
          >
            {error && (
              <div className="rounded-lg bg-err-500/10 border border-err-500/20 px-3 py-2.5 text-sm text-err-500 dark:text-err-400 font-medium">
                {error}
              </div>
            )}

            <Input ref={usernameRef} label="Username" placeholder="Enter your username" />
            <Input ref={passwordRef} type="password" label="Password" placeholder="••••••••" />

            <div className="pt-1">
              <Button 
                onClick={signin} 
                variant="primary" 
                text="Sign in" 
                loading={loading}
                className="w-full"
                type="submit"
              />
            </div>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-surface-500 dark:text-surface-400">
          Don't have an account?{" "}
          <a href="/signup" className="font-semibold text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300 transition-colors">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}