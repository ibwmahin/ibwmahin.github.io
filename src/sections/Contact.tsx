import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import SectionTitle from "../components/SectionTitle";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    /* 
    // Message submission logic commented out for future implementation
    console.log(data);
    // Here you would normally send this data to a server
    alert('Message sent successfully!');
    reset();
    */
    // Temporary alert
    // alert('Message submission is currently disabled. Please check back later!');
  };

  return (
    <section id="contact" className="section-container">
      <SectionTitle title="Contact" />

      <p className="text-gray-300 mb-12 max-w-3xl">
        Have a project in mind or want to collaborate? Feel free to reach out!
      </p>
      {/* lg:grid-cols-2 */}
      <div className="grid grid-cols-1 px-5 gap-12">
        {/* Contact form */}
        <motion.div
          className="glass-panel p-8 rounded-xl"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-6 text-white">
            Contact Information
          </h3>

          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <Mail className="text-primary mr-4" size={20} />
              <a
                href="mailto:ibwmahin@email.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                ibwmahin@gmail.com
              </a>
            </div>

            <div className="flex items-center">
              <Phone className="text-primary mr-4" size={20} />
              <span className="text-gray-300">+880 1854 333 256</span>
            </div>

            <div className="flex items-start">
              <MapPin className="text-primary mr-4 mt-1" size={20} />
              <span className="text-gray-300">
                Location: <br />
                Dhanmondi, Dhaka, Bangladesh
              </span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-white">Follow Me</h3>

          <div className="flex space-x-4">
            <a
              target="_blank"
              href="https://github.com/ibwmahin/"
              className="bg-background-dark p-3 rounded-full text-gray-400 hover:text-accent hover:border-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/ibwmahin/"
              className="bg-background-dark p-3 rounded-full text-gray-400 hover:text-accent hover:border-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              target="_blank"
              href="https://x.com/ibwmahin"
              className="bg-background-dark p-3 rounded-full text-gray-400 hover:text-accent hover:border-accent transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </motion.div>

        {/* Form */}
        {/* <motion.div */}
        {/*   initial={{ opacity: 0, x: 20 }} */}
        {/*   whileInView={{ opacity: 1, x: 0 }} */}
        {/*   viewport={{ once: true }} */}
        {/*   transition={{ duration: 0.5 }} */}
        {/* > */}
        {/*   <form onSubmit={handleSubmit(onSubmit)} className="space-y-6"> */}
        {/*     <div> */}
        {/*       <label htmlFor="name" className="block text-gray-300 mb-2"> */}
        {/*         Name */}
        {/*       </label> */}
        {/*       <input */}
        {/*         id="name" */}
        {/*         type="text" */}
        {/*         className="w-full p-3 bg-background-glass backdrop-blur-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white" */}
        {/*         placeholder="Your name" */}
        {/*         {...register("name", { required: "Name is required" })} */}
        {/*       /> */}
        {/*       {errors.name && ( */}
        {/*         <p className="text-red-500 text-sm mt-1">{errors.name.message}</p> */}
        {/*       )} */}
        {/*     </div> */}
        {/**/}
        {/*     <div> */}
        {/*       <label htmlFor="email" className="block text-gray-300 mb-2"> */}
        {/*         Email */}
        {/*       </label> */}
        {/*       <input */}
        {/*         id="email" */}
        {/*         type="email" */}
        {/*         className="w-full p-3 bg-background-glass backdrop-blur-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white" */}
        {/*         placeholder="Your email" */}
        {/*         {...register("email", {  */}
        {/*           required: "Email is required", */}
        {/*           pattern: { */}
        {/*             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, */}
        {/*             message: "Invalid email address" */}
        {/*           } */}
        {/*         })} */}
        {/*       /> */}
        {/*       {errors.email && ( */}
        {/*         <p className="text-red-500 text-sm mt-1">{errors.email.message}</p> */}
        {/*       )} */}
        {/*     </div> */}
        {/**/}
        {/*     <div> */}
        {/*       <label htmlFor="message" className="block text-gray-300 mb-2"> */}
        {/*         Message */}
        {/*       </label> */}
        {/*       <textarea */}
        {/*         id="message" */}
        {/*         rows={5} */}
        {/*         className="w-full p-3 bg-background-glass backdrop-blur-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white resize-none" */}
        {/*         placeholder="Your message" */}
        {/*         {...register("message", { required: "Message is required" })} */}
        {/*       ></textarea> */}
        {/*       {errors.message && ( */}
        {/*         <p className="text-red-500 text-sm mt-1">{errors.message.message}</p> */}
        {/*       )} */}
        {/*     </div> */}
        {/**/}
        {/*     <button */}
        {/*       type="submit" */}
        {/*       className="btn-primary w-full" */}
        {/*     > */}
        {/*       Send Message */}
        {/*     </button> */}
        {/*   </form> */}
        {/* </motion.div> */}
      </div>
    </section>
  );
};

export default Contact;

