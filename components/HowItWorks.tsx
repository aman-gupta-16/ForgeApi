"use client";

import { FileCode, Zap, Code } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: FileCode,
      step: "01",
      title: "Define Schema",
      description: "Create your data structure using our intuitive JSON schema builder or import existing schemas.",
      code: `{
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "email": {"type": "string"}
  }
}`
    },
    {
      icon: Zap,
      step: "02", 
      title: "Generate API",
      description: "Instantly get a live API endpoint with your custom data structure and authentication configured.",
      code: `POST /api/generate
{
  "schema": {...},
  "name": "users-api"
}

→ https://api.forgeapi.dev/users`
    },
    {
      icon: Code,
      step: "03",
      title: "Use in Frontend",
      description: "Start making requests immediately. Perfect for prototyping, testing, and frontend development.",
      code: `fetch('https://api.forgeapi.dev/users')
  .then(res => res.json())
  .then(data => console.log(data))`
    }
  ];

  return (
<section id="how-it-works" className="py-24 px-4 bg-slate-950">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        How It Works
      </h2>
      <p className="text-xl text-slate-400 max-w-2xl mx-auto">
        Get from idea to working API in under 60 seconds
      </p>
    </div>

    <div className="grid lg:grid-cols-3 gap-8 relative">
      {steps.map((step, index) => (
        <div key={index} className="relative flex justify-center">
          {/* Connection line */}
          {index < steps.length - 1 && (
            <div className="hidden lg:block absolute top-16 left-1/2 w-full max-w-[50%] h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 transform translate-x-full z-0" />
          )}

          <div className="relative z-10 text-center max-w-xs w-full">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-3xl" />
              <div className="absolute inset-1 bg-slate-900 rounded-3xl flex items-center justify-center">
                <step.icon className="w-12 h-12 text-emerald-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {step.step}
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
            <p className="text-slate-400 leading-relaxed mb-6">{step.description}</p>

            {/* Code example */}
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 text-left">
              <pre className="text-xs text-slate-300 overflow-x-auto">
                <code>{step.code}</code>
              </pre>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}