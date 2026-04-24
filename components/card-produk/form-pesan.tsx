"use client";
import { useState, useActionState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { tambahReservasi } from "@/lib/action";
import clsx from "clsx";
import { Produk } from "@/app/generated/prisma/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { DisableDateProps } from "@/types/pesanan";
import DatePicker from "react-datepicker";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FormPesan({
    produk,
    disableDate = [], // ✅ default kosong
}: {
    produk: Produk,
    disableDate?: DisableDateProps[],
}) {
    const [jumlah, setJumlah] = useState(1);

    const [state, formAction, isPending] = useActionState(
        tambahReservasi,
        null
    );

    const { data: session } = useSession();

    if (!session) {
        return redirect("/signin");
    }

    const today = new Date();

    const minDate = new Date();
    minDate.setDate(today.getDate() + 3);

    const [tanggal, setTanggal] = useState<Date | null>(today);

    const excludeDates = disableDate.map(item => new Date(item.tanggal));

    const router = useRouter();
    useEffect(() => {
        if (state?.success) {
            router.push("/pesanan-saya");
        }
    }, [state, router]);
    return (
        <div>
            <form action={formAction}>
                {/* Hidden field untuk produkId */}
                <input type="hidden" name="produkId" value={produk.id} />

                {/* Field jumlah */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Jumlah</label>
                    <input
                        type="text"
                        name="jumlah"
                        value={jumlah}
                        onChange={(e) => setJumlah(Number(e.target.value))}
                        min="1"
                        className="py-2 px-4 rounded-md border border-gray-300 w-full"
                        placeholder="Jumlah"
                    />
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-red-500 text-sm mt-2">{state?.errors?.jumlah}</p>
                    </div>
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-red-500 text-sm mt-2">Minimal pemesanan 10 porsi</p>
                    </div>
                </div>

                {/* Field tanggal & jam */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Tanggal & Jam Pengiriman
                    </label>

                    <DatePicker
                        selected={tanggal}
                        onChange={(date: Date | null) => setTanggal(date)}
                        showTimeSelect
                        dateFormat="dd/MM/yyyy HH:mm:ss"
                        minDate={minDate}
                        excludeDates={excludeDates}
                        className="py-2 px-4 rounded-md border border-gray-300 w-full"
                    />

                    <input
                        type="hidden"
                        name="tanggal"
                        value={tanggal ? tanggal.toISOString() : ""}
                    />

                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-red-500 text-sm mt-2">
                            {state?.errors?.tanggal}
                        </p>
                    </div>
                </div>

                {/* Field email */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="py-2 px-4 rounded-md border border-gray-300 w-full"
                        placeholder="Email"
                        required
                    />
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-red-500 text-sm mt-2">{state?.errors?.email}</p>
                    </div>
                </div>

                {/* Field phone */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        className="py-2 px-4 rounded-md border border-gray-300 w-full"
                        placeholder="Phone Number"
                        required
                    />
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-red-500 text-sm mt-2">{state?.errors?.phone}</p>
                    </div>
                </div>

                {/* Field lokasi pengiriman */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Lokasi Pengiriman</label>
                    <input
                        type="text"
                        name="lokasi_pengiriman"
                        className="py-2 px-4 rounded-md border border-gray-300 w-full"
                        placeholder="Alamat lengkap"
                        required
                    />
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-red-500 text-sm mt-2">{state?.errors?.lokasi_pengiriman}</p>
                    </div>
                </div>

                {/* Field keterangan */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Keterangan</label>
                    <textarea
                        name="keterangan"
                        className="py-2 px-4 rounded-md border border-gray-300 w-full"
                        placeholder="Catatan tambahan..."
                        rows={3}
                    />
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-red-500 text-sm mt-2">{state?.errors?.keterangan}</p>
                    </div>
                </div>

                {/* Tampilkan error */}
                {state?.error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {state.error}
                    </div>
                )}

                {/* Tampilkan success*/}
                {state?.success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        Pesanan berhasil dibuat!
                    </div>
                )}

                <button
                    className={clsx("px-10 py-3 text-center font-semibold text-white w-full bg-red-600 rounded-sm cursor-pointer hover:bg-red-400", {
                        "opacity-50 cursor-progress": isPending,
                    })}
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? "Processing..." : "Buat Pesanan"}
                </button>
            </form>
        </div>
    );
}