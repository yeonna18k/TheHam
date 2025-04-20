"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ExpenditureCategoriesList from "./ExpenditureCategoriesList";

export default function ExpenditureContainer() {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

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
      <ExpenditureCategoriesList />
      <Label>메모</Label>
      <Input />
      <Label>날짜</Label>
      <div className="relative">
        <Button
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
      <Button variant="primary">등록하기</Button>
    </section>
  );
}
