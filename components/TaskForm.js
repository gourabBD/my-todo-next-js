import { toast } from "react-hot-toast";

const TaskForm = () => {
  const handleAddTask = (event) => {
    event.preventDefault();
    const form = event.target;
    const taskDetails = form.taskDetail.value;
    
    const myTasks = {
      taskDetails,
      done: false,
    };
    if (taskDetails !== "") {
      fetch("https://my-todo-server-nu.vercel.app/tasks", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(myTasks),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Task Added Successfully!");
            form.reset();
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      toast.error("You must have to put some value.!!");
    }
  };

  return (
    <form onSubmit={handleAddTask} className="lg:w-3/5 w-full">
      <div className="flex justify-center">
        <h1 className="text-2xl text-primary my-5">My To-Do list</h1>
      </div>
      <div className="w-full">
        <textarea
          name="taskDetail"
          className="textarea textarea-primary my-5 w-full "
          placeholder="Add Task"
        />
      </div>
      <div>
        <button
          onSubmit={handleAddTask}
          className="btn btn-outline btn-primary"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
