"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));

    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSubmitting(false);
  };

  const inputClass = cn(
    "w-full rounded-xl px-4 py-3 text-sm",
    "bg-white/5 dark:bg-white/5 border border-white/10",
    "placeholder:text-[#0A0A0A]/40 dark:placeholder:text-[#FAFAFA]/40",
    "focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/30",
    "transition-all duration-200",
    "hover:bg-white/10 hover:border-white/20"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 mb-1.5">
            Name <span className="text-blue-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 mb-1.5">
            Email <span className="text-blue-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-semibold text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 mb-1.5">
          Subject <span className="text-blue-500">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={form.subject}
          onChange={handleChange}
          placeholder="Research collaboration / Speaking / Other"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-[#0A0A0A]/60 dark:text-[#FAFAFA]/60 mb-1.5">
          Message <span className="text-blue-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          className={cn(inputClass, "resize-none leading-relaxed")}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl",
          "bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold text-sm",
          "shadow-lg hover:shadow-blue-500/30 transition-all duration-300",
          "disabled:opacity-70 disabled:cursor-not-allowed",
          !submitting && "hover:scale-[1.02]"
        )}
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>

      <p className="text-[10px] text-center text-[#0A0A0A]/40 dark:text-[#FAFAFA]/40">
        I typically respond within 24–48 hours.
      </p>
    </form>
  );
}
