import React from "react";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";

async function getMcqs() {
  try {
    const res = await fetch(process.env.BACKEND_URL + "/api/mcqs", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    return { error: error.message || "Error while fetching mcqs" };
  }
}

export const metadata = {
  title: "MCQs",
  description: "MCQs for practice",
  openGraph: {
    title: "MCQs",
    description: "MCQs for practice",
  },
};

async function page() {
  const data = await getMcqs();
  if (data.error) {
    return (
      <main className="container p-4 mx-auto min-h-screen grid place-content-center">
        Error while fetching mcqs
      </main>
    );
  }

  if (data.data.length == 0) {
    return (
      <main className="container p-4 mx-auto min-h-screen grid place-content-center">
        <h1 className="text-3xl font-semibold">No MCQs Published Yet</h1>
      </main>
    );
  }

  const mcqs = data.data;
  return (
    <main className="container p-4 mx-auto min-h-screen">
      <h1 className="text-3xl font-bold">MCQs</h1>
      <ol className=" py-6 flex  flex-col">
        {mcqs.map((mcq, key) => (
          <Link
            href={`/mcqs/${mcq.attributes.slug}`}
            key={mcq.attributes.slug}
            size="lg"
            className="text-pink-400 dark:text-white font-extrabold text-2xl  transition-all duration-300 ease-in-out hover:underline "
            as={NextLink}
          >
            {key + 1}. {mcq.attributes.title}
          </Link>
        ))}
      </ol>
    </main>
  );
}

export default page;
