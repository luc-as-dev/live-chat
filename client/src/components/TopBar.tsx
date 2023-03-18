import React, { ChangeEvent } from "react";
import { PlusCircle } from "react-feather";
import { User } from "react-feather";

type Props = {
  search: string;
  onSearchChange: (search: string) => void;
};

export default function TopBar({ search, onSearchChange }: Props) {
  function onSearchChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value);
  }

  return (
    <div className="border-gray-300 px-2 py-2 gap-4 border-b flex justify-between items-center">
      <User className="stroke-gray-500 h-8 w-8" />
      <input
        className="bg-gray-100 border-gray-300 px-2 py-1 border-b grows rounded-none outline-none"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={onSearchChangeHandler}
      />
    </div>
  );
}
