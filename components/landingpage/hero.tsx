import Image from "next/image"
import Link from "next/link"

export default function Hero() {
    return (
        <div className="relative h-screen text-white overflow-hidden">
            <div className="absolute inset-0">
                {/* baground besar */}
                <Image src="/hero2.jpg" alt="Hero Image" fill className="object-cover object-center w-full h-full"></Image>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <div className="relative flex flex-col h-full items-center justify-center text-center px-20">
                <h1 className="text-7xl font-bold leading-tight mt-20 mb-3 capitalize">Catering Idaman</h1>
                <p className="text-xl text-gray-300 mb-8">Nikmati hidangan lezat dengan harga terjangkau</p>
                <div className="flex gap-5">
                    <Link href="/produk" className="bg-red-600 text-white hover:bg-red-400 transition-colors duration-300 px-6 py-2.5 rounded-lg md:px-10 text-lg font-semibold hover:scale-105 hover:shadow-lg">Pesan Sekarang</Link>
                </div>
            </div>
        </div>
    )
}