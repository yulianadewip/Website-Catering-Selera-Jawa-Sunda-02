/*
  Warnings:

  - You are about to drop the `Reservasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TotalHarga` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reservasi" DROP CONSTRAINT "Reservasi_produkId_fkey";

-- DropForeignKey
ALTER TABLE "TotalHarga" DROP CONSTRAINT "TotalHarga_reservasiId_fkey";

-- DropTable
DROP TABLE "Reservasi";

-- DropTable
DROP TABLE "TotalHarga";

-- CreateTable
CREATE TABLE "Pesanan" (
    "id" TEXT NOT NULL,
    "produkId" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pesanan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE CASCADE ON UPDATE CASCADE;
