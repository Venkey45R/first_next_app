'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const res = await signIn('credentials', {email,password, redirect: false});
      if(res.error){
        setError("Invalid credentials");
        return;
      }
      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='grid h-screen place-items-center'>
      <div className='p-5 border-t-4 border-green-400 rounded-lg shadow-lg'>
        <h1 className='my-4 text-xl font-bold'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input type='email' placeholder='email' onChange={(e) => {setEmail(e.target.value)}}/>
          <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
          <button className='px-6 py-2 font-bold text-white bg-green-600 cursor-pointer'>Login</button>
          {error && (<div className='px-3 py-1 mt-2 text-sm text-white bg-red-500 rounded-md w-fit'>
            {error}
          </div>)}
          <Link href="/Register">
            <h2 className='mt-3 text-sm text-right'>
              Don't have an account <span className='underline'>Register</span>
            </h2>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
