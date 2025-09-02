"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  CreditCard, 
  Shield, 
  Zap, 
  Users, 
  Check, 
  Star, 
  Sparkles, 
  ArrowRight, 
  InfinityIcon // ✅ use the correct Lucide icon
} from "lucide-react";
import { useRouter } from "next/navigation";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "/forever",
    description: "Perfect for getting started and exploring ForgeAPI capabilities",
    popular: false,
    features: [
      "3 Custom API Schemas",
      "1,000 API Requests/month",
      "Basic Data Types (10)",
      "Community Support",
      "Standard Rate Limiting"
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    bgGradient: "from-slate-900/90 to-slate-800/70",
    borderColor: "border-slate-700/60",
    hoverColor: "hover:border-slate-600/70"
  },
  {
    id: "pro",
    name: "Pro", 
    price: "$29",
    period: "/month",
    description: "Ideal for professional developers and growing teams",
    popular: true,
    features: [
      "Unlimited Custom Schemas",
      "Unlimited API Requests", 
      "All 30+ Premium Data Types",
      "Priority Email Support",
      "Advanced Analytics & Monitoring",
      "99.9% Uptime SLA"
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "default" as const,
    bgGradient: "from-indigo-900/90 to-purple-900/70",
    borderColor: "border-indigo-500/50",
    hoverColor: "hover:border-indigo-400/70"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with enterprise-grade requirements", 
    popular: false,
    features: [
      "Everything in Pro Plan",
      "Custom Data Centers & Regions",
      "Dedicated Account Manager",
      "Custom API Integrations",
      "Advanced Security & Compliance",
      "SLA with guaranteed response times"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    bgGradient: "from-purple-900/90 to-pink-900/70",
    borderColor: "border-purple-500/50",
    hoverColor: "hover:border-purple-400/70"
  }
];

export default function PricingPage() {
  const router = useRouter();
  const [annual, setAnnual] = useState(false);

  const features = [
    {
      icon: InfinityIcon,
      title: "Unlimited Schemas",
      description: "Create as many custom API schemas as you need"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-100ms response times worldwide"
    },
    {
      icon: Users,
      title: "Team Collaboration", 
      description: "Invite team members and share schemas"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliance and advanced security"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/6 to-cyan-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="content-max-width container-padding section-padding relative z-10">
        {/* Header */}
        <div className="mb-16 animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-6 text-slate-400 hover:text-white hover:bg-slate-800/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="text-heading text-gradient-secondary">
                Simple, Transparent Pricing
              </h1>
            </div>
            <p className="text-subheading max-w-3xl mx-auto">
              Choose the perfect plan for your needs. Start free and scale as you grow.
              <br className="hidden md:block" />
              <span className="text-emerald-400 font-medium">No hidden fees, cancel anytime.</span>
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-8">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-xl p-1">
              <div className="flex">
                <button
                  onClick={() => setAnnual(false)}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    !annual
                      ? "bg-indigo-500 text-white shadow-lg"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setAnnual(true)}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    annual
                      ? "bg-indigo-500 text-white shadow-lg"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Annual <span className="text-emerald-400 ml-1">(Save 20%)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <Card 
              key={plan.id} 
              className={`group relative bg-gradient-to-br ${plan.bgGradient} backdrop-blur-xl border ${plan.borderColor} ${plan.hoverColor} hover:bg-slate-900/90 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 inline mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 text-lg">{plan.period}</span>
                  {annual && plan.id === "pro" && (
                    <div className="text-sm text-emerald-400 mt-1">
                      $23/month billed annually
                    </div>
                  )}
                </div>
                <p className="text-slate-300 mt-4">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full h-12 font-semibold text-lg rounded-xl transition-all duration-200 ${
                    plan.buttonVariant === "default"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-indigo-500/25"
                      : "bg-slate-800/50 text-slate-200 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 hover:text-white"
                  }`}
                  onClick={() => {
                    if (plan.id === "free") {
                      router.push("/signup");
                    } else if (plan.id === "pro") {
                      router.push("/payment");
                    } else {
                      window.open("mailto:sales@forgeapi.dev");
                    }
                  }}
                >
                  {plan.buttonVariant === "default" && (
                    <Sparkles className="w-5 h-5 mr-2" />
                  )}
                  {plan.buttonText}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose ForgeAPI?</h2>
            <p className="text-slate-400 text-lg">Built for developers, by developers</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-xl p-6 hover:bg-slate-900/90 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-lg">Everything you need to know</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Can I change plans at any time?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                q: "Is there a free trial for Pro plan?",
                a: "Absolutely! We offer a 14-day free trial for the Pro plan with full access to all features."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and Apple Pay through our secure payment processor."
              },
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes, you can cancel your subscription at any time. No questions asked, no cancellation fees."
              }
            ].map((faq, index) => (
              <details key={index} className="group bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-xl">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-900/90 transition-all duration-200">
                  <span className="text-white font-medium">{faq.q}</span>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform duration-200" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-slate-300">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-scale-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Building?
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already building faster with ForgeAPI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => router.push("/signup")}
                className="btn-primary px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Free Today
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/docs")}
                className="btn-secondary px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
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
