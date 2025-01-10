"use client";

import React, { useState } from "react";

// Icons
import { AiOutlineSearch } from "react-icons/ai";

// Images
// import LoaderGif from "@/public/assets/images/gym_loader.gif";
// import Image from "next/image";

// Types
// Helpers
import { useDebouncedSearch } from "@/utils/helper";

type PropTypes = {projectId
  setSearch?: (search: string) => void;
  setPagination?: (pagination: any) => void;
  extraClass?: string;
  hidden?: boolean;
  setPage?: (page: number) => void;
  pageSize?: number;
};

function SearchBar({
  setSearch,
  setPagination,
  extraClass,
  setPage,
  hidden,
  pageSize,
}: PropTypes) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDebouncedSearch = useDebouncedSearch(
    setSearch,
    setIsLoading,
    setPage
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setPagination) {
      setPagination({ page: 1, pageSize: pageSize || 12 });
    }

    setIsLoading(true);
    const searchValue = event.target.value;
    handleDebouncedSearch(searchValue);
  };

  return (
    <div
      className={`${extraClass} ${
        hidden ? "sm:pr-10 pr-1" : "pr-12"
      } relative bg-white flex items-center sm:text-base text-sm pl-4 py-2 border border-lightGray rounded-lg w-full`}
    >
      <input
        type="text"
        placeholder="Search..."
        className="w-full outline-none border-none"
        onChange={handleChange}
      />
      {/* {isLoading ? (
        <img
          src={LoaderGif}
          className={`absolute right-[-10px] ${
            hidden && "sm:block hidden right-[-8px]"
          }`}
          loading="lazy"
          alt="Loader"
        />
      ) : (
        <AiOutlineSearch
          className={`absolute right-5 text-xl cursor-pointer hover:text-primary duration-200 hover:duration-200
                ${hidden && "sm:block hidden right-4"}`}
        />
      )} */}
    </div>
  );
}

export default SearchBar;
