import React, { useState } from "react";
import { PlusCircle } from "react-feather";
import { User } from "react-feather";

type Props = {
  username: string | null;
};

export default function HomePage({ username }: Props) {
  const [friends, setFriends] = useState<string[]>([]);

  return (
    <div className="bg-gray-100 h-full gap-2 flex flex-col rounded-md shadow-md grow">
      <div className="border-b-gray-300 px-2 py-2 gap-4 border-b flex justify-between items-center">
        <User className="stroke-gray-500 h-8 w-8" />
        <input
          className="bg-gray-100 border-gray-300 px-2 py-1 border-b grows rounded-none outline-none"
          type="text"
          placeholder="Search..."
        />
        <PlusCircle className={"stroke-gray-500 h-8 w-8"} />
      </div>
      <div className="">
        {friends.length === 0 && (
          <p className="text-center">You have no friend...</p>
        )}
      </div>
      <div></div>
    </div>
  );
}
