import ProdukMainCard from "@/components/card-produk/main-card";
import Hero from "@/components/landingpage/hero";
import Footer from "@/components/navbar/footer";

export default function Home() {
  return (
    <div>
      <Hero/>
      <ProdukMainCard/>
      <Footer /> 
    </div>
  );
}
