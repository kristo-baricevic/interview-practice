import React, { useCallback, useEffect, useState } from "react";

type Todo = { id: string; text: string; done: boolean };

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem("todos_v1");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem("todos_v1", JSON.stringify(todos));
}

export function TodoList() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(() => loadTodos());

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = useCallback(() => {
    const t = text.trim();
    if (!t) return;
    setTodos((prev) => [
      { id: crypto.randomUUID(), text: t, done: false },
      ...prev,
    ]);
    setText("");
  }, [text]);

  const toggleTodo = React.useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((x: { id: string; done: any }) =>
        x.id === id ? { ...x, done: !x.done } : x
      )
    );
  }, []);

  const deleteTodo = React.useCallback((id: string) => {
    setTodos((prev) => prev.filter((x: { id: string }) => x.id !== id));
  }, []);

  return (
    <div style={{ maxWidth: 520, marginTop: 24 }}>
      <h3>Todo List</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a todo..."
          style={{ flex: 1, padding: 8 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul style={{ marginTop: 12 }}>
        {todos.map((t: { id: number }) => (
          <TodoRow
            key={t.id}
            todo={t}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

const TodoRow = React.memo(function TodoRow({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 0",
      }}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{ textDecoration: todo.done ? "line-through" : "none", flex: 1 }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});
