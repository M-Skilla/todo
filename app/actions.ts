"use server";

import type { Todo } from "@/lib/types";
import { AmanaDBClient, type RecordsPage } from '@amanadb/sdk';

const db = new AmanaDBClient({
  baseUrl: 'http://localhost:3001',
  apiKey: 'amdb_client_24e8f363abb5fd96cacfbd1ff93f1ba910be05e0f1d2184c',
});

export async function getTodos(): Promise<Todo[]> {
  const data = await db.listRecords('todo')
  console.log(data)
  return data.records.map(record => ({...record.data as Todo }))
}

export async function addTodo(formData: FormData): Promise<void> {
  const id = Math.random().toString()
  const todo: Todo = { id, title: formData.get('title') as string, completed: false }
  await db.putRecord('todo', id, todo)
}

export async function toggleTodo(id: string): Promise<void> {
  const todo = await db.getRecord<Todo>("todo", id)
  await db.putRecord('todo', id, { ...todo.data, completed: !todo.data.completed })
}

export async function deleteTodo(id: string): Promise<void> {
  await db.deleteRecord('todo', id)
}
