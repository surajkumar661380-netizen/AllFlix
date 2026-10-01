/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, AlertCircle, Sparkles, Globe } from 'lucide-react';
import { ContactMessage } from '../types';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Resource Suggestion',
    resourceSuggestionUrl: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<ContactMessage | null>(null);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please type a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newMsg: ContactMessage = {
        id: 'msg-' + Date.now(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        resourceSuggestionUrl: formData.resourceSuggestionUrl,
        message: formData.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setSubmittedMessage(newMsg);
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: 'Resource Suggestion',
        resourceSuggestionUrl: '',
        message: '',
      });
      setErrors({});
    }, 400);
  };

  const handleReset = () => {
    setSubmittedMessage(null);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <Mail className="h-4 w-4 text-amber-500" />
            <span>Connect with AllFlix</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Get in Touch
          </h1>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300 sm:text-base text-balance leading-relaxed">
            Have a legal free movie, book, anime, game, or music website you would love to see featured? 
            Or spotted a broken link? We review all submissions within 24 hours.
          </p>
        </div>

        {/* Content Box */}
        <div className="mt-10 rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xl sm:p-10 dark:border-white/[0.08] dark:bg-[#0E1017]">
          
          {submittedMessage ? (
            <div className="text-center py-6 animate-in fade-in duration-200">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-neutral-900 dark:text-white">
                Message Received!
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-neutral-900 dark:text-white">{submittedMessage.name}</span>.
                We received your inquiry regarding <span className="font-medium text-amber-600 dark:text-amber-400">{submittedMessage.subject}</span>.
                Our editorial team will evaluate your message shortly.
              </p>

              <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-left text-xs dark:border-white/[0.08] dark:bg-[#151824] max-w-md mx-auto">
                <div className="flex justify-between text-neutral-500">
                  <span>Reference ID: {submittedMessage.id}</span>
                  <span>{submittedMessage.timestamp}</span>
                </div>
                <div className="mt-2 font-medium text-neutral-800 dark:text-neutral-200">
                  Reply will be dispatched to: {submittedMessage.email}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleReset}
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:from-amber-400 hover:to-rose-500 transition-all active:scale-95"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400/80 font-mono">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm transition-colors dark:bg-[#151824] dark:text-white ${
                      errors.name
                        ? 'border-rose-500 bg-rose-50/20 focus:border-rose-600'
                        : 'border-neutral-300 bg-white focus:border-amber-500 focus:outline-none dark:border-white/[0.1] dark:focus:border-amber-500/50'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400/80 font-mono">
                    Your Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm transition-colors dark:bg-[#151824] dark:text-white ${
                      errors.email
                        ? 'border-rose-500 bg-rose-50/20 focus:border-rose-600'
                        : 'border-neutral-300 bg-white focus:border-amber-500 focus:outline-none dark:border-white/[0.1] dark:focus:border-amber-500/50'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject Dropdown */}
              <div>
                <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400/80 font-mono">
                  Topic / Subject
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-white/[0.1] dark:bg-[#151824] dark:text-white"
                >
                  <option value="Resource Suggestion">Resource Suggestion (Suggest a new free site)</option>
                  <option value="Report Broken Link">Report Broken Link or Outdated Info</option>
                  <option value="General Inquiry">General Inquiry & Feedback</option>
                  <option value="Partnership / Creator">Content Creator / Partnership Inquiry</option>
                </select>
              </div>

              {/* Resource URL (Conditional if Resource Suggestion or Broken Link) */}
              {(formData.subject === 'Resource Suggestion' || formData.subject === 'Report Broken Link') && (
                <div>
                  <label htmlFor="url" className="block text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400/80 font-mono">
                    Platform Website URL <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                      <Globe className="h-4 w-4" />
                    </div>
                    <input
                      id="url"
                      type="url"
                      value={formData.resourceSuggestionUrl}
                      onChange={(e) => setFormData({ ...formData, resourceSuggestionUrl: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full rounded-xl border border-neutral-300 bg-white py-2.5 pr-3.5 pl-9 text-sm text-neutral-900 focus:border-amber-500 focus:outline-none dark:border-white/[0.1] dark:bg-[#151824] dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* Message Area */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400/80 font-mono">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the entertainment resource, what makes it great, or what question you have..."
                  className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm transition-colors dark:bg-[#151824] dark:text-white ${
                    errors.message
                      ? 'border-rose-500 bg-rose-50/20 focus:border-rose-600'
                      : 'border-neutral-300 bg-white focus:border-amber-500 focus:outline-none dark:border-white/[0.1] dark:focus:border-amber-500/50'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-rose-600 py-3 px-6 text-sm font-bold text-white shadow-lg shadow-amber-500/20 transition-all hover:from-amber-400 hover:to-rose-500 active:scale-[0.99] disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Submit Message'}</span>
                </button>
              </div>

              <p className="text-center text-[11px] text-neutral-400">
                We respect your privacy. Email addresses are strictly used for editorial responses.
              </p>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
