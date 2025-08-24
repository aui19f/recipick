export default async function OfflineForm(_: unknown, formData: FormData) {
  const inputData = {
    title: formData.get("title"),
    poster: formData.get("poster"),

    period: formData.get("period"),

    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),

    money: formData.get("money"),
    content: formData.get("content"),
  };

  console.log(inputData);

  return { success: true, error: "" };
}
