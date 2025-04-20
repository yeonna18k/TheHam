"use client";

import { EXPENSE_CATEGORIES } from "@/constants/categories";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

const formSchema = z.object({
  selectedCategories: z
    .array(z.number())
    .length(7, "카테고리를 7개 선택해주세요"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CategorySettings() {
  const {
    handleSubmit,
    trigger,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedCategories: [1, 4, 5, 7, 9, 10, 13],
    },
    mode: "onChange",
  });

  const selectedCategories = watch("selectedCategories");

  console.log(getValues("selectedCategories"));
  console.log(isValid);

  const handleCategoryClick = (categoryId: number) => {
    if (getValues("selectedCategories").includes(categoryId)) {
      setValue(
        "selectedCategories",
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setValue(
        "selectedCategories",
        [...selectedCategories, categoryId].slice(0, 7)
      );
    }
  };
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  useEffect(() => {
    trigger("selectedCategories");
  }, [selectedCategories, trigger]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2 w-full justify-center">
        {EXPENSE_CATEGORIES.map((category) => {
          return (
            <Button
              key={category.id}
              type="button"
              variant="fit"
              size="fit"
              className={cn("", {
                "bg-primary text-white": selectedCategories.includes(
                  category.id
                ),
              })}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Button>
          );
        })}
      </div>
      <Button variant="primary" disabled={!isValid}>
        저장하기
      </Button>
    </form>
  );
}
