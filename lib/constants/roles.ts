// lib/constants/roles.ts
export const ROLES = ["GUEST", "BUSINESS", "ADMIN"] as const;
type TypeRole = (typeof ROLES)[number];

// Zod: z.enum(ROLES)
// <select>: ROLES.map(r => <option>{r}</option>)
// API: req.body.role as Role
// DB: prisma.user.create({ data: { role: 'GUEST' } })

export const ROLE_LABELS: Record<TypeRole, string> = {
  GUEST: "일반 사용자",
  BUSINESS: "사업자",
  ADMIN: "관리자",
};
// 사용 :  <Select value={role} label={ROLE_LABELS[role]} />
