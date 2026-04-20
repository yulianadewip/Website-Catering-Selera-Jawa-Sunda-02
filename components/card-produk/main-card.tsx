import Card from "@/components/card-produk/card";
import { getProduk } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function MainCard() {
    const produk = await getProduk();

    if(!produk) return notFound();
    return (
        <div className="max-w-7xl py-6 pb-20 px-4 mx-auto">
            <div className="grid gap-7 md:grid-cols-3">
                {produk.map((produk) => (
                    <Card key={produk.id} produk={produk} />
                ))}
            </div>
        </div>

    );
}