import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          </section>
        </TabsContent>
      ))}
    </Tabs>
  );
}
