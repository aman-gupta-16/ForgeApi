"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy, Key, Code, Database, BookOpen, ArrowLeft, ExternalLink, Terminal, AlertCircle, Info, Zap } from "lucide-react";
import { useState } from "react";

export default function DocsPage() {
  const [copied, setCopied] = useState(false);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const exampleUrl = `${baseUrl}/api/dynamicApi/serveFakeApi/{YOUR_TOKEN_HERE}/users/{count}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exampleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard");
    }
  };

  const dataTypes = [
    { name: "uuid", category: "Identifiers", description: "Universally unique identifier" },
    { name: "id", category: "Identifiers", description: "Sequential numeric identifier" },
    { name: "email", category: "Contact", description: "Valid email address" },
    { name: "username", category: "Contact", description: "Unique username string" },
    { name: "name", category: "Personal", description: "Full name" },
    { name: "firstName", category: "Personal", description: "First name only" },
    { name: "lastName", category: "Personal", description: "Last name only" },
    { name: "phone", category: "Contact", description: "Phone number" },
    { name: "number", category: "Numeric", description: "Integer number" },
    { name: "float", category: "Numeric", description: "Decimal number" },
    { name: "price", category: "Numeric", description: "Currency amount" },
    { name: "productName", category: "Product", description: "Product name" },
    { name: "productDescription", category: "Product", description: "Product description" },
    { name: "category", category: "Product", description: "Product category" },
    { name: "image", category: "Media", description: "Image URL" },
    { name: "avatar", category: "Media", description: "Avatar image URL" },
    { name: "address", category: "Location", description: "Street address" },
    { name: "city", category: "Location", description: "City name" },
    { name: "country", category: "Location", description: "Country name" },
    { name: "zip", category: "Location", description: "Postal code" },
    { name: "boolean", category: "Logic", description: "True/false value" },
    { name: "date", category: "Time", description: "Date string" },
    { name: "timestamp", category: "Time", description: "Unix timestamp" },
    { name: "paragraph", category: "Text", description: "Lorem ipsum paragraph" },
    { name: "sentence", category: "Text", description: "Single sentence" },
    { name: "slug", category: "Text", description: "URL-friendly string" },
    { name: "url", category: "Web", description: "Valid URL" },
    { name: "ip", category: "Web", description: "IP address" },
    { name: "mac", category: "Web", description: "MAC address" },
    { name: "color", category: "Web", description: "Hex color code" },
  ];

  const categories = Array.from(new Set(dataTypes.map(dt => dt.category)));

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">ForgeAPI</h1>
                <p className="text-sm text-gray-400">Documentation</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0">
            <nav className="sticky top-24 space-y-1">
              <div className="pb-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Getting Started</h3>
                <ul className="mt-2 space-y-1">
                  <li><a href="#authentication" className="block py-2 px-3 text-sm text-blue-400 bg-blue-950/50 rounded-md">Authentication</a></li>
                  <li><a href="#quick-start" className="block py-2 px-3 text-sm text-gray-300 hover:bg-gray-800 rounded-md">Quick Start</a></li>
                </ul>
              </div>
              
              <div className="pb-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wide">API Reference</h3>
                <ul className="mt-2 space-y-1">
                  <li><a href="#schemas" className="block py-2 px-3 text-sm text-gray-300 hover:bg-gray-800 rounded-md">Creating Schemas</a></li>
                  <li><a href="#endpoints" className="block py-2 px-3 text-sm text-gray-300 hover:bg-gray-800 rounded-md">Endpoints</a></li>
                  <li><a href="#data-types" className="block py-2 px-3 text-sm text-gray-300 hover:bg-gray-800 rounded-md">Data Types</a></li>
                </ul>
              </div>

              <div className="pb-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Examples</h3>
                <ul className="mt-2 space-y-1">
                  <li><a href="#examples" className="block py-2 px-3 text-sm text-gray-300 hover:bg-gray-800 rounded-md">Sample Requests</a></li>
                  <li><a href="#responses" className="block py-2 px-3 text-sm text-gray-300 hover:bg-gray-800 rounded-md">Response Format</a></li>
                </ul>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            {/* Introduction */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">ForgeAPI Documentation</h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                ForgeAPI allows you to create and serve fake APIs for development, testing, and prototyping. 
                Generate realistic data instantly with customizable schemas.
              </p>
            </div>

            {/* Authentication Section */}
            <section id="authentication" className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Key className="w-6 h-6 text-blue-500" />
                Authentication
              </h2>
              
              <div className="prose max-w-none mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  All API requests require authentication using an API key. You can find your API key in the 
                  <strong className="text-white"> API Keys</strong> section of your dashboard.
                </p>
                
                <div className="bg-blue-950/50 border border-blue-800/50 rounded-lg p-4 mb-6">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-blue-100 font-medium mb-1">API Key Usage</p>
                      <p className="text-blue-200 text-sm">
                        Include your API key as a path parameter in all requests. Never expose your API key in client-side code.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-4">Request Format</h3>
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                  <code className="text-sm text-gray-300 font-mono">
                    GET /api/dynamicApi/serveFakeApi/&#123;API_KEY&#125;/&#123;ENDPOINT&#125;/&#123;COUNT&#125;
                  </code>
                </div>

                <div className="mt-4">
                  <h4 className="text-base font-medium text-white mb-2">Parameters</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-900/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Parameter</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-white">API_KEY</td>
                          <td className="px-4 py-3 text-sm text-gray-400">string</td>
                          <td className="px-4 py-3 text-sm text-gray-300">Your unique API key</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-white">ENDPOINT</td>
                          <td className="px-4 py-3 text-sm text-gray-400">string</td>
                          <td className="px-4 py-3 text-sm text-gray-300">The schema endpoint name</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-white">COUNT</td>
                          <td className="px-4 py-3 text-sm text-gray-400">integer</td>
                          <td className="px-4 py-3 text-sm text-gray-300">Number of records to return (1-100)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-4 mt-8">Example Request</h3>
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">HTTP REQUEST</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleCopy}
                      className="text-xs h-7 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      {copied ? (
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Copied
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Copy className="w-3 h-3" />
                          Copy
                        </div>
                      )}
                    </Button>
                  </div>
                  <code className="text-sm text-green-400 font-mono">
                    GET {exampleUrl}
                  </code>
                </div>
              </div>
            </section>

            {/* Creating Schemas Section */}
            <section id="schemas" className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Database className="w-6 h-6 text-blue-500" />
                Creating Schemas
              </h2>
              
              <div className="prose max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  Schemas define the structure of your API responses. Use the Schema Builder to create custom endpoints 
                  with specific data types and field configurations.
                </p>

                <h3 className="text-lg font-semibold text-white mb-4">Schema Components</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="border border-gray-700 bg-gray-900/50 rounded-lg p-6">
                    <h4 className="font-medium text-white mb-2">Endpoint Name</h4>
                    <p className="text-sm text-gray-300">
                      Define the URL path for your API endpoint (e.g., "users", "products", "orders")
                    </p>
                  </div>
                  <div className="border border-gray-700 bg-gray-900/50 rounded-lg p-6">
                    <h4 className="font-medium text-white mb-2">Response Fields</h4>
                    <p className="text-sm text-gray-300">
                      Add fields with specific data types to customize the structure of returned data
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-950/50 border border-yellow-800/50 rounded-lg p-4 mb-6">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-yellow-100 font-medium mb-1">Schema Limitations</p>
                      <p className="text-yellow-200 text-sm">
                        Each schema can contain up to 50 fields. Field names must be alphanumeric and cannot contain spaces.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Types Section */}
            <section id="data-types" className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Code className="w-6 h-6 text-blue-500" />
                Available Data Types
              </h2>
              
              <div className="space-y-8">
                {categories.map((category) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-white mb-4">{category}</h3>
                    <div className="grid gap-4">
                      {dataTypes
                        .filter(dt => dt.category === category)
                        .map((dt) => (
                          <div key={dt.name} className="border border-gray-700 bg-gray-900/30 rounded-lg p-4 hover:border-gray-600 transition-colors">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-mono text-sm font-medium text-white">{dt.name}</h4>
                                <p className="text-sm text-gray-300 mt-1">{dt.description}</p>
                              </div>
                              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-800 text-gray-300">
                                {dt.category}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Example Section */}
            <section id="examples" className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Terminal className="w-6 h-6 text-blue-500" />
                Example Response
              </h2>
              
              <div className="prose max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  Here's an example of what a response looks like for a "users" schema with common fields:
                </p>

                <h3 className="text-lg font-semibold text-white mb-4">Sample Response</h3>
                <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">JSON RESPONSE</span>
                    <span className="text-xs text-green-400">200 OK</span>
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
{`[
  {
    "id": "e3f42f5a-3c2f-4b91-bc9a-4f21caa33c9d",
    "email": "john.doe@example.com",
    "username": "johndoe_user",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1-555-0123",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    "address": "123 Main St, Suite 100",
    "city": "New York",
    "country": "United States",
    "zip": "10001"
  },
  {
    "id": "f8d21c7b-9e4f-4a82-bd6c-8f31dbb44e8f",
    "email": "jane.smith@example.com",
    "username": "janesmith_pro",
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "+1-555-0456",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    "address": "456 Oak Ave, Floor 2",
    "city": "Los Angeles",
    "country": "United States",
    "zip": "90210"
  }
]`}
                  </pre>
                </div>

                <div className="bg-green-950/50 border border-green-800/50 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Zap className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-green-100 font-medium mb-1">Pro Tip</p>
                      <p className="text-green-200 text-sm">
                        Use tools like Postman, Insomnia, or curl to test your APIs. Data is generated in real-time based on your schema configuration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-800 pt-8 mt-16">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Need help? <a href="#" className="text-blue-400 hover:text-blue-300">Contact support</a>
                </p>
                <div className="flex gap-4 text-sm text-gray-400">
                  <a href="#" className="hover:text-gray-300">API Status</a>
                  <a href="#" className="hover:text-gray-300">Changelog</a>
                  <a href="#" className="hover:text-gray-300">GitHub</a>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}