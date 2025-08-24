export interface TimeRange {
  startHour: number;
  startMinutes: number;
  endHour: number;
  endMinutes: number;
}

interface TimeRangePickerProps {
  onTimeChange?: (timeRange: TimeRange) => void;
  timeRange: TimeRange;
}

const hourOptions = Array.from({ length: 24 }, (_, i) => ({
  id: i.toString(),
  label: i >= 10 ? i.toString() : `0${i}`,
}));

const minuteOptions = Array.from({ length: 12 }, (_, i) => i * 5).map((i) => ({
  id: i.toString(),
  label: i >= 10 ? i.toString() : `0${i}`,
}));

export default function TimeRangePicker({
  onTimeChange,
  timeRange,
}: TimeRangePickerProps) {
  const { startHour, startMinutes, endHour, endMinutes } = timeRange;

  // 시간 유효성 검사 함수
  const validateTimeRange = () => {
    const startTimeInMinutes = startHour * 60 + startMinutes;
    const endTimeInMinutes = endHour * 60 + endMinutes;

    return startTimeInMinutes < endTimeInMinutes;
  };

  const isValid = validateTimeRange();

  const handleTimeChange = (
    type: "startHour" | "startMinutes" | "endHour" | "endMinutes",
    value: number
  ) => {
    onTimeChange?.({
      ...timeRange,
      [type]: value,
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-2 w-full">
        <div className="border border-gray-400 flex items-center gap-1 px-1 flex-1 h-12 rounded-md">
          <select
            className="appearance-none text-center flex-1 h-full bg-white rounded-md focus:border-blue-500 focus:outline-none"
            value={startHour}
            onChange={(e) =>
              handleTimeChange("startHour", parseInt(e.target.value))
            }
          >
            {hourOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>

          <span>:</span>

          <select
            className="appearance-none text-center flex-1 h-full bg-white rounded-md focus:border-blue-500 focus:outline-none"
            value={startMinutes}
            onChange={(e) =>
              handleTimeChange("startMinutes", parseInt(e.target.value))
            }
          >
            {minuteOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <span>~</span>
        <div className="border border-gray-400 flex items-center gap-1 px-1 flex-1 h-12 rounded-md">
          <select
            className="appearance-none text-center flex-1 h-full bg-white rounded-md focus:border-blue-500 focus:outline-none"
            value={endHour}
            onChange={(e) =>
              handleTimeChange("endHour", parseInt(e.target.value))
            }
          >
            {hourOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>

          <span>:</span>

          <select
            className="appearance-none text-center flex-1 h-full bg-white rounded-md focus:border-blue-500 focus:outline-none"
            value={endMinutes}
            onChange={(e) =>
              handleTimeChange("endMinutes", parseInt(e.target.value))
            }
          >
            {minuteOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* 에러 메시지 표시 */}
      {!isValid && (
        <div className="text-red-400 text-sm mt-2">
          시작 시간은 종료 시간보다 빨라야 합니다.
        </div>
      )}
    </div>
  );
}
