import type { Todo } from "@/lib/types";
import TodoItem from "@/components/todo-item";

export default function TodoList({ todos }: { todos: Todo[] }) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-1 py-6 text-center">
        <p className="text-sm font-medium text-foreground">No tasks yet</p>
        <p className="text-xs text-muted">Add your first task above.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
