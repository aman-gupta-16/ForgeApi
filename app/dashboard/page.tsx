"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Plus, Trash2, Key, Eye, EyeOff, Sparkles, Zap, BarChart3, Calendar, Activity } from "lucide-react";
import BrandLoader from "@/components/BrandLoader";
import { handleApiError, showToast } from "@/lib/toast-utils";

// ✅ import your RTK Query hooks and types
import {
  useGetApiKeysQuery,
  useGenerateApiKeyMutation,
  useDeleteApiKeyMutation,
  useGetProfileQuery,
} from "@/lib/services/apiSlice";

export interface ApiKey {
  _id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  isActive: boolean;
  isSubscribed: boolean;
  count: number;
}

export default function DashboardPage() {
  const router = useRouter();

  // 🔥 RTK Query hooks
  const { data, isLoading, refetch } = useGetApiKeysQuery("");
  const apiKeys = data?.apiKeys ?? [];
  
  // Get user profile for plan information
  const { data: profileData } = useGetProfileQuery();
  const userPlan = profileData?.user?.plan || 'free';
  const isSubscribed = profileData?.user?.isSubscribed || false;
  
  // Plan limits
  const planLimits = {
    free: { maxKeys: 1, maxRequests: 1000 },
    premium: { maxKeys: 10, maxRequests: 100000 }
  };
  
  const currentLimit = planLimits[userPlan as keyof typeof planLimits] || planLimits.free;
  const isAtKeyLimit = apiKeys.length >= currentLimit.maxKeys;

  const [generateApiKey] = useGenerateApiKeyMutation();
  const [deleteApiKey] = useDeleteApiKeyMutation();

  // Local UI states
  const [generating, setGenerating] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});

  // ✅ Copy key
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast.success("Copied!", "API key copied to clipboard");
    } catch (error) {
      showToast.error("Copy Failed", "Failed to copy to clipboard");
    }
  };

  // ✅ Toggle hide/show key
  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }));
  };

  // ✅ Date format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ✅ Generate key handler
  const generateApiKeyHandler = async () => {
    if (!newKeyName.trim()) {
      showToast.error("Validation Error", "API key name is required");
      return;
    }
    
    try {
      setGenerating(true);
      await generateApiKey({ name: newKeyName.trim() }).unwrap();
      setNewKeyName("");
      showToast.success("Success!", "API key generated successfully");
      refetch();
    } catch (err: any) {
      handleApiError(err, "Failed to generate API key");
    } finally {
      setGenerating(false);
    }
  };

  // ✅ Delete key handler
  const deleteApiKeyHandler = async (id: string) => {
    try {
      setDeleting(id);
      await deleteApiKey(id).unwrap();
      showToast.success("Deleted!", "API key deleted successfully");
      refetch();
    } catch (err: any) {
      handleApiError(err, "Failed to delete API key");
    } finally {
      setDeleting(null);
    }
  };

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 relative overflow-hidden flex items-center justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="text-center relative z-10">
          <BrandLoader size={64} />
          <p className="mt-4 text-slate-400 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      
      <div className="content-max-width container-padding section-padding relative z-10">
        {/* Enhanced Page Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center">
              <Key className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-heading text-gradient-secondary">
              API Keys Dashboard
            </h1>
          </div>
          <p className="text-subheading max-w-3xl mx-auto">
            Manage your API keys and monitor usage for seamless integration with ForgeAPI services
          </p>
        </div>

        {/* Plan Limits Warning */}
        {isAtKeyLimit && userPlan === 'free' && (
          <div className="mb-8 animate-in slide-in-from-top-2 duration-300">
            <Alert className="border-yellow-500/50 bg-yellow-500/10 text-yellow-400">
              <AlertDescription className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  <span>You've reached your free plan limit ({currentLimit.maxKeys} API key{currentLimit.maxKeys > 1 ? 's' : ''})</span>
                </div>
                <Button 
                  size="sm" 
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  onClick={() => router.push('/#pricing')}
                >
                  Upgrade to Pro
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-slate-900/70 backdrop-blur-xl border-slate-700/50 hover:bg-slate-900/80 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Key className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">API Keys</p>
                  <p className="text-2xl font-bold text-white">{apiKeys.length}/{currentLimit.maxKeys}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 backdrop-blur-xl border-slate-700/50 hover:bg-slate-900/80 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Active Keys</p>
                  <p className="text-2xl font-bold text-white">
                    {apiKeys.filter((key: ApiKey) => key.isSubscribed).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/70 backdrop-blur-xl border-slate-700/50 hover:bg-slate-900/80 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Total Usage</p>
                  <p className="text-2xl font-bold text-white">
                    {apiKeys.reduce((sum: number, key: ApiKey) => sum + key.count, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/70 backdrop-blur-xl border-slate-700/50 hover:bg-slate-900/80 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Plan</p>
                  <p className="text-lg font-bold text-white capitalize">
                    {userPlan === 'premium' ? 'Pro' : 'Free'}
                  </p>
                  {userPlan === 'free' && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-xs text-blue-400 hover:text-blue-300 p-0 h-auto"
                      onClick={() => router.push('/#pricing')}
                    >
                      Upgrade →
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Generate New API Key */}
        <Card className="mb-12 bg-slate-900/80 backdrop-blur-xl border-slate-700/60 shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              Generate New API Key
            </CardTitle>
            <CardDescription className="text-lg text-slate-300 leading-relaxed">
              Create a new API key with a descriptive name to organize your integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter API key name (e.g., Production, Development, Testing)"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="h-12 bg-slate-800/80 border-slate-600/60 text-white placeholder:text-slate-400 text-lg focus:border-emerald-500/60 focus:ring-emerald-500/20 transition-all duration-200"
                />
              </div>
              <Button
                onClick={generateApiKeyHandler}
                disabled={generating || !newKeyName.trim() || isAtKeyLimit}
                className={`h-12 px-8 font-semibold text-lg rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isAtKeyLimit 
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white hover:shadow-emerald-500/25'
                }`}
              >
                {generating ? (
                  <div className="flex items-center gap-2">
                    <BrandLoader size={20} />
                    <span>Generating...</span>
                  </div>
                ) : isAtKeyLimit ? (
                  <div className="flex items-center gap-2">
                    <span>Limit Reached ({currentLimit.maxKeys})</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Key</span>
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Custom Schema Button */}
        <div className="mb-12 flex justify-center">
          <Button
            onClick={() => router.push("/dashboard/custom-schemas")}
            className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Create Custom Schema
          </Button>
        </div>

        {/* Enhanced API Keys Section */}
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">Your API Keys</h2>
            <p className="text-slate-400 text-lg">Manage and monitor your active API integrations</p>
          </div>

          {apiKeys.length === 0 ? (
            <Card className="bg-slate-900/70 backdrop-blur-xl border-slate-700/50">
              <CardContent className="pt-12 pb-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Key className="w-10 h-10 text-slate-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-300 mb-2">No API Keys Found</h3>
                  <p className="text-slate-400 mb-6 max-w-md mx-auto">
                    Generate your first API key to start integrating with ForgeAPI services
                  </p>
                  <Button
                    onClick={() => setNewKeyName("Default")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Generate Your First Key
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {apiKeys.map((apiKey: ApiKey) => (
                <Card key={apiKey._id} className="group bg-slate-900/80 backdrop-blur-xl border-slate-700/60 hover:border-slate-600/80 hover:bg-slate-900/90 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                      <div className="flex-1 space-y-4">
                        {/* Header */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                            <Key className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                              {apiKey.name || "Default API Key"}
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                              <Badge
                                variant={apiKey.isSubscribed ? "default" : "secondary"}
                                className={`${
                                  apiKey.isSubscribed
                                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                    : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                                }`}
                              >
                                {apiKey.isSubscribed ? "Active" : "Inactive"}
                              </Badge>
                              <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Calendar className="w-4 h-4" />
                                <span>Created {formatDate(apiKey.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Usage Stats */}
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                            <span className="text-slate-400 text-sm">Total Uses:</span>
                            <span className="text-white font-semibold">{apiKey.count.toLocaleString()}</span>
                          </div>
                          {apiKey.lastUsed && (
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                              <span className="text-slate-400 text-sm">Last Used:</span>
                              <span className="text-white font-semibold">{formatDate(apiKey.lastUsed)}</span>
                            </div>
                          )}
                        </div>

                        {/* API Key Display */}
                        <div className="space-y-3">
                          <label className="text-sm font-medium text-slate-300">API Key</label>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-slate-800/80 rounded-lg px-4 py-3 font-mono text-sm border border-slate-700/60">
                              <span className="text-slate-400">Bearer </span>
                              <span className="text-white">
                                {showKeys[apiKey._id]
                                  ? apiKey.key
                                  : apiKey.key.substring(0, 12) + "..." + apiKey.key.substring(apiKey.key.length - 12)}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleKeyVisibility(apiKey._id)}
                                className="w-10 h-10 p-0 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-lg transition-all duration-200"
                                title={showKeys[apiKey._id] ? "Hide key" : "Show key"}
                              >
                                {showKeys[apiKey._id] ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(apiKey.key)}
                                className="w-10 h-10 p-0 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded-lg transition-all duration-200"
                                title="Copy to clipboard"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-3">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteApiKeyHandler(apiKey._id)}
                          disabled={deleting === apiKey._id}
                          className="w-full lg:w-auto px-6 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border-red-500/30 hover:border-red-500/50 transition-all duration-200"
                        >
                          {deleting === apiKey._id ? (
                            <div className="flex items-center gap-2">
                              <BrandLoader size={16} />
                              <span>Deleting...</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
