"use client";

import Link from "next/link";
import addData from "./firestore/addData";

export default function Home() {
  const handleForm = async () => {
    const data = {
      name: "John snow",
      house: "Stark",
    };
    const { result, error } = await addData("users", "user-id", data);

    if (error) {
      return console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Welcome to Next.js</h1>
      <div className="flex gap-4">
        <Link href="/sign-up">
          <b className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
            Sign Up
          </b>
        </Link>
        <Link href="/sign-in">
          <b className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Sign In
          </b>
        </Link>
      </div>
    </div>
  );
}
