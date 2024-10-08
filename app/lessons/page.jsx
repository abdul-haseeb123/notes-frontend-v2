import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import NextImage from "next/image";
import CategorySelect from "./categoryselect";
import NextLink from "next/link";
import MyPagination from "./pagination";

export const metadata = {
  title: "Lessons",
};

async function getLessons(category, limit) {
  try {
    if (category == "") {
      const res = await fetch(
        process.env.BACKEND_URL +
          `/api/lessons?populate=*&fields[0]=title&fields[1]=slug&fields[2]=description&pagination[limit]=${limit}`,
        {
          cache: "no-store",
        }
      );
      return res.json();
    } else {
      const res = await fetch(
        process.env.BACKEND_URL +
          `/api/lessons?populate=*&fields[0]=title&fields[1]=slug&fields[2]=description&pagination[limit]=${limit}&filters[categories][name][$eqi]=${category}`,
        {
          cache: "no-store",
        }
      );
      return res.json();
    }
  } catch (error) {
    return { error: error.message || "An error occured" };
  }
}

async function getCategories() {
  try {
    const res = await fetch(process.env.BACKEND_URL + "/api/categories", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    return { error: error.message || "An error occured" };
  }
}

function CardComponent({ lesson }) {
  return (
    <Card
      className="max-w-[300px] group hover:shadow-lg transition duration-300 ease-in-out rounded-lg overflow-hidden shadow-lg "
      radius="none"
      as={NextLink}
      href={"/lessons/" + lesson.attributes.slug}
    >
      <CardHeader className="p-0">
        <Image
          src={
            process.env.BACKEND_URL +
            lesson.attributes.cover.data.attributes.url
          }
          as={NextImage}
          alt={lesson.attributes.title}
          className="w-[300px] h-[220px] object-cover rounded-none"
          width={lesson.attributes.cover.data.attributes.width}
          height={lesson.attributes.cover.data.attributes.height}
        />
      </CardHeader>
      <CardBody className="">
        <h1 className="text-2xl font-bold group-hover:text-pink-600">
          {lesson.attributes.title}
        </h1>
        <p className="pt-1 text-sm line-clamp-3 ">
          {lesson.attributes.description}
        </p>
      </CardBody>
      <CardFooter className="gap-2 flex flex-row flex-wrap pt-0">
        {lesson.attributes.categories.data.map((category) => (
          <Chip
            key={category.attributes.name}
            size="sm"
            variant="solid"
            color="primary"
            style={{
              color: "white",
            }}
          >
            # {category.attributes.name}
          </Chip>
        ))}
      </CardFooter>
    </Card>
  );
}

export default async function lessons({ searchParams }) {
  const category = searchParams["category"] ?? "";
  const limit = searchParams["limit"] || 10;
  const data = await getLessons(category, limit);
  const lessons = data.data;

  if (data.error) {
    return (
      <main className="container p-3 grid place-content-center min-h-screen">
        <h1 className="text-4xl font-bold pb-9">
          Error while fetching Lessons
        </h1>
      </main>
    );
  }
  if (data.data.length === 0) {
    return (
      <main className="container p-3 grid place-content-center min-h-screen">
        <h1 className="text-4xl font-bold pb-9">No Lessons Published Yet</h1>
      </main>
    );
  }

  const categories = await getCategories();
  if (categories.error) {
    return (
      <main className="container p-3 grid place-content-center min-h-screen">
        <h1 className="text-4xl font-bold pb-9">
          Error while fetching Categories
        </h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto grid p-5 justify-center min-h-[90vh]">
      {categories.data.length > 0 && (
        <div className="w-fit md:ml-auto md:mr-0 ml-auto mr-auto">
          <CategorySelect
            categories={categories.data}
            limit={limit}
            category={category}
          />
        </div>
      )}

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 place-content-center">
        {lessons.map((lesson) => (
          <CardComponent lesson={lesson} key={lesson.attributes.slug} />
        ))}
      </section>
      <MyPagination
        total={data.meta.pagination.total}
        limit={limit}
        category={category}
      />
    </main>
  );
}
