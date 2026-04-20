import { getProduk } from "@/lib/data"
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";
import { EditButton, DeleteButton } from "@/components/admin/button";

export default async function ProdukTable() {
    const produk = await getProduk();
    if (!produk?.length) return <p>No produk found</p>

    return (
        <div className="bg-white p-4 mt-5 shadow-sm">
            <table className="w-full divide-y divide-gray-200">
                <thead className="">
                    <tr>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Image</th>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Nama Produk</th>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Deskripsi</th>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Harga</th>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Tanggal Dibuat</th>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase ">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {produk.map((produk) => (
                        <tr key={produk.id} className="hover:bg-gray-100">
                            <td className="px-6 py-4">
                                <div className="h-20 w-32 relative">
                                    <Image src={produk.image} fill sizes="20vw" alt="produk image" className="object-cover" />
                                </div>
                            </td>
                            <td className="px-6 py-4 text-black">{produk.nama}</td>
                            <td className="px-6 py-4 text-black">{produk.deskripsi}</td>
                            <td className="px-6 py-4 text-black">{formatCurrency(produk.harga)}</td>
                            <td className="px-6 py-4 text-black">{formatDate(produk.createdAt.toString())}</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-center gap-1">
                                    <EditButton id={produk.id} />
                                    <DeleteButton id={produk.id} image={produk.image} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}