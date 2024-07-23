import React from "react";
import NextLink from "next/link";
import NextImage from "next/image";

function Footer2() {
  return (
    <footer className="bg-pink-950 dark:bg-gray-900 text-slate-50 mt-60">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <NextLink
            href="/"
            className="flex items-center mb-4 sm:mb-0  space-x-3 rtl:space-x-reverse"
          >
            <NextImage
              src={"/2.png"}
              className="h-24"
              width={100}
              height={100}
              alt="College Chemistry footer image"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-white">
              College Chemistry
            </span>
          </NextLink>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <NextLink
                href="/about"
                className="hover:underline me-4 md:me-6 text-white"
              >
                About
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/mcqs"
                className="hover:underline me-4 md:me-6 text-white"
              >
                MCQs
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/lessons"
                className="hover:underline me-4 md:me-6 text-white"
              >
                Lessons
              </NextLink>
            </li>
            <li>
              <NextLink href="/blogs" className="hover:underline text-white">
                Blogs
              </NextLink>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-white sm:text-center dark:text-gray-400">
          © 2023{" "}
          <NextLink href="/" className="hover:underline text-white">
            College Chemistry™
          </NextLink>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer2;
