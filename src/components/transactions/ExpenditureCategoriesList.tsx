'use client';

import { CATEGORIES } from '@/constants/categories';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function ExpenditureCategoriesList() {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="grid grid-cols-2 w-full gap-2">
      {(showAll ? CATEGORIES.slice(0, 20) : CATEGORIES.slice(0, 7)).map(
        (category) => (
          <Button variant="icon" key={category.id}>
            {category.korean}
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
