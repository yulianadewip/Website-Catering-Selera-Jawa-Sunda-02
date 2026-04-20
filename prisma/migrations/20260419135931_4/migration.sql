-- CreateTable
CREATE TABLE "Reservasi" (
    "id" TEXT NOT NULL,
    "produkId" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservasi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservasi" ADD CONSTRAINT "Reservasi_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE CASCADE ON UPDATE CASCADE;
