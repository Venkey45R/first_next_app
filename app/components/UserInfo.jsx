'use client';
import React from 'react'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
function UserInfo() {
  const {data: session} = useSession();
  const handleSubmit = () =>{
    signOut();
  }
  return (
    <div className='grid h-screen place-items-center'>
      <div className='flex flex-col gap-2 p-8 my-6 shadow-lg bg-zinc-300 bg-opacity-10'>
        <div>Name: <span className='font-bold '>{session?.user?.name}</span></div>
        <div>Email: <span className='font-bold '>{session?.user?.email}</span></div>
        <button onClick={handleSubmit} className='px-6 py-2 mt-3 font-bold text-white bg-red-500 '>Logout</button>
      </div>
    </div>
  )
}

export default UserInfo;