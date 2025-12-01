"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Simulate network request
      await new Promise((res) => setTimeout(res, 1500));
      setStatus("success");       // Show "Sended ✔"
      setFormData({ name: "", email: "", message: "" });
      
      // No timeout to reset — it will stay
    } catch {
      setStatus("idle");
      alert("Error sending message");
    }
  };

  return (
    <main>
      <h2
        className="mb-6 text-pg font-extrabold"
        style={{
          borderBottomWidth: "1px",
          borderImage: "linear-gradient(to right, var(--pg-color), transparent) 1",
        }}
      >
        <span className="text-brand">C</span>ontact Form
      </h2>

      <form onSubmit={handleSubmit} className="w-full text-base grid gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border rounded-lg border-zinc-400 bg-transparent p-2 outline-none focus:border-brand"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border rounded-lg border-zinc-400 bg-transparent p-2 outline-none focus:border-brand"
          />
        </div>

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={3}
          className="border rounded-lg border-zinc-400 bg-transparent p-2 outline-none focus:border-brand"
        />

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="relative text-foreground group hover:text-brand font-extrabold px-6 py-2 transition-all duration-500 text-sm w-fit mt-2 flex items-center gap-2"
        >
          {status === "idle" && (
            <>
              SENT MESSAGE
              <span className="ml-2 text-lg group-hover:ml-5 group-hover:text-brand transition-all duration-500">
                ➠
              </span>
            </>
          )}
          {status === "loading" && (
            <div className="flex items-center gap-2">
              Sending...
              <div className="w-5 h-5 border-2 border-t-brand border-zinc-400 rounded-full animate-spin"></div>
            </div>
          )}
          {status === "success" && (
            <div className="flex items-center gap-2 text-brand font-bold">
              Sended <span className="text-xl">✔</span>
            </div>
          )}
        </button>
      </form>
    </main>
  );
}
