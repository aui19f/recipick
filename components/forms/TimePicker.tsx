interface ITImePickerProps {
  hourMin?: number | null;
  hourMax?: number | null;
  minutesMin?: number | null;
  minutesMax?: number | null;
}
export default function TimePicker({
  hourMin = null,
  hourMax = null,
  minutesMin = null,
  minutesMax = null,
}: ITImePickerProps) {
  const hour = [];
  for (let i = 0; i <= 23; i++) {
    hour.push({ id: i.toString(), label: i >= 10 ? i.toString() : `0${i}` });
  }

  const minutes = [];
  for (let i = 0; i <= 55; i += 5) {
    minutes.push({ id: i.toString(), label: i >= 10 ? i.toString() : `0${i}` });
  }

  return (
    <div className="border border-gray-400 flex items-center gap-1 px-1 w-full">
      <div className="flex-1 p-2">
        <select className="appearance-none text-center w-full">
          {hour.map((option) => {
            let isDisabled = false;
            if (hourMin !== null && Number(option.id) < hourMin) {
              isDisabled = true;
            } else if (hourMax !== null && Number(option.id) > hourMax) {
              isDisabled = true;
            }
            return (
              <option key={option.id} value={option.id} disabled={isDisabled}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
      <span>:</span>
      <div className="flex-1 p-2">
        <select className="appearance-none text-center w-full">
          {minutes.map((option) => {
            let isDisabled = false;
            if (minutesMin !== null && Number(option.id) < minutesMin) {
              isDisabled = true;
            } else if (minutesMax !== null && Number(option.id) > minutesMax) {
              isDisabled = true;
            }
            return (
              <option key={option.id} value={option.id} disabled={isDisabled}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
