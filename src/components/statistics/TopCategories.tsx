interface Category {
  name: string;
  color?: string;
  value: number;
}

interface TopCategoriesProps {
  categories: Category[];
  onSelect?: (cat: Category) => void;
}

export function TopCategories({ categories }: TopCategoriesProps) {
  if (!categories || categories.length === 0) {
    return <div></div>; // 카테고리가 없을 때 표시
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">TOP3 카테고리</h2>
      <div className="space-y-3">
        {categories.map((category, index) => (
          <div
            key={category.name}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: category.color }}
              >
                {index + 1}
              </div>
              <span className="ml-4">{category.name}</span>
            </div>
            <span className="font-semibold">
              {/* {category.value.toLocaleString()}원 */}
              {category.value}원
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
