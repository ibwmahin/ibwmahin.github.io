"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    phone: "",
    message: "",
    subject: "Portfolio Contact",
    to_email: "ibwmahin@gmail.com",
    time: new Date().toLocaleString(),
  });
  const [formStatus, setFormStatus] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // client validation
    if (!formData.from_name.trim()) {
      setFormStatus("Please enter your name.");
      return;
    }
    if (!formData.reply_to.trim() || !isValidEmail(formData.reply_to)) {
      setFormStatus("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setFormStatus("Please write a short message.");
      return;
    }

    setFormStatus("⏳ Sending...");
    setIsSending(true);

    try {
      await emailjs.send(
        "service_li5izpc", // your service id
        "template_2ag350j", // your template id
        {
          from_name: formData.from_name,
          reply_to: formData.reply_to,
          message: formData.message,
          phone: formData.phone,
          subject: formData.subject,
          to_email: formData.to_email,
          time: new Date().toLocaleString(),
        },
        "GWvjXulV3i2NZJ5jo", // your public key
      );

      setFormStatus("✅ Message sent successfully — I’ll reply soon!");
      setFormData({
        from_name: "",
        reply_to: "",
        phone: "",
        message: "",
        subject: "Portfolio Contact",
        to_email: "ibwmahin@gmail.com",
        time: new Date().toLocaleString(),
      });

      // focus name after success
      setTimeout(() => {
        formRef.current
          ?.querySelector<HTMLInputElement>('input[name="from_name"]')
          ?.focus();
      }, 50);
    } catch (err: any) {
      const msg = err?.text || err?.message || "Unknown error";
      setFormStatus(`❌ Failed to send: ${msg}`);
    } finally {
      setIsSending(false);
    }
  };

  const canSubmit =
    !isSending &&
    !!formData.from_name.trim() &&
    !!formData.reply_to.trim() &&
    isValidEmail(formData.reply_to) &&
    !!formData.message.trim();

  return (
    <motion.section
      id="contact"
      className="py-16 px-4 sm:py-20 bg-black text-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-white">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            I’d love to hear from you! Fill out the form below and I’ll get back
            to you shortly.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              name="from_name"
              placeholder="Your name"
              value={formData.from_name}
              onChange={handleInputChange}
              required
              className="flex-1 h-10 bg-slate-900 border border-white/6 rounded-md px-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
            <input
              type="email"
              name="reply_to"
              placeholder="Your email"
              value={formData.reply_to}
              onChange={handleInputChange}
              required
              className="flex-1 h-15 bg-slate-900 border border-white/6 rounded-md px-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
          </motion.div>

          {/* Phone */}
          <input
            name="phone"
            placeholder="Your phone (optional)"
            value={formData.phone}
            onChange={handleInputChange}
            className="h-10 bg-slate-900 border border-white/6 rounded-md px-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 w-full"
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full h-32 bg-slate-900 border border-white/6 rounded-md px-3 py-2 text-sm sm:text-base text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-300"
          />

          {/* Submit */}
          <motion.div
            whileHover={{ scale: canSubmit ? 1.03 : 1 }}
            whileTap={{ scale: canSubmit ? 0.97 : 1 }}
            className="flex justify-center"
          >
            <button
              type="submit"
              disabled={!canSubmit}
              aria-disabled={!canSubmit}
              aria-busy={isSending}
              className={`h-10 px-6 text-sm sm:text-base rounded-full font-semibold transition focus:outline-none ${
                canSubmit
                  ? "bg-cyan-500 text-black hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-300"
                  : "bg-white/6 text-white border-cyan-400 opacity-60 cursor-not-allowed"
              }`}
            >
              {isSending ? "Sending…" : "Submit"}
              <span className="ml-3" aria-hidden>
                ✉️
              </span>
            </button>
          </motion.div>

          {/* Status */}
          {formStatus && (
            <p
              role="status"
              aria-live="polite"
              className={`text-center text-sm ${
                formStatus.startsWith("✅")
                  ? "text-cyan-300"
                  : formStatus.startsWith("❌")
                    ? "text-rose-400"
                    : "text-gray-400"
              }`}
            >
              {formStatus}
            </p>
          )}
        </form>
      </div>
    </motion.section>
  );
}
