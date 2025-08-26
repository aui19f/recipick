/**
 * 숫자를 쉼표 형식의 문자열로 포맷팅합니다.
 * 예시: 10000 -> "10,000"
 * @param value 숫자 또는 문자열
 * @returns 포맷팅된 문자열
 */
export const formatMoney = (value: string | number): string => {
  if (typeof value === "string") {
    // 이미 문자열이면 쉼표를 제거한 후 다시 포맷팅
    const parsedValue = parseFloat(value.replace(/,/g, ""));
    if (isNaN(parsedValue)) return value; // 유효하지 않은 값은 그대로 반환
    return new Intl.NumberFormat("en-US").format(parsedValue);
  }

  if (typeof value === "number") {
    return new Intl.NumberFormat("en-US").format(value);
  }

  return "";
};

/**
 * 쉼표가 포함된 문자열을 순수한 숫자 타입으로 변환합니다.
 * 숫자가 올 경우 그대로 리턴
 * 예시: "10,000" -> 10000
 * @param value 쉼표가 포함된 문자열
 * @returns 변환된 숫자 또는 NaN
 */
export const parseMoney = (value: string | number): number => {
  const sanitized = typeof value === "string" ? value.replace(/,/g, "") : value;
  return Number(sanitized);
};
