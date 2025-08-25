"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Plus, Trash2, Key, Eye, EyeOff } from "lucide-react";
import BrandLoader from "@/components/BrandLoader";

interface ApiKey {
  _id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  isActive: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);



  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setMessage({ type: 'success', text: 'API key copied to clipboard!' });
      setTimeout(() => setMessage(null), 2000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to copy to clipboard' });
    }
  };

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-slate-950 flex items-center justify-center">
  //       <BrandLoader size={56} />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">API Keys Dashboard</h1>
          <p className="text-slate-400">Manage your API keys for accessing ForgeAPI services</p>
        </div>

        {message && (
          <Alert className={`mb-6 ${message.type === 'success' ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
            <AlertDescription className={message.type === 'success' ? 'text-green-400' : 'text-red-400'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Generate New API Key */}
        <Card className="mb-8 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Generate New API Key
            </CardTitle>
            <CardDescription className="text-slate-400">
              Create a new API key to access ForgeAPI services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter API key name (e.g., Production, Development)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
              />
              <Button 
                // onClick={generateApiKeyHandler} 
                disabled={generating || !newKeyName.trim()}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {generating ? <BrandLoader size={20} /> : 'Generate Key'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Keys List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Your API Keys</h2>
          
          {apiKeys.length === 0 ? (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <div className="text-center text-slate-400">
                  <Key className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                  <p>No API keys found. Generate your first API key to get started.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            apiKeys.map((apiKey) => (
              <Card key={apiKey._id} className="bg-slate-900 border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{apiKey.name}</h3>
                        <Badge variant={apiKey.isActive ? "default" : "secondary"}>
                          {apiKey.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-sm">Created:</span>
                          <span className="text-white text-sm">{formatDate(apiKey.createdAt)}</span>
                        </div>
                        {apiKey.lastUsed && (
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-sm">Last used:</span>
                            <span className="text-white text-sm">{formatDate(apiKey.lastUsed)}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-800 rounded px-3 py-2 font-mono text-sm">
                          <span className="text-slate-400">API Key: </span>
                          <span className="text-white">
                            {showKeys[apiKey._id] 
                              ? apiKey.key 
                              : apiKey.key.substring(0, 8) + '...' + apiKey.key.substring(apiKey.key.length - 8)
                            }
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleKeyVisibility(apiKey._id)}
                          className="text-slate-400 hover:text-white"
                        >
                          {showKeys[apiKey._id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(apiKey.key)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      // onClick={() => deleteApiKeyHandler(apiKey._id)}
                      disabled={deleting === apiKey._id}
                      className="ml-4"
                    >
                      {deleting === apiKey._id ? <BrandLoader size={16} /> : <Trash2 className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 