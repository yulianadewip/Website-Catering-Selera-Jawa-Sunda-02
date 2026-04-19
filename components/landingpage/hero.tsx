import Image from "next/image"
import Link from "next/link"

export default function Hero() {
    return (
        <div className="relative h-screen text-white overflow-hidden">
            <div className="absolute inset-0">
                <Image src="/hero.jpg" alt="Hero Image" fill className="object-cover object-center w-full h-full"></Image>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <div className="relative flex flex-col h-full text-left px-20">
                <p className="mt-50 text-xl text-gray-300 leading-tight">About Us</p>
                <h1 className="text-7xl font-bold leading-tight mb-3 capitalize">The Perfect <br />Base For Your Room</h1>
                <p className="text-xl text-gray-300 mb-8">Enjoy exclusive deals, premium facilities, and the best prices when you book today</p>
                <div className="flex gap-5">
                    <Link href="/room" className="bg-red-600 text-white hover:bg-red-400 transition-colors duration-300 px-6 py-2.5 rounded-lg md:px-10 text-lg font-semibold hover:scale-105 hover:shadow-lg">Book Now</Link>
                    <Link href="/contact" className="bg-transparent border border-red-600 text-white hover:bg-red-600 transition-colors duration-300 px-6 py-2.5 rounded-lg md:px-10 text-lg font-semibold hover:scale-105 hover:shadow-lg">Contact Us</Link>
                </div>
            </div>
        </div>
    )
}