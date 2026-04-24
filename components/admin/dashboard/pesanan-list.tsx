import { getAllPesanan } from "@/lib/data"
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default async function PesananTable() {
    const pesanan = await getAllPesanan();
    if (!pesanan?.length) return <p>No pesanan found</p>

    // 🔥 Pisahkan data
    const pesananAktif = pesanan.filter(p => p.status !== "Dibatalkan" && p.status !== "Selesai");
    const pesananDibatalkan = pesanan.filter(p => p.status === "Dibatalkan");
    const pesananSelesai = pesanan.filter(p => p.status === "Selesai");

    return (
        <>
            {/* ===================== TABEL UTAMA ===================== */}
            <div className="bg-white p-4 mt-5 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Pesanan Aktif</h2>
                <table className="w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Image</th>
                            <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Nama Pelanggan</th>
                            <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Alamat</th>
                            <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Nama Produk</th>
                            <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Harga</th>
                            <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Tanggal Pengiriman</th>
                            <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Total Harga</th>
                            <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Status</th>
                            <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {pesananAktif.map((pesanan) => (
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
                                <td className="px-6 py-4 text-black">
                                    {formatCurrency(pesanan.produk.harga * pesanan.jumlah)}
                                </td>
                                <td className="px-6 py-4 text-black">{pesanan.status}</td>
                                <td className="px-4 py-3 text-center">
                                    <Link
                                        href={`/admin/dashboard/${pesanan.id}`}
                                        className="px-4 py-2 rounded-md text-xs font-semibold text-white bg-[#193F7A] hover:bg-blue-600"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ===================== TABEL DIBATALKAN ===================== */}
            {pesananDibatalkan.length > 0 && (
                <div className="bg-white p-4 mt-8 shadow-sm">
                    <h2 className="text-lg font-semibold mb-3 text-red-500">Pesanan Dibatalkan & Selesai</h2>
                    <table className="w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Image</th>
                                <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Nama Pelanggan</th>
                                <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Alamat</th>
                                <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Nama Produk</th>
                                <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Harga</th>
                                <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Tanggal Pengiriman</th>
                                <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Total Harga</th>
                                <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Status</th>
                                <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {[...pesananDibatalkan, ...pesananSelesai].map((pesanan) => (
                                <tr key={pesanan.id} className="bg-gray-50">
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
                                    <td className="px-6 py-4 text-black">
                                        {formatCurrency(pesanan.produk.harga * pesanan.jumlah)}
                                    </td>
                                    <td className="px-6 py-4 text-red-500 font-semibold">{pesanan.status}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="px-4 py-2 text-xs font-semibold text-white bg-gray-400 rounded-md cursor-not-allowed">
                                            Edit
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}