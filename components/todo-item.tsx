"use client";

import { useState, useTransition } from "react";
import { toggleTodo, deleteTodo } from "@/app/actions";
import type { Todo } from "@/lib/types";

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = () => {
    setError(null);
    startTransition(async () => {
      try {
        await toggleTodo(todo.id);
      } catch {
        setError("Couldn't update this task.");
      }
    });
  };

  const handleDelete = () => {
    setError(null);
    setIsDeleting(true);
    startTransition(async () => {
      try {
        await deleteTodo(todo.id);
      } catch {
        setError("Couldn't delete this task.");
        setIsDeleting(false);
      }
    });
  };

  return (
    <li
      className={`flex flex-col gap-1 rounded-lg border border-border px-3 py-2.5 transition-opacity ${
        isPending ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={isPending}
          className="h-4 w-4 shrink-0 accent-accent"
        />
        <span
          className={`flex-1 text-sm ${
            todo.completed ? "text-muted line-through" : "text-foreground"
          }`}
        >
          {todo.title}
        </span>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          aria-label="Delete task"
          className="shrink-0 rounded-md p-1 text-muted transition-colors hover:bg-danger/10 hover:text-danger disabled:opacity-50"
        >
          {isDeleting ? (
            <svg
              className="h-4 w-4 animate-spin"
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
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.5h-2.25a.75.75 0 000 1.5h.3l.815 10.185A2.75 2.75 0 007.6 18.5h4.8a2.75 2.75 0 002.735-2.565L15.95 5.75h.3a.75.75 0 000-1.5H14v-.5A2.75 2.75 0 0011.25 1h-2.5zM7.5 3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25v.5h-5v-.5zM6.573 6.001l.741 9.259a1.25 1.25 0 001.246 1.24h4.8a1.25 1.25 0 001.246-1.24l.741-9.259H6.573z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
      {error && <p className="animate-fade-in text-xs text-danger">{error}</p>}
    </li>
  );
}
