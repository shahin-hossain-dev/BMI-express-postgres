-- CreateEnum
CREATE TYPE "Role" AS ENUM ('patient', 'doctor', 'admin');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'patient',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
