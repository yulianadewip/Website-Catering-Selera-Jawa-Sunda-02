import { getTotalPesanan, getTotalPendapatan, totalPesananDibatalkan, totalPesananSelesai } from "@/lib/data";
import {formatCurrency} from "@/lib/utils";

export default async function CardDashboard() {
    return (
        <div className="flex flex-col lg:flex-row gap-4 mt-5">
            <div className="flex-1 bg-white rounded shadow p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Pesanan</h2>
                <p className="text-3xl font-bold text-indigo-600">{await getTotalPesanan()}</p>
            </div>

            <div className="flex-1 bg-white rounded shadow p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Pendapatan</h2>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(await getTotalPendapatan())}</p>
            </div>

            <div className="flex-1 bg-white rounded shadow p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Pesanan Dibatalkan</h2>
                <p className="text-3xl font-bold text-red-600">{await totalPesananDibatalkan()}</p>
            </div>

            <div className="flex-1 bg-white rounded shadow p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Pesanan Selesai</h2>
                <p className="text-3xl font-bold text-green-600">{await totalPesananSelesai()}</p>
            </div>
        </div>
    );
}