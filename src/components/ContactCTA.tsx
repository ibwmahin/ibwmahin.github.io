"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

  const [formStatus, setFormStatus] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("⏳ Sending...");

    emailjs
      .send(
        "service_li5izpc", // ✅ Your Service ID
        "template_2ag350j", // ✅ Your Template ID
        {
          from_name: formData.from_name,
          reply_to: formData.reply_to,
          message: formData.message,
          phone: formData.phone,
          subject: formData.subject,
          to_email: formData.to_email,
          time: formData.time,
        },
        "GWvjXulV3i2NZJ5jo", // ✅ Your Public Key
      )
      .then(() => {
        setFormStatus("✅ Message sent successfully!");
        setFormData({
          from_name: "",
          reply_to: "",
          phone: "",
          message: "",
          subject: "Portfolio Contact",
          to_email: "ibwmahin@gmail.com",
          time: new Date().toLocaleString(),
        });
      })
      .catch((error) => {
        setFormStatus(`❌ Failed to send: ${error.text || error.message}`);
      });
  };

  return (
    <motion.section
      id="contact"
      className="py-16 px-4 sm:py-20 bg-gray-50"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-[#6b6b6b]">
            I’d love to hear from you! Fill out the form below.
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
            <Input
              name="from_name"
              placeholder="Your Name"
              value={formData.from_name}
              onChange={handleInputChange}
              required
              className="flex-1 h-10 bg-white border border-[#e5e5e5] rounded text-sm sm:text-base"
            />
            <Input
              type="email"
              name="reply_to"
              placeholder="Your Email"
              value={formData.reply_to}
              onChange={handleInputChange}
              required
              className="flex-1 h-10 bg-white border border-[#e5e5e5] rounded text-sm sm:text-base"
            />
          </motion.div>

          {/* Phone */}
          <Input
            name="phone"
            placeholder="Your Phone (optional)"
            value={formData.phone}
            onChange={handleInputChange}
            className="h-10 bg-white border border-[#e5e5e5] rounded text-sm sm:text-base"
          />

          {/* Message */}
          <Textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            required
            className="h-32 bg-white border border-[#e5e5e5] rounded text-sm sm:text-base resize-none"
          />

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
          >
            <Button
              type="submit"
              className="h-10 px-6 bg-[#1a1a1a] text-white rounded-full text-sm sm:text-base hover:bg-[#2a2a2a]"
            >
              Submit <i className="fa-solid fa-paper-plane ml-2"></i>
            </Button>
          </motion.div>

          {/* Status Message */}
          {formStatus && (
            <p className="text-center text-sm text-[#6b6b6b]">{formStatus}</p>
          )}
        </form>
      </div>
    </motion.section>
  );
}

