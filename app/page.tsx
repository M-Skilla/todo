import { getTodos } from "@/app/actions";
import AddTodoForm from "@/components/add-todo-form";
import TodoList from "@/components/todo-list";
import type { Todo } from "@/lib/types";

export default async function Home() {
  let todos: Todo[] = [];
  let loadError = false;

  try {
    todos = await getTodos();
  } catch {
    loadError = true;
  }

  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-4 py-12 sm:py-20">
      <main className="flex w-full max-w-md flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Tasks
          </h1>
          <p className="text-sm text-muted">
            {loadError
              ? "Your tasks are temporarily unavailable."
              : todos.length === 0
                ? "Nothing on your list yet."
                : remaining === 0
                  ? "All caught up."
                  : `${remaining} of ${todos.length} remaining`}
          </p>
        </header>

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-5">
          {loadError ? (
            <div className="flex flex-col items-center gap-1 py-6 text-center">
              <p className="text-sm font-medium text-danger">
                Couldn&apos;t load your tasks
              </p>
              <p className="text-xs text-muted">
                Something went wrong reaching the server. Try refreshing the
                page.
              </p>
            </div>
          ) : (
            <>
              <AddTodoForm />
              <TodoList todos={todos} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
