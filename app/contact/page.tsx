"use client";

import { useState } from 'react';
import { Mail, Github, Twitter, MapPin, Clock, Phone, Send, MessageSquare, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { showToast } from '@/lib/toast-utils';
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast.success("Message Sent!", "Thanks for your message! We'll get back to you within 24 hours.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      showToast.error("Send Failed", "Sorry, there was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Send us an email and we'll get back to you within 24 hours",
      value: "aman.gupta.work.16@gmail.com",
      href: "mailto:aman.gupta.work.16@gmail.com",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Github,
      title: "GitHub",
      description: "Check out our code, report issues, or contribute",
      value: "aman-gupta-16",
      href: "https://github.com/aman-gupta-16",
      color: "from-gray-500 to-gray-700"
    },
    {
      icon: Twitter,
      title: "Twitter",
      description: "Follow us for updates and quick support",
      value: "@AmanGup52727388",
      href: "https://x.com/AmanGup52727388",
      color: "from-blue-400 to-blue-600"
    }
  ];

  const faqs = [
    {
      question: "How quickly can I get started?",
      answer: "You can create your first API in under 60 seconds. Simply sign up, define your schema, and start making requests immediately."
    },
    {
      question: "Is there a free tier?",
      answer: "Yes! Our free tier includes 1 API key, 1,000 requests per month, and 3 custom schemas. Perfect for getting started."
    },
    {
      question: "Can I upgrade or downgrade anytime?",
      answer: "Absolutely. You can change your plan at any time. Upgrades are immediate, and downgrades take effect at the next billing cycle."
    },
    {
      question: "Do you offer enterprise solutions?",
      answer: "Yes, we offer custom enterprise plans with dedicated support, SLAs, and advanced features. Contact us to discuss your needs."
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

      <div className="relative z-10 section-padding">
        <div className="content-max-width container-padding">
          {/* Hero Section */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3 text-sm font-medium text-slate-300 mb-6">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span>We're here to help</span>
            </div>
            
            <h1 className="text-display text-gradient-secondary mb-6">
              Get in Touch
            </h1>
            <p className="text-subheading max-w-3xl mx-auto">
              Have questions about ForgeAPI? Need help getting started? Or want to share feedback? 
              We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 shadow-2xl animate-slide-up">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <Send className="w-6 h-6 text-blue-400" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Your Name
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="bg-slate-800/90 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="bg-slate-800/90 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Subject
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        required
                        className="bg-slate-800/90 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Message
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your question or feedback..."
                        rows={6}
                        required
                        className="bg-slate-800/90 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 resize-none"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card 
                    key={index}
                    className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 hover:border-slate-600/50 transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                          <p className="text-slate-300 text-sm mb-3">{method.description}</p>
                          <Link 
                            href={method.href}
                            target={method.href.startsWith('http') ? '_blank' : undefined}
                            rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                          >
                            {method.value}
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Quick Info */}
              <Card className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">Response Time</p>
                        <p className="text-slate-300 text-sm">Within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="text-white font-medium">Support</p>
                        <p className="text-slate-300 text-sm">Friendly & knowledgeable</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-heading text-gradient-secondary mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-subheading max-w-2xl mx-auto">
                Quick answers to common questions about ForgeAPI
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card 
                  key={index}
                  className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 hover:border-slate-600/50 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                    <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center animate-scale-in">
            <div className="card-professional p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Join thousands of developers building faster with ForgeAPI. Start your free account today.
              </p>
              <Link href="/signup">
                <Button className="btn-primary text-lg px-8 py-4 rounded-xl group">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Building Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}