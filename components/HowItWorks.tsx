"use client";

import { FileCode, Zap, Code, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HowItWorks() {
  const steps = [
    {
      icon: FileCode,
      step: "1",
      title: "Define Your Schema",
      description: "Create your data structure using our intuitive schema builder.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Zap,
      step: "2", 
      title: "Generate API Endpoint",
      description: "Instantly get a live API endpoint with your custom data structure.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Code,
      step: "3",
      title: "Start Building",
      description: "Make requests immediately with full CRUD support.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-24 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Simple Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Get from idea to working API in under 60 seconds. No complex setup.
          </p>
        </div>

        {/* Simple Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-10 h-10 text-white" />
              </div>
              
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                {step.step}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center">
          <Link href="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}