"use client";

import { Check, Zap, Crown, Building2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started and small projects",
      features: [
        "3 Custom API Schemas",
        "1,000 API Requests/month",
        "Basic Data Types",
        "Community Support"
      ],
      cta: "Get Started Free",
      href: "/signup",
      popular: false,
      icon: Zap
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Ideal for developers and small teams",
      features: [
        "Unlimited Custom Schemas",
        "Unlimited API Requests",
        "All 30+ Data Types",
        "Priority Support",
        "Advanced Analytics",
        "99.9% Uptime SLA"
      ],
      cta: "Start Free Trial",
      href: "/payment",
      popular: true,
      icon: Crown
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations with custom requirements",
      features: [
        "Everything in Pro",
        "Custom Data Centers",
        "Dedicated Support",
        "Custom Integrations",
        "Advanced Security",
        "24/7 Phone Support"
      ],
      cta: "Contact Sales",
      href: "/contact",
      popular: false,
      icon: Building2
    }
  ];

  return (
    <section className="py-24 px-4 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Simple Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* Simple Pricing Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-slate-900 border-slate-700 hover:border-slate-600 transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                
                <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                <p className="text-slate-400 text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Simple Pricing */}
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period !== "forever" && (
                      <span className="text-lg text-slate-400">/{plan.period}</span>
                    )}
                  </div>
                  {plan.period === "forever" && (
                    <span className="text-slate-400 text-sm">No credit card required</span>
                  )}
                </div>

                {/* Simple Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Simple CTA Button */}
                <Link href={plan.href} className="block">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600'
                    } transition-all duration-300 rounded-lg py-3`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-slate-300 mb-6">
              Our team is here to help you choose the right plan
            </p>
            <Link href="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                Contact Sales Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}