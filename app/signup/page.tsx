"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import BrandLoader from "@/components/BrandLoader";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true); // Start loader
    try {
      await apiFetch("/user/registerUser", {
        method: "POST",
        body: JSON.stringify(form),
      });
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false); // Stop loader
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      {loading ? (
        <BrandLoader size={56} />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 p-8 rounded-lg shadow-xl border border-slate-800 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h2>
          <div className="mb-4">
            <input
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700"
              placeholder="Username"
              value={form.userName}
              onChange={e => setForm(f => ({ ...f, userName: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700"
              placeholder="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            Sign Up
          </Button>
          <div className="mt-4 text-center">
            <span className="text-slate-400">Already have an account? </span>
            <a href="/login" className="text-emerald-400 hover:underline">Login</a>
          </div>
        </form>
      )}
    </section>
  );
}