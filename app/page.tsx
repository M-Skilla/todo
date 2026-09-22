import { getTodos } from "@/app/actions";
import AddTodoForm from "@/components/add-todo-form";
import TodoList from "@/components/todo-list";

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <main className="flex w-full max-w-md flex-col gap-6">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
          Todo
        </h1>
        <AddTodoForm />
        <TodoList todos={todos} />
      </main>
    </div>
  );
}
