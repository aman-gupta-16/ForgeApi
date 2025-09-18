"use client";

import { useState } from "react";
import {
  useCreateApiSchemaMutation,
  useDeleteSchemaMutation,
  useGettAllCreatedSchemaQuery,
} from "@/lib/services/apiSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, Check, Copy, Code, Database, Link, ArrowLeft, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { handleApiError, showToast } from "@/lib/toast-utils";

const availableTypes = [
  "uuid",
  "id",
  "email",
  "username",
  "name",
  "firstName",
  "lastName",
  "phone",
  "number",
  "float",
  "price",
  "productName",
  "productDescription",
  "category",
  "image",
  "avatar",
  "address",
  "city",
  "country",
  "zip",
  "boolean",
  "date",
  "timestamp",
  "paragraph",
  "sentence",
  "slug",
  "url",
  "ip",
  "mac",
  "color",
];

export default function CreateApiSchemaPage() {
  const router = useRouter();
  const [createApiSchema, { isLoading }] = useCreateApiSchemaMutation();
  const {
    data: schemas,
    isLoading: loadingSchemas,
    refetch,
  } = useGettAllCreatedSchemaQuery("");
  const [deleteSchema, { isLoading: deleting }] = useDeleteSchemaMutation();

  const [apiPath, setApiPath] = useState("");
  const [fields, setFields] = useState([{ name: "", type: "string" }]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleFieldChange = (index: number, key: string, value: string) => {
    const updated = [...fields];
    // @ts-ignore
    updated[index][key] = value;
    setFields(updated);
  };

  const addField = () => {
    setFields([...fields, { name: "", type: "string" }]);
  };

  const removeField = (index: number) => {
    if (fields.length > 1) {
      setFields(fields.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    if (!apiPath.trim()) {
      showToast.error("Validation Error", "Please enter an API path");
      return;
    }

    if (fields.some(f => !f.name.trim())) {
      showToast.error("Validation Error", "Please fill in all field names");
      return;
    }

    const responseSchema: Record<string, string> = {};
    fields.forEach((f) => {
      if (f.name && f.type) responseSchema[f.name] = f.type;
    });

    const formData = { responseSchema, apiPath };

    try {
      await createApiSchema(formData).unwrap();
      setApiPath("");
      setFields([{ name: "", type: "string" }]);
      showToast.success("Schema Created", "API schema created successfully!");
      refetch();
    } catch (err: any) {
      handleApiError(err, "Failed to create API schema");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSchema(id).unwrap();
      showToast.success("Schema Deleted", "Schema deleted successfully!");
      refetch();
    } catch (err: any) {
      handleApiError(err, "Failed to delete schema");
    }
  };

  const handleCopy = async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      showToast.success("Copied!", "URL copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      showToast.error("Copy Failed", "Failed to copy to clipboard");
      console.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/6 to-blue-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.8s' }} />
      </div>
      
      <div className="content-max-width container-padding section-padding relative z-10">
        {/* Enhanced Page Header */}
        <div className="mb-16 animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="mb-6 text-slate-400 hover:text-white hover:bg-slate-800/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                <Code className="w-8 h-8 text-indigo-400" />
              </div>
              <h1 className="text-heading text-gradient-secondary">
                API Schema Builder
              </h1>
            </div>
            <p className="text-subheading max-w-3xl mx-auto">
              Create custom API endpoints with your own data structure. 
              <br className="hidden md:block" />
              Design schemas that match your exact needs.
            </p>
          </div>
        </div>

        {/* Enhanced Create Schema Form */}
        <Card className="mb-16 bg-slate-900/80 backdrop-blur-xl border-slate-700/60 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 animate-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                <Plus className="w-5 h-5 text-indigo-400" />
              </div>
              Create New API Schema
            </CardTitle>
            <CardDescription className="text-lg text-slate-300 leading-relaxed">
              Define your API endpoint path and response structure with custom fields
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* API Path Input */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-300">
                API Endpoint Path
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 text-sm">/api/</span>
                </div>
                <Input
                  placeholder="users, products, orders"
                  value={apiPath}
                  onChange={(e) => setApiPath(e.target.value)}
                  className="pl-16 h-12 bg-slate-800/80 border-slate-600/60 text-white placeholder:text-slate-400 text-lg focus:border-indigo-500/60 focus:ring-indigo-500/20 transition-all duration-200"
                />
              </div>
              <p className="text-sm text-slate-500">
                This will create an endpoint at: <code className="bg-slate-800 px-2 py-1 rounded text-emerald-400">/api/{apiPath || "your-path"}</code>
              </p>
            </div>

            {/* Schema Fields */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-300">
                  Response Schema Fields
                </label>
                <Button
                  onClick={addField}
                  variant="outline"
                  size="sm"
                  className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-500"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Field
                </Button>
              </div>
              
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={index} className="flex gap-3 items-center p-4 bg-slate-800/60 backdrop-blur-sm rounded-lg border border-slate-700/60 hover:bg-slate-800/80 transition-all duration-200">
                    <div className="flex-1">
                      <Input
                        placeholder="Field name (e.g., name, email, age)"
                        value={field.name}
                        onChange={(e) =>
                          handleFieldChange(index, "name", e.target.value)
                        }
                        className="bg-slate-700/80 border-slate-600/60 text-white placeholder:text-slate-400 focus:border-indigo-500/60 focus:ring-indigo-500/20 transition-all duration-200"
                      />
                    </div>
                    <Select
                      value={field.type}
                      onValueChange={(val) =>
                        handleFieldChange(index, "type", val)
                      }
                    >
                      <SelectTrigger className="w-[200px] bg-slate-700/80 border-slate-600/60 text-white focus:border-indigo-500/60 focus:ring-indigo-500/20">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 text-white border-slate-700">
                        {availableTypes.map((t) => (
                          <SelectItem key={t} value={t} className="hover:bg-slate-700">
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fields.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeField(index)}
                        className="w-10 h-10 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                        title="Remove field"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={isLoading || !apiPath.trim() || fields.some(f => !f.name.trim())}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Schema...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Create API Schema</span>
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Existing Schemas */}
        <div className="space-y-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-heading text-white mb-3">Your API Schemas</h2>
            <p className="text-slate-400 text-lg">Manage and test your created endpoints</p>
          </div>

          {loadingSchemas ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-16 h-16 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-400 text-lg">Loading your schemas...</p>
            </div>
          ) : !schemas?.userApis || schemas.userApis.length === 0 ? (
            <Card className="bg-slate-900/70 backdrop-blur-xl border-slate-700/50 animate-slide-up">
              <CardContent className="pt-16 pb-16 text-center">
                <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Database className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-300 mb-2">No Schemas Created Yet</h3>
                <p className="text-slate-400 mb-6 max-w-md mx-auto">
                  Start building your first API schema above to create custom endpoints
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {schemas.userApis.map((schema: any, index: number) => {
                const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/dynamicApi/serveFakeApi/{YOUR_TOKEN_HERE}${schema.apiPath}/{count}`;
                return (
                  <Card key={schema._id} className="group bg-slate-900/80 backdrop-blur-xl border-slate-700/60 hover:border-slate-600/50 hover:bg-slate-900/90 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                              <Code className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-white group-hover:text-gradient-primary transition-all duration-300">
                                /api{schema.apiPath}
                              </h3>
                              <p className="text-slate-400 text-sm">
                                {Object.keys(schema.responseSchema).length} fields defined
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(schema._id)}
                            disabled={deleting === schema._id}
                            className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200"
                          >
                            {deleting === schema._id ? (
                              <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>

                        {/* Fields Display */}
                        <div className="space-y-3">
                          <label className="text-sm font-medium text-slate-300">Schema Fields</label>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(schema.responseSchema).map(([key, value]) => (
                              <div key={key} className="bg-slate-800/60 rounded-xl px-3 py-2 border border-slate-700/50 hover:border-slate-600/50 transition-colors duration-200">
                                <span className="text-emerald-400 font-mono text-sm">{key}</span>
                                <span className="text-slate-400 text-sm mx-2">:</span>
                                <span className="text-blue-400 font-mono text-sm">{value as string}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* API URL Section */}
                        <div className="space-y-3">
                          <label className="text-sm font-medium text-slate-300">API Endpoint URL</label>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 bg-slate-800/80 rounded-xl px-4 py-3 font-mono text-sm border border-slate-700/60">
                                <span className="text-slate-400">GET </span>
                                <span className="text-white break-all">{url}</span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCopy(schema._id, url)}
                                className="btn-secondary min-w-[100px]"
                              >
                                {copiedId === schema._id ? (
                                  <span className="flex items-center gap-2 text-emerald-500">
                                    <Check className="w-4 h-4" />
                                    Copied!
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-2">
                                    <Copy className="w-4 h-4" />
                                    Copy
                                  </span>
                                )}
                              </Button>
                            </div>
                            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50">
                              <div className="flex items-start gap-2">
                                <Link className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-slate-300">
                                  <p className="mb-2"><strong>Usage Instructions:</strong></p>
                                  <ul className="space-y-1 text-slate-400">
                                    <li>• Replace <code className="bg-slate-700 px-1 py-0.5 rounded text-emerald-400">{`{YOUR_TOKEN_HERE}`}</code> with your API key</li>
                                    <li>• Replace <code className="bg-slate-700 px-1 py-0.5 rounded text-emerald-400">{`{count}`}</code> with the number of records you want</li>
                                    <li>• Example: <code className="bg-slate-700 px-1 py-0.5 rounded text-blue-400">/api/dynamicApi/serveFakeApi/abc123{schema.apiPath}/10</code></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
