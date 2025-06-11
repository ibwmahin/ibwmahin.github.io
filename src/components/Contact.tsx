import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send, Github, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Ready to start your next project? Let's discuss how we can bring
              your ideas to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-12">
            {/* Contact Info */}
            <div className="animate-fade-in-left">
              <div className="bg-card-gradient rounded-2xl p-8 border border-border">
                <h3 className="text-2xl font-bold mb-6 text-foreground">
                  Let's Start a Conversation
                </h3>
                <p className="text-foreground/70 mb-8 leading-relaxed">
                  I'm always excited to work on new projects and collaborate
                  with amazing people. Whether you have a specific project in
                  mind or just want to explore possibilities, I'd love to hear
                  from you.
                </p>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Email</h4>
                      <p className="text-foreground/70">
                        abdulla.almahin@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Location
                      </h4>
                      <p className="text-foreground/70">Dhaka, Bangladesh</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-4">
                    Follow Me
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors group"
                      >
                        <social.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            {/* <div className="animate-fade-in-right"> */}
            {/*   <div className="bg-card-gradient rounded-2xl p-8 border border-border"> */}
            {/*     <form onSubmit={handleSubmit} className="space-y-6"> */}
            {/*       <div> */}
            {/*         <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2"> */}
            {/*           Full Name */}
            {/*         </label> */}
            {/*         <Input */}
            {/*           id="name" */}
            {/*           name="name" */}
            {/*           type="text" */}
            {/*           required */}
            {/*           value={formData.name} */}
            {/*           onChange={handleChange} */}
            {/*           className="bg-background border-border focus:border-primary" */}
            {/*           placeholder="Your full name" */}
            {/*         /> */}
            {/*       </div> */}
            {/**/}
            {/*       <div> */}
            {/*         <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2"> */}
            {/*           Email Address */}
            {/*         </label> */}
            {/*         <Input */}
            {/*           id="email" */}
            {/*           name="email" */}
            {/*           type="email" */}
            {/*           required */}
            {/*           value={formData.email} */}
            {/*           onChange={handleChange} */}
            {/*           className="bg-background border-border focus:border-primary" */}
            {/*           placeholder="your.email@example.com" */}
            {/*         /> */}
            {/*       </div> */}
            {/**/}
            {/*       <div> */}
            {/*         <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2"> */}
            {/*           Message */}
            {/*         </label> */}
            {/*         <Textarea */}
            {/*           id="message" */}
            {/*           name="message" */}
            {/*           required */}
            {/*           value={formData.message} */}
            {/*           onChange={handleChange} */}
            {/*           rows={6} */}
            {/*           className="bg-background border-border focus:border-primary resize-none" */}
            {/*           placeholder="Tell me about your project or ask any questions..." */}
            {/*         /> */}
            {/*       </div> */}
            {/**/}
            {/*       <Button  */}
            {/*         type="submit"  */}
            {/*         disabled={isSubmitting} */}
            {/*         className="w-full bg-button-gradient hover:scale-105 transition-all duration-300 glow-primary text-lg py-3" */}
            {/*       > */}
            {/*         {isSubmitting ? ( */}
            {/*           <> */}
            {/*             <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin mr-2"></div> */}
            {/*             Sending... */}
            {/*           </> */}
            {/*         ) : ( */}
            {/*           <> */}
            {/*             Send Message */}
            {/*             <Send className="ml-2 h-5 w-5" /> */}
            {/*           </> */}
            {/*         )} */}
            {/*       </Button> */}
            {/*     </form> */}
            {/*   </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
