/**
 * Contact Page Component
 *
 * Professional contact form with EmailJS integration.
 * Updated to match email template variables:
 *  - from_name, reply_to, time, subject, message, phone, to_email
 */

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faDribbble,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/StatusBadge";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const socialLinks = [
    {
      icon: faTwitter,
      href: "https://twitter.com/ibwmahin",
      label: "Twitter",
      username: "@ibwmahin",
    },
    {
      icon: faInstagram,
      href: "https://instagram.com/ibwmahin",
      label: "Instagram",
      username: "@ibwmahin",
    },
    {
      icon: faLinkedin,
      href: "https://linkedin.com/in/ibwmahin",
      label: "LinkedIn",
      username: "@ibwmahin",
    },
    {
      icon: faGithub,
      href: "https://github.com/ibwmahin",
      label: "GitHub",
      username: "@ibwmahin",
    },
    {
      icon: faDribbble,
      href: "https://dribbble.com/ibwmahin",
      label: "Dribbble",
      username: "@ibwmahin",
    },
  ];

  // EmailJS keys — you already provided these; kept inline with import.meta.env fallback.
  const serviceId =
    (import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined) ??
    "service_lyhmmox";
  const templateId =
    (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined) ??
    "template_2ag350j";
  const publicKey =
    (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined) ??
    "wG8px5150C96d09F3";

  // Recipient email used by template variable {{to_email}}
  const toEmail = "ibwmahin@gmail.com";

  useEffect(() => {
    if (publicKey) {
      try {
        emailjs.init(publicKey);
      } catch (err) {
        // init might fail in some environments; send() will still accept the key as fallback.
        // console.warn("EmailJS init failed:", err);
      }
    }
  }, [publicKey]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!serviceId || !templateId || !publicKey) {
      toast({
        title: "Configuration Required",
        description:
          "EmailJS service/template/public key missing. Please provide them.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Build template params exactly matching your email template variables
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        time: new Date().toLocaleString(), // runtime time string (you can change timezone if needed)
        subject: formData.subject || "New Contact Form Message",
        message: formData.message,
        phone: formData.phone || "N/A",
        to_email: toEmail,
      };

      // Send email, pass publicKey as fallback if init failed earlier
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });

      setFormData({ name: "", email: "", subject: "", phone: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 mt-5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <motion.div
                className="w-3 h-3 bg-success rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Let's Work Together
              </h1>
            </div>
            <StatusBadge status="AVAILABLE FOR WORK" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Got an idea and need development help? Reach out now and let's
              bring your vision to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Design Inquiry
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and I'll get back to you within 24
                  hours.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                aria-label="Contact form"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-card border-border"
                      aria-label="Your name"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-card border-border"
                      aria-label="Your email"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Subject & Phone (new fields to match your email template) */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject (optional)"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-card border-border"
                      aria-label="Subject"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Input
                      name="phone"
                      placeholder="Phone (optional)"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-card border-border"
                      aria-label="Phone"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="bg-card border-border resize-none"
                    aria-label="Message"
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="w-4 h-4 mr-2"
                      />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info & Social */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                    <span>{toEmail}</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="w-5 h-5"
                    />
                    <span>Bangladesh</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">
                  Follow Me
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FontAwesomeIcon
                        icon={social.icon}
                        className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
                      />
                      <div>
                        <div className="font-medium text-sm text-foreground">
                          {social.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {social.username}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <h4 className="font-semibold text-foreground">
                    Quick Response
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  I typically respond to all inquiries within 24 hours. For
                  urgent projects, feel free to reach out directly via email.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

