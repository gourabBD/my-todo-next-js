import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";

const TaskId = ({ task }) => {
   
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
    <div className="min-h-screen flex justify-center p-2">
     <Head>
            <title>Edit Task</title>
        </Head>
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
    </div>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const res = await fetch(
    `https://my-todo-server-nu.vercel.app/tasks/${params?.taskId}`
  );
  const data = await res.json();

  return {
    props: {
      task: data,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("https://my-todo-server-nu.vercel.app/tasks");
  const tasks = await res.json();
  const paths = tasks?.map((task) => {
    return {
      params: {
        taskId: `${task._id}`,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export default TaskId;
