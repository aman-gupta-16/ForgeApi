"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Shield, Zap, Infinity, Users, CheckCircle, Star, Sparkles, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function PaymentsPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

      // Call your backend endpoint to create checkout session
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.post(
        `${baseUrl}/api/payment/create-checkout-session`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      if (res.data && res.data.url) {
        // Redirect user to LemonSqueezy checkout
        window.location.href = res.data.url;
      } else {
        alert("Failed to create checkout session.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while starting checkout.");
    } finally {
      setLoading(false);
    }
  };

  const premiumFeatures = [
    {
      icon: Infinity,
      title: "Unlimited Schemas",
      description: "Create as many custom API schemas as you need",
      color: "from-emerald-500/20 to-emerald-600/20"
    },
    {
      icon: Zap,
      title: "Unlimited API Requests",
      description: "No more rate limits or usage restrictions",
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Invite team members and share schemas",
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      icon: Shield,
      title: "Priority Support",
      description: "Get help when you need it most",
      color: "from-orange-500/20 to-orange-600/20"
    },
    {
      icon: Star,
      title: "Advanced Analytics",
      description: "Detailed insights into your API usage",
      color: "from-pink-500/20 to-pink-600/20"
    },
    {
      icon: CheckCircle,
      title: "Production Ready",
      description: "Use in production with 99.9% uptime SLA",
      color: "from-cyan-500/20 to-cyan-600/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/3 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/3 to-cyan-500/3 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Enhanced Header */}
        <div className="mb-12">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-6 text-slate-400 hover:text-white hover:bg-slate-800/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Upgrade to Premium
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Unlock the full potential of ForgeAPI with unlimited schemas, requests, and premium features. 
              <span className="text-emerald-400 font-medium"> Start building without limits.</span>
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Payment Card */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-slate-700/60 backdrop-blur-sm shadow-2xl hover:shadow-3xl hover:shadow-slate-900/50 transition-all duration-500">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl text-white flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  Premium Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Pricing Section */}
                <div className="text-center p-8 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl border border-emerald-500/20">
                  <div className="mb-4">
                    <span className="text-6xl font-bold text-white">$29</span>
                    <span className="text-2xl text-slate-400 ml-2">/month</span>
                  </div>
                  <p className="text-slate-300 text-lg">
                    Cancel anytime • 14-day free trial
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Most Popular Choice</span>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="group p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600/80 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Checkout Button */}
                <div className="space-y-4">
                  <Button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="group w-full h-14 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold text-lg rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Redirecting to Checkout...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Start 14-Day Free Trial</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-slate-400 text-sm">
                      Secure checkout powered by LemonSqueezy
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Security & Trust */}
            <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-slate-700/60 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-400" />
                  Secure & Trusted
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>GDPR compliant</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>24/7 monitoring</span>
                </div>
              </CardContent>
            </Card>

            {/* Money Back Guarantee */}
            <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-slate-700/60 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Money Back Guarantee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Not satisfied? Get a full refund within 30 days. No questions asked.
                </p>
              </CardContent>
            </Card>

            {/* Comparison */}
            <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-slate-700/60 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  Free vs Premium
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Schemas</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300">3</span>
                    <span className="text-emerald-400">→</span>
                    <span className="text-emerald-400 font-semibold">∞</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">API Requests</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300">1K/month</span>
                    <span className="text-emerald-400">→</span>
                    <span className="text-emerald-400 font-semibold">∞</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Support</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300">Community</span>
                    <span className="text-emerald-400">→</span>
                    <span className="text-emerald-400 font-semibold">Priority</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-slate-700/60 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                  Frequently Asked
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <details className="group">
                  <summary className="text-slate-300 text-sm cursor-pointer hover:text-white transition-colors duration-200">
                    Can I cancel anytime?
                  </summary>
                  <p className="text-slate-400 text-sm mt-2 pl-4">
                    Yes! You can cancel your subscription at any time. No long-term contracts.
                  </p>
                </details>
                <details className="group">
                  <summary className="text-slate-300 text-sm cursor-pointer hover:text-white transition-colors duration-200">
                    Is there a free trial?
                  </summary>
                  <p className="text-slate-400 text-sm mt-2 pl-4">
                    Absolutely! Start with a 14-day free trial. No credit card required.
                  </p>
                </details>
                <details className="group">
                  <summary className="text-slate-300 text-sm cursor-pointer hover:text-white transition-colors duration-200">
                    What payment methods do you accept?
                  </summary>
                  <p className="text-slate-400 text-sm mt-2 pl-4">
                    We accept all major credit cards, PayPal, and Apple Pay.
                  </p>
                </details>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 border border-slate-700/60 rounded-3xl p-12 backdrop-blur-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Without Limits?
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already building faster with ForgeAPI Premium
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/docs")}
                className="group border-2 border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-slate-500 px-8 py-4 text-lg font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
