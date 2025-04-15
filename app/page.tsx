"use client";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className='w-full min-h-screen flex flex-col gap-4 items-center justify-center bg-gray-600 text-white text-5xl'>
      Hello Next.js
      <Button
        className='cursor-pointer'
        onClick={() => router.push("/sign-up")}
      >
        Sign-Up
      </Button>
    </div>
  );
}
