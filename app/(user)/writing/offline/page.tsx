"use client";

import Input from "@/components/forms/Input";

import DateRangePicker, { DateRange } from "@/components/forms/DateRangePicker";
import TimeRangePicker, { TimeRange } from "@/components/forms/TimeRangePicker";
import ImageUploadButton from "@/components/ImageUpload";
import { useActionState, useState } from "react";
import PreviewImages from "@/components/PreviewImages";
import Button, { variantEnum } from "@/components/forms/Button";
import OfflineForm from "@/app/(user)/writing/offline/actions";
import dayjs from "dayjs";
import { formatToWon } from "@/lib/until";
import TextEditor from "@/components/forms/TextEditor";

export default function WrigingOffline() {
  // const [state, actions, isPending] = useActionState(loginForm, null);
  const [state, actions] = useActionState(OfflineForm, null);

  const [title, setTitle] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [timeRange, setTimeRange] = useState<TimeRange>({
    startHour: 9,
    startMinutes: 0,
    endHour: 18,
    endMinutes: 0,
  });

  const [period, setPeriod] = useState("");
  const [edit, setEdit] = useState("");

  //타이틀
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  //날짜관리

  //시간관리

  //
  const changeMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const isNumber = !isNaN(Number(rawValue));
    setPeriod(isNumber ? formatToWon(Number(rawValue)) : "");
  };

  //행사명
  const handleSubmit = async (formData: FormData) => {
    images.forEach((file) => formData.append("poster", file));
    actions(formData);
  };

  return (
    <form action={handleSubmit}>
      <header className="flex items-center justify-between p-4 border-b border-gray-200 ">
        <h1 className="text-lg font-bold">행사등록</h1>
        <Button variant={variantEnum.primary} type="submit">
          등록
        </Button>
      </header>
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-xl">행사명</p>
          <div>
            <Input
              name="title"
              type="text"
              value={title}
              onChange={(value) => changeTitle(value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex">
            <p className="font-bold text-xl flex-1">행사포스터</p>
            <ImageUploadButton onFilesSelected={setImages} isSquare={false} />
          </div>
          <div className="flex">
            <div className="bg-gray-200 flex-1 aspect-square">
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
          <p className="font-bold text-xl">기간</p>
          <div>
            <DateRangePicker range={dateRange} onChange={setDateRange} />

            <input
              type="hidden"
              name="startDate"
              value={dayjs(dateRange.startDate).format("YYYY/MM/DD")}
              readOnly
            />
            <input
              type="hidden"
              name="endDate"
              value={dayjs(dateRange.endDate).format("YYYY/MM/DD")}
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-bold text-xl">시간</p>
          <div className="flex items-center gap-4">
            <TimeRangePicker
              timeRange={timeRange}
              onTimeChange={setTimeRange}
            />

            <input
              type="hidden"
              name="startTime"
              value={`${timeRange.startHour}:${timeRange.startMinutes}`}
              readOnly
            />
            <input
              type="hidden"
              name="endTime"
              value={`${timeRange.endHour}:${timeRange.endMinutes}`}
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-bold text-xl">장소</p>
          <div>TODO</div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-bold text-xl">금액(현장구매기준)</p>
          <div className="flex items-center gap-2">
            <Input
              name="period"
              value={period}
              onChange={(value) => changeMoney(value)}
              placeholder="0"
            />
            <p>원</p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <input type="hidden" value={edit} readOnly />
          <p className="font-bold text-xl">내용</p>
          <TextEditor content={edit} onChange={(value) => setEdit(value)} />
        </div>
      </div>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
