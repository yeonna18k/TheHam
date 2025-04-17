import FriendsContainer from "@/components/friends/FriendsContainer";

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "친구 관리",
  description: "친구 관리 및 챌린지 초대",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const FriendsPage: React.FC = () => {
  return <FriendsContainer />;
};

export default FriendsPage;
