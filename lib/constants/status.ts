// lib/constants/roles.ts
export const STATUS = ["JOIN", "WITHDRAW"] as const;
type TypeStatus = (typeof STATUS)[number];

// Zod: z.enum(ROLES)
// <select>: ROLES.map(r => <option>{r}</option>)
// API: req.body.role as Role
// DB: prisma.user.create({ data: { role: 'GUEST' } })

export const STATUS_LABELS: Record<TypeStatus, string> = {
  JOIN: "가입",
  WITHDRAW: "탈퇴",
};
// 사용 :  <Select value={role} label={ROLE_LABELS[role]} />
