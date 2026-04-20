import { Suspense } from "react";
import ProdukEditForm from "@/components/admin/form-edit-produk";
import { getProdukById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function ProdukEditPage(
    { params }: {
        params: Promise<{ id: string }>
    }
) {
    const id = (await params).id;
    const produk = await getProdukById(id);

    if (!produk) {
        notFound();
    }

    return (
        <div className="max-w-7xl px-4 py-20 mt-10 mx-auto">
            <Suspense fallback={<div>Loading...</div>}>
                <ProdukEditForm id={id} produk={produk} />
            </Suspense>
        </div>
    )
}