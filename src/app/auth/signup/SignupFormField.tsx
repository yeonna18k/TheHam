"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EXPENSE_CATEGORIES } from "@/constants/categories";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  nickname: z.string(),
  selectedCategories: z
    .array(z.number())
    .min(7, "카테고리를 7개 선택해주세요")
    .max(7, "카테고리는 7개만 선택 가능합니다"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignupFormField() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      selectedCategories: [],
    },
  });
  const handleCategoryClick = (categoryId: number) => {
    if (getValues("selectedCategories").includes(categoryId)) {
      setValue(
        "selectedCategories",
        getValues("selectedCategories").filter((id) => id !== categoryId)
      );
    } else {
      setValue(
        "selectedCategories",
        [...getValues("selectedCategories"), categoryId].slice(0, 7)
      );
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 justify-center"
    >
      <div className="flex flex-col gap-2 w-full">
        <Label>닉네임</Label>
        <div className="w-full flex gap-2 items-center">
          <Input id="nickname" {...register("nickname")} />
          <Button variant="fit" size="fitSm">
            중복 확인
          </Button>
        </div>
      </div>
      <span className="text-center text-sm text-gray-600">
        자주 사용하실 카테고리를 7가지 선택해주세요
        <br />
        선택하신 카테고리는 지출 등록 시 상위에 나타나요
      </span>
      <div className="flex flex-wrap gap-2 w-full justify-center">
        {EXPENSE_CATEGORIES.map((category) => {
          return (
            <Button
              key={category.id}
              variant="fit"
              size="fit"
              className={cn("", {
                "bg-primary text-white": getValues(
                  "selectedCategories"
                ).includes(category.id),
              })}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Button>
          );
        })}
      </div>
      <Button variant="primary">시작하기</Button>
    </form>
  );
}
