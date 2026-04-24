-- CreateTable
CREATE TABLE "testimoni" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "komentar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testimoni_pkey" PRIMARY KEY ("id")
);
