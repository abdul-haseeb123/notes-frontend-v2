"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

function CategorySelect({ categories, limit, category }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dropdown>
      <DropdownTrigger className="my-2 sm:my-0">
        <Button
          variant="shadow"
          // className="capitalize bg-pink-500 text-white"
          color="primary"
          startContent={<SlidersHorizontal />}
          isIconOnly
        ></Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Multiple selection example"
        variant="solid"
        color="primary"
        closeOnSelect={false}
        // disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([category])}
        // onSelectionChange={setSelection}
      >
        {categories.map((category) => (
          <DropdownItem
            key={category.attributes.name}
            onClick={() => {
              router.push(
                `${pathname}?category=${category.attributes.name}&limit=${limit}`
              );
            }}
            // as={NextLink}
          >
            {category.attributes.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default CategorySelect;
