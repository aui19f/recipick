"use client";
import { ingredientType } from "@/app/(user)/recipe/actions";
import SelectBox from "@/components/forms/SelectBox";
import { FormOption } from "@/types/ui";
import { useEffect, useState } from "react";

const ratio = [0.5, 0.75, 1, 1.5, 2];

export default function IngredientViewer({
  ingredients,
}: {
  ingredients: ingredientType[];
}) {
  const [pageIngredients, setPageIngredients] = useState<ingredientType[]>([
    ...ingredients,
  ]);

  const [selectedRatio, setSelectedRatio] = useState("1");
  const [ratioOptions, setRatioOptions] = useState<FormOption[]>();
  // // // SelectBox에 들어갈 비율 옵션

  // 선택된 비율이 변경될 때 호출되는 함수
  const handleRatioChange = (id: string) => {
    const newRatio = parseFloat(id);
    setSelectedRatio(id);

    const updatedTest = ingredients.map((item) => {
      if (!item.isMain) {
        return { ...item, capacity: item.capacity * newRatio };
      }
      return item;
    });
    setPageIngredients(updatedTest);
  };

  useEffect(() => {
    const foundMainItem = ingredients.find((x) => x.isMain);
    if (foundMainItem) {
      setRatioOptions([
        ...ratio.map((x) => ({
          id: x.toString(),
          label: (foundMainItem.capacity * x).toString(),
        })),
      ]);
    }
  }, [ingredients]);

  return (
    <>
      {pageIngredients.map((item) => (
        <li
          key={item.id}
          className={`flex items-center gap-2 ${
            item.isMain ? "bg-gray-50 p-2 rounded-md" : ""
          }`}
        >
          <p className="flex-1">{item.name}</p>

          {item.isMain ? (
            <div>
              {ratioOptions && (
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
