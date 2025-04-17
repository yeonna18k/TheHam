import AccountInfo from "@/components/profile/AccountInfo";
import AchievementsCard from "@/components/profile/AchievementsCard";
import StatisticsCard from "@/components/profile/StatisticsCard";
import WarningsCard from "@/components/profile/WarningCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MOCK_ACHIEVEMENTS from "@/mock/achievementsData";
import { MOCK_CHALLENGES } from "@/mock/challengeStatisticsData";
import MOCK_WARNING_CARDS from "@/mock/warningCardsData";

const PROFILE_TABS = [
  {
    value: "account",
    label: "계정 정보",
    title: "계정 정보",
    description: "계정에 대한 정보",
  },
  {
    value: "achievements",
    label: "업적",
    title: "나의 업적",
    description: "지금까지 획득한 업적 목록이에요",
  },
  {
    value: "statistics",
    label: "통계",
    title: "챌린지 통계",
    description: "지금까지 참여한 챌린지 통계예요",
  },
  {
    value: "warnings",
    label: "경고",
    title: "과소비 경고",
    description: "예산 한도가 얼마나 남았는지 알려드려요",
  },
];

export default function Profile() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="w-fit ">
        {PROFILE_TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {PROFILE_TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <section className="rounded-lg shadow-sm bg-white py-6 px-3 flex flex-col gap-3">
            <div
              className={`${
                tab.value === "account" ? "hidden" : "block"
              } flex flex-col gap-3`}
            >
              <h1 className="title1">{tab.title}</h1>
              <p className="body1 text-gray-500">{tab.description}</p>
            </div>
            <TabContent tabValue={tab.value} />
          </section>
          {tab.value === "account" && (
            <section className="rounded-lg shadow-sm bg-white py-6 px-3 flex flex-col gap-6 mt-3">
              <h1 className="title1">계정 관리</h1>
              <Button>로그아웃</Button>
              <Button variant="warning">탈퇴하기</Button>
            </section>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}

function TabContent({ tabValue }: { tabValue: string }) {
  switch (tabValue) {
    case "account":
      return <AccountInfo />;
    case "achievements":
      return (
        <div className="flex flex-col gap-4">
          {MOCK_ACHIEVEMENTS.map((achievement) => (
            <AchievementsCard key={achievement.id} {...achievement} />
          ))}
        </div>
      );
    case "statistics":
      return (
        <div className="flex flex-col gap-4">
          {MOCK_CHALLENGES.map((stat) => (
            <StatisticsCard key={stat.id} {...stat} />
          ))}
          ;
        </div>
      );
    case "warnings":
      return (
        <div className="flex flex-col gap-4">
          {MOCK_WARNING_CARDS.map((warning) => (
            <WarningsCard key={warning.id} {...warning} />
          ))}
        </div>
      );
    default:
      return null;
  }
}
