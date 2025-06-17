import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const formRef = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_rx0t6gm", // replace with your actual service ID
        "template_zrnhli2", // replace with your actual template ID
        formRef.current,
        "k68ugbQdRqFPqt4GY" // replace with your public key
      )
      .then(
        () => {
          setIsSent(true);
          formRef.current.reset();
        },
        (error) => {
          console.error("Failed to send:", error.text);
        }
      );
  };

  if (isSent) {
    toast.success("Message sent successfully!");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-16">
      <motion.div
        className="w-full max-w-2xl border-white p-8 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Contact Us
        </h2>
        <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              name="user_name"
              required
              placeholder="Your name"
              className="w-full px-4 py-2 rounded-lg border border-primary"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              name="user_email"
              required
              placeholder="your@email.com"
              className="w-full px-4 py-2 rounded-lg border border-primary"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Message</label>
            <textarea
              name="message"
              rows="4"
              required
              placeholder="Write your message..."
              className="w-full px-4 py-2 rounded-lg border border-primary"
            ></textarea>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-primary hover:bg-green-700 transition-colors py-2 px-4 text-white rounded-lg font-semibold"
          >
            Send Message
          </motion.button>
          {/* {isSent && (
            <p className="text-green-400 mt-2 text-center">
              Message sent successfully!
            </p>
          )} */}
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
