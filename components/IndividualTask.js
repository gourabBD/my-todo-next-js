import { useRouter } from "next/router";
import { toast } from "react-hot-toast";


const IndividualTask = ({task}) => {
    const router = useRouter();

    const handleUpdateTask = (event) => {
      event.preventDefault();
      const form = event.target;
      const taskDetail = form.taskDetail.value;
      
  
      fetch(`https://my-todo-server-nu.vercel.app/tasks/${task?._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          taskDetails: taskDetail,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success(`The Task Is Updated.`);
            form.reset();
            router.push("/");
          }
        });
    };
    return (
        <form
        onSubmit={handleUpdateTask}
        className="lg:w-3/5 md:w-3/5 sm:w-3/5 w-full"
      >
        <div className="flex justify-center">
          <h1 className="text-2xl text-primary my-5">Edit Your Task</h1>
        </div>
        <div className="w-full">
          <textarea
            
            name="taskDetail"
            className="textarea textarea-primary my-5 w-full"
            placeholder={task?.taskDetails}
          />
        </div>
        <div>
          <button
            onSubmit={handleUpdateTask}
            className="btn btn-outline btn-primary "
          >
            Update Task
          </button>
        </div>
      </form>
    );
};

export default IndividualTask;