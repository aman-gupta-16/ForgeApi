"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import BrandLoader from "@/components/BrandLoader";
import { useLoginUserMutation } from "@/lib/services/apiSlice";
import { useAuth } from "@/hooks/useAuth";
import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Code, CheckCircle } from "lucide-react";
import Link from "next/link";
import { handleApiError, showToast } from "@/lib/toast-utils";
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();

  // Handle success messages from redirects
  useEffect(() => {
    const message = searchParams.get('message');
    if (message === 'password-reset-success') {
      showToast.success("Password Reset Successful", "Your password has been updated. Please sign in with your new password.");
      // Clear the URL parameter
      router.replace('/login', undefined);
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      showToast.error("Validation Error", "Please enter both email and password");
      return;
    }

    try {
      const result = await loginUser(form).unwrap();

      console.log("✅ Login success:", result);

      // Use the auth hook to set authentication data
      setAuth(result.accessToken, result.refreshToken, result.user);

      console.log("🚀 Auth state updated, redirecting to dashboard...");
      
      // Show success toast
      showToast.success("Welcome back!", `Successfully signed in as ${result.user.userName || result.user.email}`);
      
      // Small delay to ensure state update propagates
      setTimeout(() => {
        window.location.reload(); // reloads with cache
        router.push("/dashboard");
      }, 100);
    } catch (err: any) {
      console.error("❌ Login failed:", err);
      handleApiError(err, "Login failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <RedirectIfAuthenticated>
      <section className="min-h-screen flex items-center justify-center bg-professional-dark relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      
      <div className="relative container-padding w-full max-w-lg animate-fade-in">
        {isLoading ? (
          <div className="text-center space-y-4">
            <BrandLoader size={64} />
            <p className="text-slate-400 text-lg">Signing you in...</p>
          </div>
        ) : (
          <Card className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 shadow-2xl rounded-xl">
            {/* Header */}
            <CardHeader className="text-center pb-8 pt-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-blue-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-gradient-secondary mb-3">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-lg text-slate-400">
                Sign in to your ForgeAPI account to continue building amazing APIs
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pb-8">
              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300 font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="pl-12 h-12 bg-slate-800/80 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-blue-500/60 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                      className="pl-12 pr-12 h-12 bg-slate-800/80 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-blue-500/60 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link 
                    href="/forgot-password" 
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !form.email.trim() || !form.password.trim()}
                  className="w-full h-12 btn-primary text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 group"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <BrandLoader size={20} />
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="pt-6 border-t border-slate-700/50">
                <div className="text-center space-y-4">
                  <p className="text-slate-400">
                    Don't have an account?{' '}
                    <Link 
                      href="/signup" 
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      Create one for free
                    </Link>
                  </p>
                  
                  {/* Features reminder */}
                  {/* <div className="bg-slate-800/50 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Free tier includes 3 schemas & 1K requests/month</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>No credit card required to get started</span>
                    </div>
                  </div> */}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
    </RedirectIfAuthenticated>
  );
}
