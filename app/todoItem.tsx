"use client";

import { useRouter } from "next/navigation";

type todo = {
    id: number;
    text: string;
    completed: boolean;
}

type props = {
    todo: todo;
    setTodolist: (todolist: todo[]) => void;
    todolist: todo[];
}

function TodoItem({ todo, setTodolist, todolist }: props) {
    const router = useRouter();
    const handleChange = (id: number) => {
        setTodolist(todolist.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    }
    const handleDelete = (id: number) => {
        setTodolist(todolist.filter((todo) => todo.id !== id));
    };

    const navigate = (id: number) => {
        router.push(`/todoDetail/${id}`);
    }
    return (
        <div
            className="flex justify-center items-center gap-2 p-8 border border-gray-300 rounded-md gap-8 mt-4"
        >
            <input checked={todo.completed} type="checkbox" onChange={() => handleChange(todo.id)} />
            <p className={todo.completed ? "line-through" : ""}>{todo.text}</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleDelete(todo.id)}>
                Delete
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => navigate(todo.id)}>
                voir la tache
            </button>
        </div>
    );
}

export default TodoItem;