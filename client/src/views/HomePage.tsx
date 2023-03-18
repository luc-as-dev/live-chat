import React, { ReactNode, useEffect, useState } from "react";
import IFriend from "../@types/friend";
import IUser from "../@types/user";
import FriendListItem from "../components/FriendListItem";
import TopBar from "../components/TopBar";
import UserListItem from "../components/UserListItem";
import socket from "../socket";

const TYPING_DELAY = 500;

type Props = {
  username: string | null;
};

export default function HomePage({ username }: Props) {
  const [friends, setFriends] = useState<IFriend[]>([]);
  const [searchedFriends, setSearchedFriends] = useState<IFriend[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    function searchedUsers(data: { users: IUser[] }) {
      console.log(data);
      console.log(data.users);
      setSearchedUsers(data.users);
    }

    socket.on("searched_users", searchedUsers);
    return () => {
      socket.off("searched_users", searchedUsers);
    };
  }, []);

  useEffect(() => {
    if (!search) {
    } else {
      socket.emit("search_user", { username: search });
    }
  }, [search]);

  return (
    <div className="bg-gray-100 max-w-lg h-full flex flex-col rounded-md shadow-md grow">
      <TopBar search={search} onSearchChange={setSearch} />
      <div className="border-gray-300 text-gray-700 border-b text-center">
        {search && friends.length === 0 ? (
          <p className="py-1">You have no friend matching "{search}"</p>
        ) : friends.length === 0 ? (
          <p className="py-1">You have no friend...</p>
        ) : (
          friends.map((friend) => <FriendListItem friend={friend} />)
        )}
      </div>
      {search && (
        <div className="border-gray-300 text-gray-700 border-b text-center">
          {searchedUsers.length === 0 ? (
            <p className="py-1">
              Can not find a user with username matching "{search}"
            </p>
          ) : (
            <>
              <p className="py-1">Users matching search "{search}"</p>
              {searchedUsers.map((user) => (
                <UserListItem key={user._id} user={user} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
