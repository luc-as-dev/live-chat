import React from "react";
import { User, UserPlus } from "react-feather";
import IUser from "../@types/user";

type Props = {
  user: IUser;
};

export default function UserListItem({ user }: Props) {
  return (
    <div className="border-gray-300 border-t px-4 py-2 flex justify-between">
      <div className="flex gap-2">
        <User className="stroke-gray-500" />
        <p className="text-gray-800">{user.username}</p>
      </div>
      <UserPlus className="stroke-gray-500" />
    </div>
  );
}
