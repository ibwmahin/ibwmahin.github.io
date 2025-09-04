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

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Glowing shadow animation
  const glowVariants = {
    glow: {
      boxShadow: [
        "0 0 15px rgba(129, 140, 248, 0.3)",
        "0 0 25px rgba(129, 140, 248, 0.6)",
        "0 0 15px rgba(129, 140, 248, 0.3)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      id="contact"
      className="py-16 px-4 sm:py-20 text-white"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      <motion.div
        className="max-w-6xl mx-auto p-10 rounded-lg"
        variants={glowVariants}
        animate="glow"
      >
        <motion.div variants={childVariants} className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 bg-gradient-to-r from-sky-400 to-sky-500 text-transparent bg-clip-text">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            I’d love to hear from you! Fill out the form below and I’ll get back
            to you shortly.
          </p>
        </motion.div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email */}
          <motion.div
            variants={childVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Name with floating label */}
            <div className="relative flex-1">
              <input
                id="from_name"
                name="from_name"
                type="text"
                value={formData.from_name}
                onChange={handleInputChange}
                required
                className="peer w-full h-12 bg-transparent border-b-2 border-gray-500 text-white text-sm sm:text-base focus:border-sky-400 focus:outline-none transition-colors px-0"
                placeholder=" "
              />
              <label
                htmlFor="from_name"
                className="absolute left-0 top-3 text-gray-400 text-sm transform transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-0 peer-focus:text-sky-400 peer-focus:text-xs"
              >
                Your name
              </label>
            </div>

            {/* Email with floating label */}
            <div className="relative flex-1">
              <input
                id="reply_to"
                name="reply_to"
                type="email"
                value={formData.reply_to}
                onChange={handleInputChange}
                required
                className="peer w-full h-12 bg-transparent border-b-2 border-gray-500 text-white text-sm sm:text-base focus:border-sky-400 focus:outline-none transition-colors px-0"
                placeholder=" "
              />
              <label
                htmlFor="reply_to"
                className="absolute left-0 top-3 text-gray-400 text-sm transform transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-0 peer-focus:text-sky-400 peer-focus:text-xs"
              >
                Your email
              </label>
            </div>
          </motion.div>

          {/* Phone with floating label */}
          <motion.div variants={childVariants} className="relative">
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className="peer w-full h-12 bg-transparent border-b-2 border-gray-500 text-white text-sm sm:text-base focus:border-sky-400 focus:outline-none transition-colors px-0"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="absolute left-0 top-3 text-gray-400 text-sm transform transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-0 peer-focus:text-sky-400 peer-focus:text-xs"
            >
              Your phone (optional)
            </label>
          </motion.div>

          {/* Message with floating label */}
          <motion.div variants={childVariants} className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="peer w-full h-32 bg-transparent border-b-2 border-gray-500 text-white text-sm sm:text-base focus:border-sky-400 focus:outline-none transition-colors px-0 py-2 resize-none"
              placeholder=" "
            />
            <label
              htmlFor="message"
              className="absolute left-0 top-3 text-gray-400 text-sm transform transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-0 peer-focus:text-sky-400 peer-focus:text-xs"
            >
              Your message
            </label>
          </motion.div>

          {/* Submit */}
          <motion.div
            variants={childVariants}
            whileHover={{ scale: canSubmit ? 1.05 : 1 }}
            whileTap={{ scale: canSubmit ? 0.95 : 1 }}
            className="flex justify-center"
          >
            <button
              type="submit"
              disabled={!canSubmit}
              aria-disabled={!canSubmit}
              aria-busy={isSending}
              className={`h-12 px-8 text-sm sm:text-base rounded-full font-semibold transition focus:outline-none shadow-md ${
                canSubmit
                  ? "bg-gradient-to-r from-sky-500 to-purple-600 text-white hover:from-sky-600 hover:to-purple-700 focus:ring-2 focus:ring-sky-300"
                  : "bg-gray-700 text-gray-400 opacity-60 cursor-not-allowed"
              }`}
            >
              {isSending ? "Sending…" : "Submit"}
              <span className="ml-2" aria-hidden>
                ✉️
              </span>
            </button>
          </motion.div>

          {/* Status */}
          {formStatus && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="status"
              aria-live="polite"
              className={`text-center text-sm mt-4 ${
                formStatus.startsWith("✅")
                  ? "text-green-400"
                  : formStatus.startsWith("❌")
                    ? "text-red-400"
                    : "text-gray-400"
              }`}
            >
              {formStatus}
            </motion.p>
          )}
        </form>
      </motion.div>
    </motion.section>
  );
}
