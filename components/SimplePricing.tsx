"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Crown, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { showToast, handleApiError } from "@/lib/toast-utils";

export default function SimplePricing() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    const accessToken = localStorage.getItem("accessToken");
    
    if (!accessToken) {
      showToast.warning("Authentication Required", "Please log in to upgrade your plan.");
      router.push("/login");
      return;
    }
    
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fogeapi-backend.onrender.com/";
      
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
        window.location.href = res.data.url;
      } else {
        showToast.error("Payment Error", "Failed to create checkout session.");
      }
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 401) {
        showToast.error("Session Expired", "Your session has expired. Please log in again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/login");
      } else {
        handleApiError(err, "Something went wrong while starting checkout.");
      }
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "1 API Key",
        "1,000 API Requests/month",
        "3 Custom API Schemas",
        "Basic Data Types",
        "Community Support"
      ],
      cta: "Start Free",
      action: () => router.push("/signup"),
      popular: false,
      icon: Zap
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "For serious developers",
      features: [
        "10 API Keys",
        "100,000 API Requests/month",
        "Unlimited Custom Schemas",
        "All Premium Data Types",
        "Priority Support",
        "Advanced Analytics"
      ],
      cta: "Upgrade to Pro",
      action: handlePayment,
      popular: true,
      icon: Crown
    }
  ];

  return (
    <section className="section-padding bg-professional-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="content-max-width container-padding relative">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-heading text-gradient-secondary mb-6">
            Simple Pricing
          </h2>
          <p className="text-subheading max-w-2xl mx-auto">
            Start free and upgrade when you're ready. No hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.name}
                className={`relative h-full transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'bg-slate-900/90 backdrop-blur-xl border border-blue-500/50 ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30' 
                    : 'bg-slate-900/90 backdrop-blur-xl border border-blue-500/30 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 hover:border-blue-500/50'
                } animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                    <Icon className="w-8 h-8 text-blue-200" />
                  </div>
                  <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 text-lg ml-2">{plan.period}</span>
                  </div>
                  <p className="text-slate-300">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <Button
                    onClick={plan.action}
                    disabled={loading && plan.name === "Pro"}
                    className={`w-full h-12 font-semibold text-lg rounded-xl transition-all duration-300 group ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25"
                        : "bg-slate-800/50 text-slate-200 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 hover:text-white"
                    }`}
                  >
                    {loading && plan.name === "Pro" ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{plan.cta}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}