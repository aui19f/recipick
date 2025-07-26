-- CreateEnum
CREATE TYPE "EnumRole" AS ENUM ('GUEST', 'BUSINESS', 'ADMIN');

-- CreateEnum
CREATE TYPE "EnumUserStatus" AS ENUM ('JOIN', 'WITHDRAW');

-- CreateEnum
CREATE TYPE "EnumPlan" AS ENUM ('BASICS', 'PLUS', 'PREMIUM');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "nickname" TEXT,
    "role" "EnumRole" NOT NULL DEFAULT 'GUEST',
    "status" "EnumUserStatus" NOT NULL DEFAULT 'JOIN',
    "plan" "EnumPlan" NOT NULL DEFAULT 'BASICS',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
