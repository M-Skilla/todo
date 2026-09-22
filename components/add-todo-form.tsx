"use client";

import { useRef } from "react";
import { addTodo } from "@/app/actions";

export default function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData: FormData) => {
        await addTodo(formData);
        formRef.current?.reset();
      }}
      className="flex gap-2"
    >
      <input
        type="text"
        name="title"
        placeholder="Add a todo"
        required
        className="flex-1 rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black/30 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-50"
      />
      <button
        type="submit"
        className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        Add
      </button>
    </form>
  );
}
