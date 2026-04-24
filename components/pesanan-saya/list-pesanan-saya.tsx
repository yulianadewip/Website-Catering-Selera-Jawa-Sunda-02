import Image from "next/image";
import { getPesananByUserId } from "@/lib/data";
import { notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import Link from "next/link";

export default async function MyReserveList() {
    const pesanan = await getPesananByUserId();
    if (!pesanan) return <p>Tidak ada pesanan</p>;

    return (
        <div>
            {pesanan.map((item) => (
                <div className="bg-white shadow pb-4 mb-4 md:pb-0 relative" key={item.id}>
                    <div className="flex items-center justify-between bg-gray-100 px-2 py-1 rounded-t-sm">
                        <h1 className="text-sm font-medium text-gray-900 truncate">Pesanan ID: #{item.id}</h1>
                        <div className="flex gap-1 px-3 py-2 text-sm font-normal">
                            <span>Status:</span>
                            <span className="font-bold uppercase">{item.status}</span>
                        </div>
                    </div>

                    <div className="flex flex-col mb-4 items-start bg-white rounded-sm gap-2 md:flex-row md:w-full">
                        <div className="relative w-full md:w-1/3 aspect-[4/3]">
                            <Image
                                src={item.produk.image}
                                fill
                                className="object-cover rounded-t-sm md:rounded-none md:rounded-l-sm"
                                alt="Image Produk"
                            />
                        </div>

                        <div className="flex items-center p-5 gap-1 mb-3 font-normal w-full text-gray-700">
                            <div className="w-full">
                                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                                    <span>Nama Paket:</span>
                                    <span>{item.produk.nama}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                                    <span>Price:</span>
                                    <span>{formatCurrency(item.produk.harga)}</span>
                                </div>

                                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                                    <span>Tanggal Pemesanan:</span>
                                    <span>{formatDate(item.createdAt.toISOString())}</span>
                                </div>

                                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                                    <span>Tanggal Pengiriman:</span>
                                    <span>{formatDate(item.tanggal.toISOString())}</span>
                                </div>

                                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                                    <span>Jumlah Porsi:</span>
                                    <span>{item.jumlah}</span>
                                </div>

                                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                                    <span>Total Harga:</span>
                                    <span>{formatCurrency(item.produk.harga * item.jumlah)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}