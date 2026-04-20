import { getAllPesanan } from "@/lib/data"
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";
import { EditButton, DeleteButton } from "@/components/admin/button";

export default async function PesananTable() {
    const pesanan = await getAllPesanan();
    if (!pesanan?.length) return <p>No pesanan found</p>

    return (
        <div className="bg-white p-4 mt-5 shadow-sm">
            <table className="w-full divide-y divide-gray-200">
                <thead className="">
                    <tr>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Image</th>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Nama Pelanggan</th>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Alamat</th>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Nama Produk</th>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Harga</th>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Tanggal Sampai</th>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Total Harga</th>
                        <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {pesanan.map((pesanan) => (
                        <tr key={pesanan.id} className="hover:bg-gray-100">
                            <td className="px-6 py-4">
                                <div className="h-20 w-32 relative">
                                    <Image src={pesanan.produk.image} fill sizes="20vw" alt="produk image" className="object-cover" />
                                </div>
                            </td>
                            <td className="px-6 py-4 text-black">{pesanan.user.name}</td>
                            <td className="px-6 py-4 text-black">{pesanan.lokasi_pengiriman}</td>
                            <td className="px-6 py-4 text-black">{pesanan.produk.nama}</td>
                            <td className="px-6 py-4 text-black">{formatCurrency(pesanan.produk.harga)}</td>
                            <td className="px-6 py-4 text-black">{formatDate(pesanan.tanggal.toString())}</td>
                            <td className="px-6 py-4 text-black"><span>{formatCurrency(pesanan.produk.harga * pesanan.jumlah)}</span></td>
                            <td className="px-6 py-4 text-black">{pesanan.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}