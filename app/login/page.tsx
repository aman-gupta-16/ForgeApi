"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import BrandLoader from "@/components/BrandLoader";
import { useLoginUserMutation } from "@/lib/services/apiSlice";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await loginUser(form).unwrap();

      console.log("✅ Login success:", result);

      // Save tokens & user in localStorage
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("user", JSON.stringify(result.user));

      // redirect to dashboard (or anywhere secure)
      router.push("/dashboard");
    } catch (err: any) {
      console.error("❌ Login failed:", err);
      setError(err?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      {isLoading ? (
        <BrandLoader size={56} />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 p-8 rounded-lg shadow-xl border border-slate-800 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Login
          </h2>
          <div className="mb-4">
            <input
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <div className="mt-4 text-center">
            <span className="text-slate-400">Don't have an account? </span>
            <a href="/signup" className="text-emerald-400 hover:underline">
              Sign Up
            </a>
          </div>
        </form>
      )}
    </section>
  );
}
