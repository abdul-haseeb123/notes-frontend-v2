import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import NextLink from "next/link";
import NextImage from "next/image";
import MyPagination from "./pagination";

async function getBlogs(limit) {
  try {
    const res = await fetch(
      process.env.BACKEND_URL +
        `/api/blogs/?populate[0]=cover&fields[0]=title&fields[1]=slug&fields[2]=description&pagination[limit]=${limit}`,
      {
        cache: "no-store",
      }
    );
    return res.json();
  } catch (error) {
    return { error: error.message || "An error occured" };
  }
}

export const metadata = {
  title: "Blogs",
  description: "Blogs",
  type: "article",
  openGraph: {
    title: "Blogs",
    description: "Blogs",
    type: "article",
  },
};

function BlogCard({ blog }) {
  return (
    <Card
      className="bg-background/35 max-w-[330px] hover:cursor-pointer group "
      radius="sm"
      shadow="sm"
      as={NextLink}
      href={"/blogs/" + blog.attributes.slug}
    >
      <CardHeader className="">
        <Image
          as={NextImage}
          src={
            process.env.BACKEND_URL + blog.attributes.cover.data.attributes.url
          }
          className="w-[320px] h-[210px]  object-cover rounded-none "
          alt={blog.attributes.title}
          width={400}
          height={400}
        />
      </CardHeader>
      <CardBody className="">
        <h3 className="font-semibold text-3xl group-hover:text-pink-600">
          {blog.attributes.title}
        </h3>
        <p className="line-clamp-3 text-small pt-3 ">
          {blog.attributes.description}
        </p>
      </CardBody>
    </Card>
  );
}

export default async function blogs({ searchParams }) {
  const starting_limit = searchParams["limit"] || 10;
  const data = await getBlogs(starting_limit);
  if (data.error) {
    return (
      <main className="container p-3 grid place-content-center min-h-screen">
        <h1 className="text-4xl font-bold pb-9">Error while fetching blogs</h1>
      </main>
    );
  }

  if (data.data.length === 0) {
    return (
      <main className="container p-3 grid place-content-center min-h-screen">
        <h1 className="text-4xl font-bold pb-9">No blogs Published Yet</h1>
      </main>
    );
  }

  return (
    <main className="container p-3 grid place-content-center min-h-screen">
      <h1 className="text-4xl font-bold pb-9">Blogs</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.data.map((blog, idx) => (
          <BlogCard key={blog.id + idx} blog={blog} />
        ))}
      </div>
      <MyPagination total={data.meta.pagination.total} limit={starting_limit} />
    </main>
  );
}
