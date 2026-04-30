import Header from "./components/Header";
import Hero from "./components/Hero";
import Programs from "./components/Programs";
import Facilities from "./components/Facilities";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Programs />
      <Facilities />
      <Testimonials />
      <Footer />
    </main>
  );
}
