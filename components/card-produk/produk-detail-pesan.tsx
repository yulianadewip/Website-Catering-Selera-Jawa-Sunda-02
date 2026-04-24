import Image from "next/image";
import { getProdukById } from "@/lib/data";
import { notFound } from "next/navigation";
import { IoCheckmark, IoPeopleOutline } from "react-icons/io5"
import { formatCurrency } from "@/lib/utils";
import FormPesan from "@/components/card-produk/form-pesan";

export default async function ProdukDetail({ id }: { id: string }) {
    const [produk] = await Promise.all([
        getProdukById(id),
    ])
    if (!produk) return notFound();

    return (
        <div className="max-w-7xl py-16 px-4 grid lg:grid-cols-12 gap-8 mx-auto">
            <div className="md:col-span-8">
                <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden rounded-lg">
                    <Image
                        src={produk.image}
                        alt={produk.nama}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
                <h1 className="text-5xl font-semibold text-gray-900 mb-8">{produk.nama}</h1>
                <p className="text-gray-700 leading-relaxed">{produk.deskripsi}</p>
                <p className="text-black font-semibold text-2xl leading-relaxed">Harga: {formatCurrency(produk.harga)}</p>
            </div>

            <div className="md:col-span-4">
                <div className="border-2 border-gray-300 border-dashed px-3 py-5 bg-slate-50 rounded-md">
                    {/* reservation form */}
                    <FormPesan produk={produk} />
                </div>
            </div>
        </div>
    )
}