"use client";

import '../app/globals.css';
import '../fontawesome';

import Image from "next/image";
import avator from '../../public/Home/avator.jpg';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Home() {

  const router = useRouter();

  const handleSignout = async () => {
    try {
      await axios.get("/api/users/signout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const [name, setName] = useState("");
  const [tasksData, setTasksData] = useState([]);

  // Fetch username
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const res = await axios.get("/api/users/myData");
        setName(res.data.cookieSavedData.username);
      } catch (error) {
        console.error("Error fetching username", error);
      }
    };
    fetchUsername();
  }, []);

  // fetch data corresponding to the usename
  useEffect(() => {
    if (name) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/api/users/getData`, {
            params: { username: name }
          });
          console.log(res.data.userTasks);
          setTasksData(res.data.userTasks);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };
      fetchData();
    }
  }, [name]);



  return (
    <main className="h-[100vh] w-[100vw] flex justify-around items-center">

      {/* LEFT SECTION */}
      <div className='h-[90%] w-[20%] rounded-3xl flex flex-col justify-around items-center bg-zinc-900'>

        {/* AVATAR */}
        <div className='h-[15%] flex justify-center items-center'>
          <div className='h-[60%] rounded-full overflow-hidden'>
            <Image src={avator} alt="Failed to load profile" className="object-cover h-full w-full " />
          </div>
          <p className='mx-4'>@{name ? name : "USERNAME"}</p>
        </div>


        {/* TASK CATEGORIES */}
        <div className='py-16 w-full flex flex-col justify-center pl-[25%]'>
          <div className='mt-2'><FontAwesomeIcon icon={faHouse} className='mx-2' />  All Tasks</div>
          <div className='mt-2'><FontAwesomeIcon icon={faStar} className='mx-2' />  Important</div>
          <div className='mt-2'><FontAwesomeIcon icon={faCheck} className='mx-2' />  Completed</div>
          <div className='mt-2'><FontAwesomeIcon icon={faList} className='mx-2' />  Incompleted</div>
        </div>


        {/* SIGNOUT SECTION */}
        <div className='flex justify-center items-center'>
          <FontAwesomeIcon icon={faRightFromBracket} size="2x" onClick={handleSignout} />
          <p className='px-4 text-lg' onClick={handleSignout}>Signout</p>
        </div>

      </div>







      {/* RIGHT SECTION */}
      <div className='h-[90%] w-[75%] bg-zinc-900 rounded-3xl'>

        {/* Heading Section */}
        <div className='mx-10 my-8 font-bold text-2xl'>
          All Tasks
        </div>

        {/* Scrollable Cards Section */}
        <div className='mx-10 my-8 h-[75%] overflow-y-auto flex flex-wrap justify-start gap-6 px-8 py-4'>

          {tasksData.length > 0 ? (
            tasksData.map((task: any, index) => (
              <Card
                className='text-white bg-zinc-700 w-[300px] max-h-[75%] p-4 rounded-lg shadow-lg hover:bg-zinc-600 transition duration-300 ease-in-out flex flex-col justify-around items-center'
                key={index}
              >
                <CardHeader>
                  <CardTitle className='text-lg font-semibold'>{task.title}</CardTitle>
                  <CardDescription className='text-sm text-gray-400'>
                    {new Date(task.dueDate).toLocaleDateString('en-US')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-100'>{task.description}</p>
                </CardContent>
                <CardFooter className='flex justify-between items-center mt-4 space-x-8'>
                  <Badge className={`text-sm py-1 px-2 rounded-md`}>
                    {task.status}
                  </Badge>
                  <div className='flex space-x-4'>
                    <FontAwesomeIcon icon={faEdit} className='cursor-pointer text-yellow-400 hover:text-yellow-500' />
                    <FontAwesomeIcon icon={faTrash} className='cursor-pointer text-red-400 hover:text-red-500' />
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : ""}

          {/* Add New Task Card */}
          <Card
            className='text-white bg-zinc-700 w-[300px] max-h-[75%] rounded-lg shadow-lg hover:bg-zinc-600 transition duration-300 ease-in-out flex justify-center items-center'
            onClick={() => router.push("/newTask")}
          >
            <FontAwesomeIcon icon={faPlus} className='mr-4' />
            Add new task
          </Card>

        </div>


      </div>


    </main >
  );
}

{/* <Card className='text-white bg-zinc-700 '>
        <CardHeader>
          <CardTitle>Bonyo</CardTitle>
          <CardDescription>Onik</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Badge>Badge</Badge>
          <FontAwesomeIcon icon={faEdit} />
          <FontAwesomeIcon icon={faTrash} />
        </CardFooter>
      </Card> */}