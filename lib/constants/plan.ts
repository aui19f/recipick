export const Plan = ["BASICS", "PLUS", "PREMIUM"];
type TypePlan = (typeof Plan)[number];

//Record<Key, Value>
export const PLAN_LABELS: Record<TypePlan, string> = {
  BASICS: "BASICS",
  PLUS: "PLUS",
  PREMIUM: "PREMIUM",
};
