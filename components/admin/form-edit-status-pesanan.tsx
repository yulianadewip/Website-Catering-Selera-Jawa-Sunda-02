"use client";

import clsx from "clsx";
import Link from "next/link";
import { useActionState } from "react";
import { validasiStatusPesanan } from "@/lib/action";
import { Pesanan } from "@/app/generated/prisma/client";

export default function FormValidasiSkripsi({
    id,
    pesanan
}: {
    id: string;
    pesanan: Pesanan;
}) {

    const [state, formAction, isPending] =
        useActionState(validasiStatusPesanan.bind(null, id), null);

    return (
        <div className="bg-white shadow-md rounded-sm border border-gray-200 overflow-hidden">

            <form action={formAction}>

                {/* HEADER */}
                <div className="bg-[#193F7A] text-white px-2 py-2">
                    <h1 className="text-xl font-semibold">
                        Detail Pesanan
                    </h1>
                </div>

                {/* VALIDASI */}
                <div className="p-4 border-t space-y-3">

                    <label className="text-lg font-semibold">
                        Status Pesanan
                    </label>

                    <select
                        name="status"
                        defaultValue={pesanan.status}
                        className="bg-blue-100 border border-blue-300 rounded-lg w-full p-2.5"
                    >
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                    </select>

                    <p className="text-red-500 text-sm">
                        {state?.errors?.status}
                    </p>

                    {state?.message && (
                        <div className="bg-red-100 p-2 rounded text-red-600">
                            {state.message}
                        </div>
                    )}

                </div>

                {/* BUTTON */}
                <div className="flex gap-3 p-4 border-t">

                    <Link
                        href="/prodi/validasi"
                        className="bg-gray-500 hover:bg-gray-600 text-white w-full py-2.5 text-center font-semibold rounded-md"
                    >
                        Kembali
                    </Link>

                    <button
                        type="submit"
                        disabled={isPending}
                        className={clsx(
                            "bg-blue-600 hover:bg-blue-700 text-white w-full py-2.5 font-semibold rounded-md",
                            { "opacity-50 cursor-progress": isPending }
                        )}
                    >
                        {isPending ? "Proses..." : "Simpan Status"}
                    </button>

                </div>

            </form>
        </div>
    );
}