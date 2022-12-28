import Head from 'next/head'
import toast, { Toaster } from 'react-hot-toast';
import { Inter } from '@next/font/google'
import Link from "next/link"
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='min-h-screen'>
    <Head >
            <title>Home</title>
        </Head>
     <div className="flex justify-center p-2">
      <TaskForm></TaskForm>
      
     </div>
     <div className=''>
      <TaskList></TaskList>
     </div>
    
     <Toaster />
    </div>
  )
}
