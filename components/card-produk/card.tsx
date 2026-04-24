import { Produk } from "@/app/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function Card({ produk }: { produk: Produk }) {
    return (
        <div className="bg-white shadow-lg rounded-sm transition duration-100 hover:shadow-sm">
            <div className="h-[260px] w-auto rounded-t-sm relative">
                <Image src={produk.image} width={384} height={256} alt="room image" className="w-full h-full object-cover rounded-t-sm"></Image>
            </div>
            <div className="p-8">
                <h4 className="text-2xl font-medium">
                    <Link href={`/produk/${produk.id}`} className="hover:text-gray-800 transition duration-150">{produk.nama}</Link>
                </h4>
                <h4 className="text-2xl">
                    <span className="font-semibold text-gray-600">{formatCurrency(produk.harga)}</span>
                    <span className="text-gray-400 text-sm">/Porsi</span>
                </h4>
                <h4 className="my-3">{produk.deskripsi}</h4>
                <div className="flex items-center justify-between">
                    <Link href={`/produk/${produk.id}`} className="px-6 *:py-2.5 md:px-10 md:py-3 font-semibold text-white bg-red-400 rounded-sm hover:bg-red-500 transition duration-150 cursor-pointer">Order Sekarang</Link>
                </div>
            </div>
        </div>
    );
}