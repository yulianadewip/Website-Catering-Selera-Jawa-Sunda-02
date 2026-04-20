import { Suspense } from "react";
import ProdukDetail from "@/components/card-produk/produk-detail-pesan";

export default async function ProdukDetailPage(
    { params }: {
        params: Promise<{ id: string }>
    }
) {
    const id = (await params).id;

    return (
        <div className="mt-16">
            <Suspense fallback={<div>Loading...</div>}>
                <ProdukDetail id={id} />
            </Suspense>
        </div>
    )
}