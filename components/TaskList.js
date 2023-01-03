import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("https://my-todo-server-nu.vercel.app/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [tasks]);

  const handleDelete = (id) => {
    const proceed = window.confirm(
      "Are you sure, you want to delete this task?"
    );

    if (proceed) {
      fetch(`https://my-todo-server-nu.vercel.app/tasks/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success(`Task deleted successfully!`);
          }
        });
    }
  };
  const handleDone = (id, taskDetails) => {
    fetch(`https://my-todo-server-nu.vercel.app/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        taskDetails,
        done: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`The Task Is Done.`);
        }
      });
  };

  return (
    <div className="my-5 p-5 w-full">
      {tasks.length > 0 ? (
        <div className="flex justify-center">
          <h1 className="text-2xl text-primary">All Tasks</h1>
        </div>
      ) : (
        <div className="flex justify-center">
          <h1 className="text-2xl text-error">First Add Some Tasks!!</h1>
        </div>
      )}

      {tasks?.map((task) => (
        <div
          key={task?._id}
          className="card   bg-neutral text-neutral-content my-10 "
        >
          <div className="p-3 items-center text-center flex justify-between overflow-x-auto">
            {task?.done ? (
              <h2
                className="card-title my-2 mx-2 line-through"
                defaultValue={task?.taskDetails}
              >
                {task?.taskDetails}
              </h2>
            ) : (
              <h2
                className="card-title my-2 mx-2 "
                defaultValue={task?.taskDetails}
              >
                {task?.taskDetails}
              </h2>
            )}

            <div className="card-actions  justify-end mx-5">
              <Link  href={`/tasks/${encodeURIComponent(task?._id)}`}>
                <button className="btn btn-xs btn-outline btn-primary">
                  Edit
                </button>
              </Link>

             {task?.done? <button
                onClick={() => handleDone(task?._id, task?.taskDetails)}
                className="btn btn-outline btn-xs btn-disabled"
              >
                Done
              </button> :  <button
                onClick={() => handleDone(task?._id, task?.taskDetails)}
                className="btn btn-outline btn-xs btn-accent"
              >
                Done
              </button>}
              <button
                onClick={() => handleDelete(task?._id)}
                className="btn btn-outline btn-xs btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
