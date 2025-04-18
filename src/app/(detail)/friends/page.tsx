import FriendsContainer from "@/components/friends/FriendsContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "친구 관리",
  description: "친구 관리 및 챌린지 초대",
};

export default function FriendsPage() {
  return <FriendsContainer />;
}
