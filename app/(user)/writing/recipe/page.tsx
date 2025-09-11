"use client";

import RecipeForm from "@/app/(user)/writing/recipe/actions";
import DraggableInputList from "@/components/DraggableInputList";

import Button, { variantEnum } from "@/components/forms/Button";

import Input from "@/components/forms/Input";
import Radio from "@/components/forms/Radio";
import SelectBox from "@/components/forms/SelectBox";
import Textarea from "@/components/forms/Textarea";
import ImageUploadButton from "@/components/ImageUpload";
import PreviewImages from "@/components/PreviewImages";
import { useLoadingStore } from "@/store/loadingStore";
import { redirect } from "next/navigation";

import { useActionState, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface SequenceProps {
  id: string;
  process: string;
}

interface IngredientProps {
  id: string;
  name: string;
  capacity: number;
  unit: string;
  isMain: boolean;
}

export default function WrigingRecipe() {
  const [state, actions, isPending] = useActionState(RecipeForm, null);
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const { setLoading } = useLoadingStore();
  const [sequence, setSequence] = useState<SequenceProps[]>([
    { id: uuidv4(), process: "" },
  ]);

  const [ingredient, setIngredients] = useState<IngredientProps[]>([
    { id: uuidv4(), name: "", capacity: 0, unit: "g", isMain: false },
  ]);

  const options = [
    { id: "g", label: "g" },
    { id: "ml", label: "ml" },
  ];

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    images.forEach((file) => formData.append("images", file));

    formData.append("sequence", JSON.stringify(sequence));
    formData.append("ingredients", JSON.stringify(ingredient));
    actions(formData);
  };

  useEffect(() => {
    setLoading(false);
    if (state?.status && state?.status === 200) {
      alert("레시피가 등록되었습니다.");
      redirect(`/recipe/${state.message}`); // 홈으로 이동 (todo: 로그인 눌렀던 페이지로 이동)
    }
  }, [state, setLoading]);

  return (
    <form action={handleSubmit}>
      <header className="fixed top-0 left-0 right-0 max-w-5xl mx-auto flex items-center justify-between p-2 border-b border-gray-200 bg-white z-50">
        <h1 className="text-lg font-bold">레시피 등록</h1>
        <Button
          variant={variantEnum.primary}
          type="submit"
          disabled={isPending}
        >
          등록
        </Button>
      </header>
      <div className="flex flex-col gap-6 mt-16">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-xl">제목</p>
          <Input
            name="title"
            value={title}
            type="text"
            placeholder={"입력"}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex">
            <p className="font-bold text-xl flex-1">썸네일</p>
            <ImageUploadButton onFilesSelected={setImages} isSquare={false} />
          </div>
          <div className="flex">
            <div className="bg-gray-200 flex-1 aspect-square sm:max-w-lg m-auto">
              <PreviewImages
                images={images}
                onRemove={(i) =>
                  setImages(images.filter((_, idx) => idx !== i))
                }
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-bold text-xl">재료</p>

          <DraggableInputList
            items={ingredient}
            onChange={setIngredients}
            onAdd={() => ({
              id: uuidv4(),
              name: "",
              capacity: 0,
              unit: "g",
              isMain: false,
            })}
            renderInput={(item, onChange) => (
              <div className="flex flex-1 items-center gap-2 ">
                <Input
                  name="name"
                  type="text"
                  className="border-0 flex-2"
                  value={item.name}
                  placeholder="재료"
                  onChange={(e) => onChange({ ...item, name: e.target.value })}
                />
                <Input
                  name="capacity"
                  type="number"
                  className="border-0 flex-1"
                  value={item.capacity}
                  placeholder="용량"
                  onChange={(e) =>
                    onChange({ ...item, capacity: parseInt(e.target.value) })
                  }
                />
                <SelectBox
                  name="ingredient_unit"
                  options={options}
                  selected={item.unit}
                  className="border-0 shadow-none"
                  onChange={(e) =>
                    onChange({ ...item, unit: e.target.value || "g" })
                  }
                />
                <Radio
                  name="mainItem"
                  options={[{ id: "main", label: "주재료(메인)" }]}
                  selected={item.isMain ? "main" : ""}
                  onChange={() =>
                    // 하나만 true로 만들기
                    setIngredients((prev) =>
                      prev.map((ing) =>
                        ing.id === item.id
                          ? { ...ing, isMain: true }
                          : { ...ing, isMain: false }
                      )
                    )
                  }
                />
              </div>
            )}
          ></DraggableInputList>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-bold text-xl">순서</p>
          <DraggableInputList
            items={sequence}
            onChange={setSequence}
            renderInput={(item, onChange) => (
              <Input
                name="sequence_txt"
                value={item.process}
                className="border-0"
                placeholder="만드는 과정을 적어주세요."
                onChange={(e) => onChange({ ...item, process: e.target.value })}
              />
            )}
          ></DraggableInputList>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-bold text-xl">메모</p>
          <Textarea
            name="memo"
            value={memo}
            placeholder={"입력"}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}
