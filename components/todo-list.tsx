import type { Todo } from "@/lib/types";
import TodoItem from "@/components/todo-item";

export default function TodoList({ todos }: { todos: Todo[] }) {
  if (todos.length === 0) {
    return <p className="text-sm text-zinc-400">No todos yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
