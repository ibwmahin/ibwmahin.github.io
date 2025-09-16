"use client";

import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

/* ========== EmailJS cblueentials (restore your originals here) ========== */
const SERVICE_ID = "service_li5izpc";
const TEMPLATE_ID = "template_2ag350j";
const PUBLIC_KEY = "GWvjXulV3i2NZJ5jo";
/* ====================================================================== */

export default function ContactSection() {
  const [form, setForm] = useState({
    from_name: "",
    reply_to: "",
    phone: "",
    message: "",
    subject: "Portfolio Contact",
    to_email: "ibwmahin@gmail.com",
    hp_field: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState<number>(0);
  const formRef = useRef<HTMLFormElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.from_name.trim()) e.from_name = "Please enter your name.";
    if (!form.reply_to.trim() || !isValidEmail(form.reply_to))
      e.reply_to = "Please enter a valid email.";
    if (!form.message.trim() || form.message.trim().length < 8)
      e.message = "Please write a short message (at least 8 chars).";
    if (form.phone.trim() && form.phone.trim().length < 6)
      e.phone = "If provided, please enter a valid phone.";
    if (form.hp_field && form.hp_field.trim().length > 0)
      e.hp_field = "Spam detected.";
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setStatus("");
  };

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  useEffect(() => {
    if (!statusRef.current) return;
    statusRef.current.focus();
  }, [status]);

  const canSubmit =
    !isSending &&
    !cooldown &&
    !!form.from_name.trim() &&
    !!form.reply_to.trim() &&
    isValidEmail(form.reply_to) &&
    !!form.message.trim();

  const resetForm = () =>
    setForm({
      from_name: "",
      reply_to: "",
      phone: "",
      message: "",
      subject: "Portfolio Contact",
      to_email: "ibwmahin@gmail.com",
      hp_field: "",
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setStatus("Please fix the highlighted fields.");
      return;
    }

    if (form.hp_field && form.hp_field.trim().length > 0) {
      setStatus("❌ Spam detected.");
      return;
    }

    setIsSending(true);
    setStatus("⏳ Sending...");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.from_name.trim(),
          reply_to: form.reply_to.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          subject: form.subject,
          to_email: form.to_email,
          time: new Date().toISOString(),
        },
        PUBLIC_KEY,
      );

      setStatus("✅ Message sent — I’ll reply shortly!");
      resetForm();
      setCooldown(10);
    } catch (err: any) {
      console.error("EmailJS send error:", err);
      const text = err?.text || err?.message || "Failed to send message.";
      setStatus(`❌ ${text}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 sm:py-20 text-white">
      {/* Grid with equal-height panels */}
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 items-stretch md:min-h-[420px]">
        {/* left intro panel (keeps same height as form) */}
        <div className="order-2 md:order-1 p-6 md:p-10 rounded-2xl bg-gradient-to-br from-white/3 to-white/6 border border-white/8 backdrop-blur-sm shadow-xl h-full flex flex-col">
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
              Get in touch
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-lg">
              I’d love to hear about your project. Drop a short message below
              and I’ll reply shortly. Prefer a quick chat? Add your phone and
              I’ll call back.
            </p>

            <div className="mt-4 space-y-3">
              <ContactMeta
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 8v10a1 1 0 0 0 1 1h16"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 8V6a5 5 0 0110 0v2"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 12h8"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                label="Location"
                value="Dhaka, Bangladesh"
              />
              <ContactMeta
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M21 8v6a2 2 0 01-2 2H5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 8l9 6 9-6"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                label="Email"
                value="ibwmahin@gmail.com"
              />
              <ContactMeta
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M12 2v6"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 10v10h12V10"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                label="Availability"
                value="Open for projects"
              />
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-400">
            Tip: keep your message short and include your timeline — I typically
            reply within 24–48 hours.
          </div>
        </div>

        {/* form panel (same height) */}
        <div className="order-1 md:order-2 p-6 md:p-10 rounded-2xl bg-black/40 border border-white/6 shadow-lg h-full flex">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col justify-between"
            noValidate
          >
            <div>
              {/* honeypot */}
              <div style={{ display: "none" }}>
                <label htmlFor="hp_field">Leave empty</label>
                <input
                  id="hp_field"
                  name="hp_field"
                  value={form.hp_field}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <FloatingInput
                  id="from_name"
                  name="from_name"
                  type="text"
                  value={form.from_name}
                  onChange={handleChange}
                  label="Your name"
                  error={errors.from_name}
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M12 12a4 4 0 100-8 4 4 0 000 8z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
                <FloatingInput
                  id="reply_to"
                  name="reply_to"
                  type="email"
                  value={form.reply_to}
                  onChange={handleChange}
                  label="Your email"
                  error={errors.reply_to}
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M3 8l9 6 9-6"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 8v8a2 2 0 01-2 2H5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
              </div>

              <div className="mb-4">
                <FloatingInput
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  label="Phone (optional)"
                  error={errors.phone}
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M22 16.92V21a1 1 0 01-1.11 1A19 19 0 013 5.11 1 1 0 014 4h4.09a1 1 0 01.95.68l.8 2.4a1 1 0 01-.24 1l-1.3 1.3a12 12 0 005.7 5.7l1.3-1.3a1 1 0 011-.24l2.4.8a1 1 0 01.68.95z"
                        stroke="currentColor"
                        strokeWidth="1.0"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
              </div>

              <div className="mb-4">
                <FloatingTextarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  label="Your message"
                  error={errors.message}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  aria-disabled={!canSubmit}
                  aria-busy={isSending}
                  className={`inline-flex items-center gap-3 justify-center h-12 px-6 rounded-full font-semibold transition-transform transform
                    ${
                      canSubmit
                        ? "bg-gradient-to-r from-green-500 to-green-400 hover:scale-105 shadow-[0_10px_30px_rgba(67,56,202,0.16)] text-black"
                        : "bg-gray-700 text-gray-300 opacity-60 cursor-not-allowed"
                    }`}
                >
                  {isSending ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray="60"
                          strokeDashoffset="20"
                          fill="none"
                        />
                      </svg>
                      <span> Sending…</span>
                    </>
                  ) : cooldown > 0 ? (
                    <span>Wait {cooldown}s</span>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3 8l9 6 9-6"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 8v8a2 2 0 01-2 2H5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Send message</span>
                    </>
                  )}
                </button>
              </div>

              {status && (
                <div
                  ref={statusRef}
                  tabIndex={-1}
                  role="status"
                  aria-live="polite"
                  className={`text-center text-sm mt-3 ${status.startsWith("✅") ? "text-green-400" : status.startsWith("❌") ? "text-green-400" : "text-gray-300"}`}
                >
                  {status}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small presentational helpers ---------- */

function ContactMeta({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-white/6 shrink-0 text-gray-200">
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-300">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function FloatingInput({
  id,
  name,
  type,
  value,
  onChange,
  label,
  error,
  icon,
}: {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -trangreen-y-1/2 text-gray-400 pointer-events-none">
        {icon}
      </span>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        aria-invalid={!!error}
        aria-describedby={error ? `err-${id}` : undefined}
        className={`peer w-full h-14 pl-12 pr-4 rounded-xl bg-white/5 text-white text-sm sm:text-base placeholder-transparent focus:outline-none transition-shadow shadow-inner
          ${error ? "ring-2 ring-green-400/30" : "focus:ring-2 focus:ring-green-400/30"}`}
      />

      <label
        htmlFor={id}
        className={`absolute left-12 top-3 text-gray-400 text-sm transform transition-all duration-150
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs`}
      >
        {label}
      </label>

      {error && (
        <div id={`err-${id}`} className="mt-1 text-xs text-green-400">
          {error}
        </div>
      )}
    </div>
  );
}

function FloatingTextarea({
  id,
  name,
  value,
  onChange,
  label,
  error,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  error?: string;
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        rows={5}
        aria-invalid={!!error}
        aria-describedby={error ? `err-${id}` : undefined}
        className={`peer w-full rounded-xl bg-white/5 text-white text-sm sm:text-base placeholder-transparent focus:outline-none transition-shadow shadow-inner px-4 py-3 resize-none
          ${error ? "ring-2 ring-green-400/30" : "focus:ring-2 focus:ring-green-400/30"}`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 top-3 text-gray-400 text-sm transform transition-all duration-150
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs`}
      >
        {label}
      </label>

      {error && (
        <div id={`err-${id}`} className="mt-1 text-xs text-green-400">
          {error}
        </div>
      )}
    </div>
  );
}
