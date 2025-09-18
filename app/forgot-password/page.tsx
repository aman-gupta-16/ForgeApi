"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import BrandLoader from "@/components/BrandLoader";
import { Mail, ArrowRight, Code, ArrowLeft, Shield, Clock } from "lucide-react";
import Link from "next/link";
import { showToast, handleApiError } from "@/lib/toast-utils";
import { useForgotPasswordMutation } from "@/lib/services/apiSlice";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!email.trim()) {
      showToast.error("Validation Error", "Please enter your email address");
      return;
    }

    if (!isValidEmail(email)) {
      showToast.error("Validation Error", "Please enter a valid email address");
      return;
    }

    try {
      const result = await forgotPassword({ email: email.trim() }).unwrap();
      setEmailSent(true);
      showToast.success("Reset Link Sent", result.message);
    } catch (error: any) {
      if (error?.status === 429) {
        showToast.warning("Rate Limited", error?.data?.message || "Too many password reset attempts from this IP, please try again after 15 minutes");
      } else {
        handleApiError(error, "Failed to send reset email. Please try again.");
      }
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  const handleTryAgain = () => {
    setEmailSent(false);
    setEmail("");
  };

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
            <p className="text-slate-400 text-lg">Sending reset email...</p>
          </div>
        ) : emailSent ? (
          // Success State
          <Card className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 shadow-2xl rounded-xl">
            <CardHeader className="text-center pb-8 pt-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-emerald-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-gradient-secondary mb-3">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-lg text-slate-400">
                We've sent password reset instructions to your email
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pb-8">
              {/* Success Message */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3 text-emerald-400 font-medium">
                  <Shield className="w-5 h-5" />
                  <span>Reset link sent successfully</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  If an account with <span className="text-white font-medium">{email}</span> exists, 
                  we've sent a password reset link to your inbox.
                </p>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>The reset link will expire in 1 hour</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">What to do next:</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">1.</span>
                    <span>Check your email inbox for a message from ForgeAPI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">2.</span>
                    <span>Click the "Reset Password" button in the email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">3.</span>
                    <span>Create your new password and sign in</span>
                  </li>
                </ul>
              </div>

              {/* Help Text */}
              <div className="bg-slate-800/50 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  <strong className="text-slate-300">Didn't receive the email?</strong> Check your spam folder, 
                  or make sure you entered the correct email address.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleTryAgain}
                  variant="outline"
                  className="w-full h-12 border-slate-600/60 text-slate-300 hover:bg-slate-800/50 hover:text-white rounded-xl transition-all duration-200"
                >
                  Try Different Email
                </Button>
                
                <Button
                  onClick={handleBackToLogin}
                  className="w-full h-12 btn-primary text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 group"
                >
                  <div className="flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Sign In</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Form State
          <Card className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 shadow-2xl rounded-xl">
            {/* Header */}
            <CardHeader className="text-center pb-8 pt-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-gradient-secondary mb-3">
                Reset Your Password
              </CardTitle>
              <CardDescription className="text-lg text-slate-400">
                Enter your email address and we'll send you a link to reset your password
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pb-8">
              {/* Forgot Password Form */}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-12 bg-slate-800/80 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-blue-500/60 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
                      required
                      autoFocus
                    />
                  </div>
                  <p className="text-sm text-slate-500">
                    We'll send a secure reset link to this email address
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="w-full h-12 btn-primary text-lg font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 group"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <BrandLoader size={20} />
                      <span>Sending Reset Link...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Send Reset Link</span>
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
                      For your security, reset links expire after 1 hour and can only be used once. 
                      If you don't receive an email, check your spam folder.
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