"use client";
import { useState } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${query}`);
    // এখানে তুমি API call বা search logic যোগ করতে পারো
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center w-full border border-zinc-500 rounded-lg overflow-hidden focus-within:border-brand transition-all"
    >
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="flex-1 p-2 text-zinc-200 bg-transparent outline-none placeholder-zinc-500"
      />
      <button
        type="submit"
        className=" px-4 py-2 text-xl text-foreground font-semibold hover:text-brand transition-colors duration-500"
      >
        🔍︎
      </button>
    </form>
  );
}
