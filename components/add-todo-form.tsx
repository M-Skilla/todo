"use client";

import { useRef, useState, useTransition } from "react";
import { addTodo } from "@/app/actions";

export default function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  return (
    <form
      ref={formRef}
      action={(formData: FormData) => {
        const title = (formData.get("title") as string)?.trim();
        if (!title) return;

        setError(null);
        setJustAdded(false);

        startTransition(async () => {
          try {
            await addTodo(formData);
            formRef.current?.reset();
            setJustAdded(true);
            setTimeout(() => setJustAdded(false), 2000);
          } catch {
            setError("Couldn't add that task. Try again.");
          }
        });
      }}
      className="flex flex-col gap-2"
    >
      <div className="flex gap-2">
        <input
          type="text"
          name="title"
          placeholder="Add a task"
          required
          disabled={isPending}
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-w-20 items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <svg
              className="h-4 w-4 animate-spin text-white"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            "Add"
          )}
        </button>
      </div>

      {error && (
        <p className="animate-fade-in text-xs text-danger">{error}</p>
      )}
      {justAdded && !error && (
        <p className="animate-fade-in text-xs text-success">Task added.</p>
      )}
    </form>
  );
}
