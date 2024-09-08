'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are necessary");
      return; 
    }
    setError("");

    try {
      const resUserExists = await fetch('/api/userExists', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
      })
      const user = await resUserExists.json();
      if(user === null){
        setError("User already Exists");
        return;
      }
      const res = await fetch('/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });
      if (res.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setError("");
        e.target.reset();
        router.push("/");
      } else {
        console.log("User registration failed");
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className='grid h-screen place-items-center'>
      <div className='p-5 border-t-4 border-green-400 rounded-lg shadow-lg'>
        <h1 className='my-4 text-xl font-bold'>Register</h1>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='email'
            value={email}
            aria-label='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='text'
            placeholder='full name'
            value={name}
            aria-label='full name'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            value={password}
            aria-label='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='px-6 py-2 font-bold text-white bg-green-600 cursor-pointer'>
            Register
          </button>
          {error && (
            <div className='px-3 py-1 mt-2 text-sm text-white bg-red-500 rounded-md w-fit'>
              {error}
            </div>
          )}
          <Link href="/">
            <h2 className='mt-3 text-sm text-right'>
              Already have an account <span className='underline'>Login</span>
            </h2>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
