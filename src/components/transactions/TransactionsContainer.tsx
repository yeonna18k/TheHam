"use client";

import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import ExpenditureCategoriesList from "./ExpenditureCategoriesList";

const INCOME_CATEGORIES = [
  { id: 1, name: "급여" },
  { id: 2, name: "이자" },
  { id: 3, name: "기타" },
];

export default function TransactionsContainer({ page }: { page: string }) {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [fixedDate, setFixedDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const [fixedExpenditure, setFixedExpenditure] = useState(false);
  const [openFixedDateCalendar, setOpenFixedDateCalendar] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpenCalendar(false);
  };

  return (
    <section className="px-3 py-6 flex flex-col gap-6 bg-white rounded-lg shadow-sm">
      <div className="border-b-2 border-primary text-center py-4 h1 w-[230px] mx-auto mb-4">
        ₩ {Number(9000).toLocaleString()}
      </div>
      <Label>카테고리 선택</Label>
      {page === "expenditure" ? (
        <ExpenditureCategoriesList />
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {INCOME_CATEGORIES.map((category) => (
            <Button variant="icon" key={category.id}>
              {category.name}
            </Button>
          ))}
        </div>
      )}
      <Label>메모</Label>
      <Input placeholder="메모를 입력해주세요(30자 이내)" maxLength={30} />
      <Label>날짜</Label>
      <div className="relative">
        <Button
          id="date"
          variant="outline"
          onClick={() => setOpenCalendar(!openCalendar)}
          className="justify-start pl-3 focus:bg-transparent"
        >
          <CalendarIcon className="text-gray-500" />
          {date && format(date, "yyyy. MM. dd")}
        </Button>
        {openCalendar && (
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="absolute bg-white -top-73 left-10  rounded-md shadow-sm z-10"
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={fixedExpenditure}
          onCheckedChange={() => setFixedExpenditure(!fixedExpenditure)}
        />
        <Label>고정 지출로 등록</Label>
      </div>
      {fixedExpenditure && (
        <div>
          <Label className="shrink-0 mb-4">기간</Label>
          <div className="grid grid-cols-4 gap-2">
            <Button>매일</Button>
            <Button>매주</Button>
            <Button>매월</Button>
            <Button>매년</Button>
          </div>
          <div className="relative flex items-center gap-2 mt-4">
            <Button
              id="fixed-date"
              variant="outline"
              onClick={() => setOpenFixedDateCalendar(!openFixedDateCalendar)}
              className="justify-start pl-3 focus:bg-transparent"
            >
              <CalendarIcon className="text-gray-500" />
              {fixedDate?.from ? (
                fixedDate.to ? (
                  <>
                    {format(fixedDate.from, "yyyy. MM. dd")} -{" "}
                    {format(fixedDate.to, "yyyy. MM. dd")}
                  </>
                ) : (
                  format(fixedDate.from, "yyyy. MM. dd")
                )
              ) : (
                <span>기간을 설정해주세요</span>
              )}
            </Button>
            {openFixedDateCalendar && (
              <Calendar
                mode="range"
                selected={fixedDate}
                defaultMonth={fixedDate?.from}
                onSelect={setFixedDate}
                className="absolute bg-white -top-73 left-10  rounded-md shadow-sm z-10"
              />
            )}
          </div>
        </div>
      )}
      <Button variant="primary">등록하기</Button>
    </section>
  );
}
