"use client";
import { ingredientType } from "@/app/(user)/recipe/actions";
import SelectBox from "@/components/forms/SelectBox";
import { FormOption } from "@/types/ui";
import { useMemo, useState } from "react";

const ratioList = [0.5, 0.75, 1, 1.5, 2];

interface IngredientViewerProps {
  ingredients: ingredientType[];
}

export default function IngredientViewer({
  ingredients,
}: IngredientViewerProps) {
  const [selectedRatio, setSelectedRatio] = useState("1");

  // 주재료 기준으로 비율 옵션 생성
  const ratioOptions: FormOption[] = useMemo(() => {
    const mainItem = ingredients.find((x) => x.isMain);
    if (!mainItem) return [];
    return ratioList.map((r) => ({
      id: r.toString(),
      label: (mainItem.capacity * r).toString(),
    }));
  }, [ingredients]);

  // 선택된 비율에 따라 계산된 재료 배열
  const displayedIngredients = useMemo(() => {
    const ratio = parseFloat(selectedRatio);
    return ingredients.map((item) =>
      item.isMain ? item : { ...item, capacity: item.capacity * ratio }
    );
  }, [ingredients, selectedRatio]);

  const handleRatioChange = (value: string) => {
    setSelectedRatio(value);
  };

  return (
    <>
      {displayedIngredients.map((item) => (
        <li
          key={item.id}
          className={`flex items-center gap-2 ${
            item.isMain ? "bg-gray-50 p-2 rounded-md" : ""
          }`}
        >
          <p className="flex-1">{item.name}</p>

          {item.isMain ? (
            <div>
              {ratioOptions.length > 0 && (
                <SelectBox
                  name="mainitem"
                  selected={selectedRatio}
                  options={ratioOptions}
                  onChange={(e) => handleRatioChange(e.target.value)}
                />
              )}
            </div>
          ) : (
            <p>{item.capacity}</p>
          )}

          <p className="w-6 text-right">{item.unit}</p>
        </li>
      ))}
    </>
  );
}
