import MyReserveList from "@/components/pesanan-saya/list-pesanan-saya"
import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Pesanan Saya",
    description: "Pesanan Saya",
}

export default async function PesananSaya() {
    const session = await auth();
    if (!session || !session.user || !session.user.id) redirect("/signin");

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto mt-10 py-20 px-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl text-gray-800 mt-2">Hi, {session.user.name}</h3>
                        <p className="mt-1 font-medium mb-4">Berikut adalah riwayat pesanan Anda</p>
                    </div>
                </div>

                <div className="rounded-sm">
                    <MyReserveList />
                </div>
            </div>
        </div>
    )
}