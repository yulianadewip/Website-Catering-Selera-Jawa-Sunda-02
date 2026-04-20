/*
  Warnings:

  - Added the required column `email` to the `Pesanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi_pengiriman` to the `Pesanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Pesanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Pesanan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pesanan" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "lokasi_pengiriman" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'preorder',
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
