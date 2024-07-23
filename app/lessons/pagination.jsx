"use client";
import { Button } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";

export default function MyPagination({ total, limit, category }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (limit >= total) {
      return;
    }
    router.push(
      `${pathname}?limit=${Number(limit) + 10}${
        category !== "" ? `&category=${category}` : ""
      }`,
      {
        scroll: false,
      }
    );
  };
  return (
    <div className="container mx-auto flex justify-center py-5">
      <Button
        color="primary"
        onClick={handleClick}
        className={limit >= total && "hidden" + " dark:text-white"}
      >
        Load More
      </Button>
    </div>
  );
}
