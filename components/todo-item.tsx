"use client";

import { useTransition } from "react";
import { toggleTodo, deleteTodo } from "@/app/actions";
import type { Todo } from "@/lib/types";

export default function TodoItem({ todo }: { todo: Todo }) {
  const [, startTransition] = useTransition();

  return (
    <li className="flex items-center gap-3 rounded-md border border-black/10 px-3 py-2 dark:border-white/15">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => startTransition(() => toggleTodo(todo.id))}
        className="h-4 w-4"
      />
      <span
        className={`flex-1 text-sm ${
          todo.completed
            ? "text-zinc-400 line-through"
            : "text-black dark:text-zinc-50"
        }`}
      >
        {todo.title}
      </span>
      <button
        type="button"
        onClick={() => startTransition(() => deleteTodo(todo.id))}
        className="text-xs text-zinc-400 hover:text-red-500"
        aria-label="Delete todo"
      >
        Delete
      </button>
    </li>
  );
}
