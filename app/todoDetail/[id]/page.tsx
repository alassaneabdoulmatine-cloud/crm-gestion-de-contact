"use client";

import { useParams, useRouter } from "next/navigation";
import { data } from "../../data";

function TodoDetail() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const todo = data.find((todo) => todo.id === Number(id));
    return (
        <div>
            <h1>Todo Detail</h1>
            <p>{todo?.text}</p>
            <p>{todo?.completed ? "Completed" : "Not Completed"}</p>
            <button onClick={() => router.back()}>Back</button>
        </div>
    );
}

export default TodoDetail;