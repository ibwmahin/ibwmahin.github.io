"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  // 'success' | 'error' | null
  const [openFaq, setOpenFaq] = useState(-1);

  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const faqRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // EmailJS public key (keep as you had it)
    emailjs.init("GWvjXulV3i2NZJ5jo");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    gsap.to(e.target, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const submitBtn = e.target.querySelector('button[type="submit"]');
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });

    try {
      // Match these keys with the variables used in the HTML template above.
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        // will be used for Reply-To and visible in template
        phone: formData.phone,
        subject: formData.subject || "Portfolio Contact Form",
        message: formData.message,
        time: new Date().toLocaleString(),
        to_email: "ibwmahin@gmail.com",
      };

      console.log("Sending EmailJS templateParams:", templateParams);

      const result = await emailjs.send(
        "service_li5izpc",
        "template_2ag350j",
        templateParams
      );
      console.log("Email sent:", result);

      setSubmitStatus("success");

      gsap.to(submitBtn, {
        backgroundColor: "#10b981",
        duration: 0.3,
        onComplete: () => {
          setTimeout(() => {
            gsap.to(submitBtn, { backgroundColor: "#111827", duration: 0.3 });
            setSubmitStatus(null);
          }, 3000);
        },
      });

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Email send failed:", error);
      setSubmitStatus("error");

      gsap.to(submitBtn, {
        backgroundColor: "#ef4444",
        duration: 0.3,
        onComplete: () => {
          setTimeout(() => {
            gsap.to(submitBtn, { backgroundColor: "#111827", duration: 0.3 });
            setSubmitStatus(null);
          }, 3000);
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputFocus = (e) => {
    gsap.to(e.target, {
      borderColor: "#3b82f6",
      scale: 1.01,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleInputBlur = (e) => {
    gsap.to(e.target, {
      borderColor: "#d1d5db",
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // (FAQ, animation setup retained from your original)
  useEffect(() => {
    if (!titleRef.current) return;

    const titleText = titleRef.current;
    const chars = titleText.textContent.split("");
    titleText.innerHTML = chars
      .map(
        (char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`
      )
      .join("");

    gsap.fromTo(
      titleRef.current.querySelectorAll(".char"),
      { opacity: 0, y: 50, rotationX: -90 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      faqRef.current?.children,
      { opacity: 0, x: -50, rotationY: -15 },
      {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      formRef.current?.children,
      { opacity: 0, x: 50, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFaqToggle = (index) => {
    const isOpening = openFaq !== index;
    setOpenFaq(isOpening ? index : -1);

    const faqItem = faqRef.current?.children[index];
    const answer = faqItem?.querySelector(".faq-answer");
    const icon = faqItem?.querySelector(".faq-icon");

    if (isOpening && answer) {
      gsap.set(answer, { height: "auto", display: "block" });
      const autoHeight = answer.offsetHeight;
      gsap.set(answer, { height: 0, opacity: 0 });

      gsap.to(answer, {
        height: autoHeight,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(icon, { rotation: 45, duration: 0.3, ease: "power2.out" });
    } else if (answer) {
      gsap.to(answer, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(answer, { display: "none" }),
      });
      gsap.to(icon, { rotation: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  const faqs = [
    {
      question: "What web development services do you offer?",
      answer:
        "I offer responsive web development using HTML, CSS, Tailwind,JavaScript, React, and WordPress. I also provide UI/UX design in Figma, video editing for social media, and graphic design for branding.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary. A simple landing page takes 1-2 weeks, a full redesign or custom app can take 4-8 weeks. I'll provide a timeline after discussing requirements.",
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer:
        "Yes — I offer maintenance and support packages and can train you to manage basic content updates.",
    },
  ];

  return (
    <section
      ref={contactRef}
      id="contact"
      className="my-20 py-20 relative overflow-hidden"
      data-text="05"
    >
      <div
        className="absolute top-20 left-10 w-36 h-36 bg-gradient-to-br
       from-purple-100 to-pink-100 rounded-full opacity-20 parallax-bg"
      ></div>
      <div
        className="absolute bottom-10 right-10 w-28 h-28 bg-gradient-to-br
       from-blue-100 to-teal-100 rounded-full opacity-30 parallax-bg"
      ></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-20 fade-in">
          <span
            className="text-gray-500 text-sm 
          font-medium tracking-wider uppercase"
          >
            Personal Info
          </span>
          <h2
            ref={titleRef}
            className="text-6xl md:text-7xl font-bold text-gray-900 leading-none mb-8"
          >
            Contact Me
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project
            and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 fade-in">
              Frequently Asked Questions
            </h3>
            <div ref={faqRef} className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 group">
                  <button
                    className="w-full text-left py-4 flex justify-between items-center
                    focus:outline-none hover:bg-gray-50 px-4 rounded-lg transition-colors duration-200"
                    onClick={() => handleFaqToggle(index)}
                  >
                    <span
                      className="text-gray-900 font-medium
                     group-hover:text-blue-600 transition-colors duration-200"
                    >
                      {faq.question}
                    </span>
                    <span
                      className="faq-icon text-gray-500 text-xl
                     font-bold transition-transform duration-300"
                    >
                      {openFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`faq-answer overflow-hidden ${
                      openFaq === index ? "block" : "hidden"
                    }`}
                    style={{ height: openFaq === index ? "auto" : "0" }}
                  >
                    <div className="pb-4 px-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-8 fade-in">
                Feel free to send me a message or any word of appreciation.
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 border border-gray-300 
                    focus:outline-none transition-all duration-300 rounded-lg
                    hover:shadow-md"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="Your Email Address"
                    className="w-full px-4 py-3 border border-gray-300 
                    focus:outline-none transition-all duration-300 rounded-lg 
                    hover:shadow-md"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="Phone (optional)"
                    className="w-full px-4 py-3 border border-gray-300 
                    focus:outline-none transition-all duration-300 rounded-lg 
                    hover:shadow-md"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="Subject (Optional)"
                    className="w-full px-4 py-3 border border-gray-300 
                    focus:outline-none transition-all duration-300 rounded-lg
                    hover:shadow-md"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="Your Message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 
                    focus:outline-none transition-all duration-300 resize-none rounded-lg 
                    hover:shadow-md"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="magnetic w-full bg-gray-900 hover:bg-gray-800 
                  text-white py-4 font-medium transition-all duration-300 rounded-lg 
                  hover:shadow-xl transform hover:scale-105 disabled:opacity-70 
                  disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Sending..."
                    : submitStatus === "success"
                    ? "Message Sent!"
                    : submitStatus === "error"
                    ? "Failed to Send"
                    : "Submit"}
                </button>

                {submitStatus === "success" && (
                  <p className="text-green-600 text-sm text-center">
                    Thank you! Your message has been sent successfully.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-600 text-sm text-center">
                    Sorry, there was an error sending your message. Please try
                    again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
