"use client";

import { Check, Zap, Crown, Building2, ArrowRight, Star, Sparkles, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started and exploring ForgeAPI capabilities",
      features: [
        "3 Custom API Schemas",
        "1,000 API Requests/month",
        "Basic Data Types (10)",
        "Community Support",
        "Standard Rate Limiting",
        "Basic Analytics"
      ],
      cta: "Get Started Free",
      href: "/signup",
      popular: false,
      icon: Zap,
      gradient: "from-slate-600 to-slate-700",
      bgGradient: "from-slate-900/50 to-slate-800/30",
      textColor: "text-slate-300",
      delay: "0s"
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      originalPrice: "$49",
      description: "Ideal for professional developers and growing teams",
      features: [
        "Unlimited Custom Schemas",
        "Unlimited API Requests",
        "All 30+ Premium Data Types",
        "Priority Email Support",
        "Advanced Analytics & Monitoring",
        "99.9% Uptime SLA",
        "Custom Rate Limiting",
        "Webhook Integration",
        "Team Collaboration (5 users)"
      ],
      cta: "Start Free Trial",
      href: "/payment",
      popular: true,
      icon: Crown,
      gradient: "from-blue-600 to-indigo-600",
      bgGradient: "from-blue-500/10 to-indigo-500/10",
      textColor: "text-blue-400",
      delay: "0.2s"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations with enterprise-grade requirements",
      features: [
        "Everything in Pro Plan",
        "Custom Data Centers & Regions",
        "Dedicated Account Manager",
        "Custom API Integrations",
        "Advanced Security & Compliance",
        "24/7 Priority Phone Support",
        "SLA up to 99.99%",
        "Unlimited Team Members",
        "Custom Feature Development",
        "On-premise Deployment Options"
      ],
      cta: "Contact Sales",
      href: "/contact",
      popular: false,
      icon: Building2,
      gradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      textColor: "text-purple-400",
      delay: "0.4s"
    }
  ];

  return (
    <section className="section-padding bg-professional-dark relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-3/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="content-max-width container-padding relative">
        {/* Enhanced header section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3 text-sm font-medium text-slate-300 mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>Trusted by 10,000+ developers worldwide</span>
          </div>
          
          <h2 className="text-heading text-gradient-secondary mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-subheading max-w-3xl mx-auto">
            Start free and scale seamlessly as your project grows. 
            <br className="hidden md:block" />
            No hidden fees, no vendor lock-in, and no surprises.
          </p>
        </div>

        {/* Enhanced pricing grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative group animate-slide-up ${plan.popular ? 'lg:-mt-8' : ''}`}
              style={{ animationDelay: plan.delay }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 animate-scale-in">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <Card className={`relative h-full transition-all duration-500 hover:scale-105 transform ${
                plan.popular 
                  ? 'card-professional ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/20' 
                  : 'card-professional hover:shadow-xl'
              }`}>
                {/* Plan header */}
                <CardHeader className="text-center pb-8 pt-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${plan.bgGradient} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <plan.icon className={`w-10 h-10 bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`} />
                  </div>
                  
                  <CardTitle className="text-2xl text-white mb-3 group-hover:text-gradient-primary transition-all duration-300">
                    {plan.name}
                  </CardTitle>
                  <p className="text-slate-400 text-sm leading-relaxed px-2">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-8 pb-8">
                  {/* Enhanced pricing display */}
                  <div className="text-center space-y-2">
                    <div className="flex items-baseline justify-center gap-2">
                      {plan.originalPrice && (
                        <span className="text-lg text-slate-500 line-through">{plan.originalPrice}</span>
                      )}
                      <span className={`text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                        {plan.price}
                      </span>
                      {plan.period !== "forever" && plan.period !== "contact us" && (
                        <span className="text-lg text-slate-400">/{plan.period.split(' ')[1]}</span>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      {plan.period === "forever" && (
                        <div className="text-slate-400 text-sm">No credit card required</div>
                      )}
                      {plan.originalPrice && (
                        <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/30">
                          Save 40% - Limited Time
                        </div>
                      )}
                      {plan.period === "contact us" && (
                        <div className="text-slate-400 text-sm">Custom pricing based on scale</div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced features list */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">What's included:</h4>
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3 group">
                          <div className={`w-5 h-5 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-200">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced CTA button */}
                  <div className="pt-4">
                    <Link href={plan.href} className="block">
                      <Button className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 group/btn ${
                        plan.popular 
                          ? 'btn-primary shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30' 
                          : 'btn-secondary hover:scale-105'
                      }`}>
                        <span className="flex items-center justify-center gap-2">
                          {plan.popular && <Crown className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />}
                          {plan.cta}
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced guarantee section */}
        <div className="text-center mb-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl px-8 py-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-left">
              <div className="text-white font-semibold">30-Day Money-Back Guarantee</div>
              <div className="text-emerald-400 text-sm">No questions asked, full refund available</div>
            </div>
          </div>
        </div>

        {/* Enhanced support CTA */}
        <div className="text-center animate-scale-in" style={{ animationDelay: '0.8s' }}>
          <div className="card-professional p-10 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="w-8 h-8 text-blue-400" />
              <h3 className="text-3xl font-bold text-white">Still Have Questions?</h3>
            </div>
            <p className="text-slate-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Our sales engineering team is standing by to help you choose the perfect plan 
              and get the most out of ForgeAPI for your specific use case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="btn-primary text-lg px-8 py-4 rounded-xl group">
                  <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Talk to Sales
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button className="btn-secondary text-lg px-8 py-4 rounded-xl">
                  View Documentation
                </Button>
              </Link>
            </div>
            
            {/* Contact options */}
            <div className="mt-8 pt-8 border-t border-slate-700/50">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span>Live chat available 9AM-6PM PST</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>Average response time: 2 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}