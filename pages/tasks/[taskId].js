import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import IndividualTask from "../../components/IndividualTask";


const TaskId = () => {
  const router=useRouter()
const id=router.query.taskId
const [task,setTask]=useState([])
useEffect(()=>{
  fetch(`https://my-todo-server-nu.vercel.app/tasks/${id}`)
  .then(res=>res.json())
  .then(data=>setTask(data))
},[task])

  return (
   

    <div className="min-h-screen flex justify-center p-2">
     <Head>
            <title>Edit Task</title>
        </Head>
      <IndividualTask task={task}></IndividualTask>
    </div>
    
  );
};

// export const getServerSideProps= async ()=>{
  

//   const res= await fetch(`https://my-todo-server-nu.vercel.app/tasks/${id}`)
//   const data= await res.json()
//   console.log(data);
//   return{
//      props:{
//          task: data
//      }
//   }
//  }

// export const getStaticProps = async (context) => {
//   const { params } = context;
//   const res = await fetch(
//     `https://my-todo-server-nu.vercel.app/tasks/${params?.taskId}`
//   );
//   const data = await res.json();

//   return {
//     props: {
//       task: data,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const res = await fetch("https://my-todo-server-nu.vercel.app/tasks");
//   const tasks = await res.json();
//   const paths = tasks?.map((task) => {
//     return {
//       params: {
//         taskId: `${task._id}`,
//       },
//     };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// };

export default TaskId;
