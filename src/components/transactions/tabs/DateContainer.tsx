'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

export default function DateContainer() {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showExpenditure, setShowExpenditure] = useState(true);
  const [showIncome, setShowIncome] = useState(true);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpenCalendar(false);
  };

  return (
    <div>
      <div className="relative">
        <Button
          id="date"
          variant="outline"
          onClick={() => setOpenCalendar(!openCalendar)}
          className="justify-start pl-3 focus:bg-transparent"
        >
          <CalendarIcon className="text-gray-500" />
          {date && format(date, 'yyyy. MM. dd')}
        </Button>
        {openCalendar && (
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="absolute bg-white top-14  rounded-md shadow-sm z-10"
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={showExpenditure}
          onCheckedChange={() => setShowExpenditure(!showExpenditure)}
        />
        <Label>지출</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={showIncome}
          onCheckedChange={() => setShowIncome(!showIncome)}
        />
        <Label>수입</Label>
      </div>
    </div>
  );
}
