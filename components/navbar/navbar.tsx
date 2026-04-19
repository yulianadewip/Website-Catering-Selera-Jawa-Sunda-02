import Link from "next/link";
import Image from "next/image";
import Navlink from "@/components/navbar/navlink";

export default function Navbar() {
    return (
        <div className="fixed top-0 w-full bg-white shadow-sm z-20">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
                <Link href="/">
                    <Image src="/logo.jpg" alt="Logo" width={200} height={100} priority/>
                </Link>
                <Navlink/>
            </div>
        </div>
    )
}