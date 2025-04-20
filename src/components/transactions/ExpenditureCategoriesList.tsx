"use client";

import { EXPENSE_CATEGORIES } from "@/constants/categories";
import { useState } from "react";
import { Button } from "../ui/button";

export default function ExpenditureCategoriesList() {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="grid grid-cols-2 w-full gap-2">
      {(showAll ? EXPENSE_CATEGORIES : EXPENSE_CATEGORIES.slice(0, 7)).map(
        (category) => (
          <Button variant="icon" key={category.id}>
            {category.name}
          </Button>
        )
      )}

      {!showAll && (
        <Button variant="icon" onClick={() => setShowAll(true)}>
          더보기
        </Button>
      )}
    </div>
  );
}
