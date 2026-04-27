import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Team from "./components/Team";
import Programs from "./components/Programs";
import Facilities from "./components/Facilities";
import Admissions from "./components/Admissions";
import News from "./components/News";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Team />
      <Programs />
      <Facilities />
      <Admissions />
      <News />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
