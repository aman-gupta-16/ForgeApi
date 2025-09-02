"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import BrandLoader from "@/components/BrandLoader";
import { useRegisterUserMutation } from "@/lib/services/apiSlice";
import { useAuth } from "@/hooks/useAuth";
import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Code, AlertCircle, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await registerUser(form).unwrap();
      console.log("✅ Registered:", result);

      // redirect to login after success
      router.push("/login");
    } catch (err: any) {
      console.error("❌ Register failed:", err);
      setError(err?.data?.message || "Registration failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getPasswordStrength = () => {
    const password = form.password;
    if (password.length === 0) return { strength: 0, text: "", color: "" };
    if (password.length < 6) return { strength: 1, text: "Weak", color: "text-red-400" };
    if (password.length < 10) return { strength: 2, text: "Medium", color: "text-yellow-400" };
    return { strength: 3, text: "Strong", color: "text-emerald-400" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <RedirectIfAuthenticated>
      <section className="min-h-screen flex items-center justify-center bg-professional-dark relative overflow-hidden py-8">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      
      <div className="relative container-padding w-full max-w-lg animate-fade-in">
        {isLoading ? (
          <div className="text-center space-y-4">
            <BrandLoader size={64} />
            <p className="text-slate-400 text-lg">Creating your account...</p>
          </div>
        ) : (
          <Card className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 shadow-2xl rounded-xl">
            {/* Header */}
            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-3xl font-bold text-gradient-secondary mb-3">
                Join ForgeAPI
              </CardTitle>
              <CardDescription className="text-lg text-slate-400">
                Create your free account and start building APIs in seconds
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pb-8">
              {/* Error Alert */}
              {error && (
                <Alert className="border-red-500/50 bg-red-500/10 animate-slide-up">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Features highlight */}
              {/* <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Free forever plan • No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>3 custom schemas & 1,000 requests/month included</span>
                </div>
              </div> */}

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-300 font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a unique username"
                      value={form.userName}
                      onChange={(e) => setForm((f) => ({ ...f, userName: e.target.value }))}
                      className="pl-12 h-12 bg-slate-800/80 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-emerald-500/60 focus:ring-emerald-500/20 rounded-xl transition-all duration-200"
                      required
                    />
                  </div>
                </div>

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
                      className="pl-12 h-12 bg-slate-800/80 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-emerald-500/60 focus:ring-emerald-500/20 rounded-xl transition-all duration-200"
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
                      placeholder="Create a secure password"
                      value={form.password}
                      onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                      className="pl-12 pr-12 h-12 bg-slate-800/80 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-emerald-500/60 focus:ring-emerald-500/20 rounded-xl transition-all duration-200"
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
                  {/* Password strength indicator */}
                  {form.password && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              passwordStrength.strength === 1 ? 'bg-red-500 w-1/3' :
                              passwordStrength.strength === 2 ? 'bg-yellow-500 w-2/3' :
                              passwordStrength.strength === 3 ? 'bg-emerald-500 w-full' : 'w-0'
                            }`}
                          />
                        </div>
                        <span className={`text-xs font-medium ${passwordStrength.color}`}>
                          {passwordStrength.text}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-300 font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={form.confirmPassword}
                      onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                      className="pl-12 pr-12 h-12 bg-slate-800/80 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-emerald-500/60 focus:ring-emerald-500/20 rounded-xl transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {/* Password match indicator */}
                  {form.confirmPassword && (
                    <div className="flex items-center gap-2 text-sm">
                      {form.password === form.confirmPassword ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">Passwords match</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-400" />
                          <span className="text-red-400">Passwords don't match</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Terms and Privacy */}
                {/* <div className="text-sm text-slate-400 leading-relaxed">
                  By creating an account, you agree to our{' '}
                  <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    Privacy Policy
                  </Link>
                  .
                </div> */}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !form.userName.trim() || !form.email.trim() || !form.password.trim() || !form.confirmPassword.trim()}
                  className="w-full h-12 btn-primary text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 group"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <BrandLoader size={20} />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span>Create Free Account</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Login Link */}
              <div className="pt-6 border-t border-slate-700/50 text-center">
                <p className="text-slate-400">
                  Already have an account?{' '}
                  <Link 
                    href="/login" 
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Sign in instead
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
    </RedirectIfAuthenticated>
  );
}