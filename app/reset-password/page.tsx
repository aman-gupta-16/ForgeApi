"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import BrandLoader from "@/components/BrandLoader";
import { Eye, EyeOff, Lock, ArrowRight, Code, Shield, CheckCircle, X, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { showToast, handleApiError } from "@/lib/toast-utils";
import { useResetPasswordMutation } from "@/lib/services/apiSlice";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    if (!token) {
      setTokenError("No reset token found. Please request a new password reset.");
    }
  }, [token]);

  const getPasswordStrength = () => {
    const password = form.newPassword;
    if (password.length === 0) return { strength: 0, text: "", color: "" };
    if (password.length < 6) return { strength: 1, text: "Weak", color: "text-red-400" };
    if (password.length < 10) return { strength: 2, text: "Medium", color: "text-yellow-400" };
    return { strength: 3, text: "Strong", color: "text-emerald-400" };
  };

  const passwordStrength = getPasswordStrength();

  const validatePasswords = () => {
    if (!form.newPassword || !form.confirmPassword) {
      showToast.error("Validation Error", "Please fill in both password fields");
      return false;
    }

    if (form.newPassword.length < 6) {
      showToast.error("Validation Error", "Password must be at least 6 characters long");
      return false;
    }

    if (form.newPassword !== form.confirmPassword) {
      showToast.error("Validation Error", "Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      showToast.error("Invalid Request", "No reset token found. Please request a new password reset.");
      return;
    }

    if (!validatePasswords()) {
      return;
    }

    try {
      const result = await resetPassword({
        token,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword
      }).unwrap();

      setResetSuccess(true);
      showToast.success("Password Reset Successful", result.message);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login?message=password-reset-success");
      }, 3000);
    } catch (error: any) {
      if (error?.data?.message && error.data.message.includes('Invalid or expired')) {
        setTokenError(error.data.message);
        showToast.error("Invalid Token", error.data.message);
      } else {
        handleApiError(error, "Failed to reset password. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Token error state
  if (tokenError) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-professional-dark relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      
        <div className="relative container-padding w-full max-w-lg animate-fade-in">
          <Card className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 shadow-2xl rounded-xl">
            <CardHeader className="text-center pb-8 pt-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-red-400 mb-3">
                Invalid Reset Link
              </CardTitle>
              <CardDescription className="text-lg text-slate-400">
                This password reset link is invalid or has expired
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pb-8">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <p className="text-slate-300 leading-relaxed">{tokenError}</p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => router.push("/forgot-password")}
                  className="w-full h-12 btn-primary text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25"
                >
                  Request New Reset Link
                </Button>
                
                <Button
                  onClick={() => router.push("/login")}
                  variant="outline"
                  className="w-full h-12 border-slate-600/60 text-slate-300 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all duration-200"
                >
                  Back to Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  // Success state
  if (resetSuccess) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-professional-dark relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      
        <div className="relative container-padding w-full max-w-lg animate-fade-in">
          <Card className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 shadow-2xl rounded-xl">
            <CardHeader className="text-center pb-8 pt-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-gradient-secondary mb-3">
                Password Reset Successful
              </CardTitle>
              <CardDescription className="text-lg text-slate-400">
                Your password has been updated successfully
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pb-8">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 text-emerald-400 font-medium mb-3">
                  <Shield className="w-5 h-5" />
                  <span>Password updated successfully</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  You can now sign in to your account using your new password. 
                  For security, all existing sessions have been logged out.
                </p>
              </div>

              <div className="text-center">
                <p className="text-slate-400 mb-4">Redirecting you to sign in...</p>
                <div className="flex justify-center">
                  <BrandLoader size={32} />
                </div>
              </div>

              <Button
                onClick={() => router.push("/login")}
                className="w-full h-12 btn-primary text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25"
              >
                Continue to Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  // Form state
  return (
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
            <p className="text-slate-400 text-lg">Resetting your password...</p>
          </div>
        ) : (
          <Card className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 shadow-2xl rounded-xl">
            {/* Header */}
            <CardHeader className="text-center pb-8 pt-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-blue-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-gradient-secondary mb-3">
                Create New Password
              </CardTitle>
              <CardDescription className="text-lg text-slate-400">
                Enter a secure password for your ForgeAPI account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pb-8">
              {/* Reset Password Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-slate-300 font-medium">
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      value={form.newPassword}
                      onChange={(e) => setForm((f) => ({ ...f, newPassword: e.target.value }))}
                      className="pl-12 pr-12 h-12 bg-slate-800/80 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-blue-500/60 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
                      required
                      autoFocus
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
                  {form.newPassword && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                              passwordStrength.strength === 1 ? 'bg-red-500 w-1/3' :
                              passwordStrength.strength === 2 ? 'bg-yellow-500 w-2/3' :
                              passwordStrength.strength === 3 ? 'bg-emerald-500 w-full' : 'w-0'
                            }`}
                          />
                        </div>
                        <span className={`text-sm font-medium ${passwordStrength.color}`}>
                          {passwordStrength.text}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-300 font-medium">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      value={form.confirmPassword}
                      onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                      className="pl-12 pr-12 h-12 bg-slate-800/80 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-blue-500/60 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
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
                      {form.newPassword === form.confirmPassword ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">Passwords match</span>
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4 text-red-400" />
                          <span className="text-red-400">Passwords must match</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <h4 className="text-slate-300 font-medium mb-2">Password Requirements:</h4>
                  <ul className="space-y-1 text-sm">
                    <li className={`flex items-center gap-2 ${
                      form.newPassword.length >= 6 ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {form.newPassword.length >= 6 ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <div className="w-3 h-3 border border-slate-400 rounded-full" />
                      )}
                      At least 6 characters
                    </li>
                    <li className={`flex items-center gap-2 ${
                      form.newPassword && form.confirmPassword && form.newPassword === form.confirmPassword ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {form.newPassword && form.confirmPassword && form.newPassword === form.confirmPassword ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <div className="w-3 h-3 border border-slate-400 rounded-full" />
                      )}
                      Passwords must match
                    </li>
                  </ul>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !form.newPassword.trim() || !form.confirmPassword.trim() || form.newPassword !== form.confirmPassword || form.newPassword.length < 6}
                  className="w-full h-12 btn-primary text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 group"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <BrandLoader size={20} />
                      <span>Resetting Password...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Reset Password</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Security Notice */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-blue-400 font-medium text-sm">Security Notice</p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      After resetting your password, you'll be logged out of all devices 
                      and will need to sign in again with your new password.
                    </p>
                  </div>
                </div>
              </div>

              {/* Back to Login */}
              <div className="pt-6 border-t border-slate-700/50">
                <div className="text-center">
                  <p className="text-slate-400">
                    Remember your password?{' '}
                    <Link 
                      href="/login" 
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      Sign in instead
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}