/*
  Warnings:

  - You are about to drop the column `total` on the `Reservasi` table. All the data in the column will be lost.
  - Added the required column `jumlah` to the `Reservasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservasi" DROP COLUMN "total",
ADD COLUMN     "jumlah" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TotalHarga" (
    "id" TEXT NOT NULL,
    "reservasiId" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TotalHarga_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TotalHarga" ADD CONSTRAINT "TotalHarga_reservasiId_fkey" FOREIGN KEY ("reservasiId") REFERENCES "Reservasi"("id") ON DELETE CASCADE ON UPDATE CASCADE;
