"use client";

import { Database, Key, BarChart3, Code2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Features() {
  const features = [
    {
      icon: Database,
      title: "Custom Schema Input",
      description: "Define your data structure with JSON schema. Support for complex nested objects, arrays, and custom data types.",
      code: `{
  "name": "string",
  "age": "number",
  "skills": ["array"]
}`
    },
    {
      icon: Key,
      title: "API Key Authentication",
      description: "Secure your mock APIs with authentication keys. Control access and monitor usage across different environments.",
      code: `curl -H "Authorization: Bearer sk_test_..." 
     https://api.mockly.dev/users`
    },
    {
      icon: BarChart3,
      title: "Usage Limits & Premium Access",
      description: "Free tier for development, premium plans for production. Real-time analytics and usage monitoring included.",
      code: `{
  "requests": 1247,
  "limit": 100000,
  "reset": "2024-01-01"
}`
    }
  ];

  return (
    <section id="features" className="py-24 px-4 bg-slate-900 mt-2">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Mock APIs</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Powerful features designed for modern development workflows
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600/30 transition-colors">
                  <feature.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6">{feature.description}</p>
                
                {/* Code example */}
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 className="w-4 h-4 text-slate-500" />
                    <span className="text-xs text-slate-500 uppercase tracking-wide">Example</span>
                  </div>
                  <pre className="text-sm text-slate-300 overflow-x-auto">
                    <code>{feature.code}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}