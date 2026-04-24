import Image from "next/image";
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#8B2E1A] p-3">
            <div className="max-w-4xl mx-auto flex justify-center">
                <div className="flex-1 flex justify-center">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2063.348619530924!2d110.79923564563674!3d-7.515447859627345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a134e76f1c395%3A0xa7355b99d9467f44!2sWarung%20Sayur%20Mbak%20Eko!5e0!3m2!1sid!2sid!4v1777003132484!5m2!1sid!2sid" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-100 h-100 rounded-xl"></iframe>
                </div>
                <div className="flex-1 p-5 flex flex-col">
                    <div>
                        <Image src="/logo.jpg" alt="Logo" width={150} height={150} />
                    </div>
                    <div className="mt-2">
                        <h3 className="text-white">Jl. Krekot Jaya Molek Blok I No.11, RT.7/RW.02, Ps. Baru, Kecamatan Sawah Besar, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10710</h3>
                    </div>
                    <div className="mt-10">
                        <p className="text-white">089767856745</p>
                    </div>
                    <div className="mt-2">
                        <p>Follow us on</p>
                        <div className="flex space-x-4 mt-2">
                            <FaFacebook size={35} className="text-white hover:text-blue-500" />
                            <FaInstagram size={35} className="text-white hover:text-pink-500" />
                            <FaTwitter size={35} className="text-white hover:text-blue-500" />
                            <FaYoutube size={35} className="text-white hover:text-red-500" />
                        </div>
                        <p className="mt-4 text-white">© 2026 by Catering Selera Jawa Sunda</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}