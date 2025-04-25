import TransactionsContainer from "@/components/transactions/TransactionsContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const REGISTER_TABS = [
  { value: "expenditure", label: "지출" },
  { value: "income", label: "수입" },
];

export default function Register() {
  return (
    <Tabs defaultValue="expenditure" className="w-full">
      <TabsList className="w-fit ">
        {REGISTER_TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {REGISTER_TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <TransactionsContainer page={tab.value} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
