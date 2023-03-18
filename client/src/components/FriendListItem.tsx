import React from "react";
import IFriend from "../@types/friend";

type Props = {
  friend: IFriend;
};

export default function FriendListItem({ friend }: Props) {
  return <div>{friend.username}</div>;
}
