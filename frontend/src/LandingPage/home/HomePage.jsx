import Hero from "./Hero";
import Stats from "./Stats";
import Education from "./Education";
import Awards from "./Awards";
import Pricing from "./Pricing";
import OpenAccount from "../OpenAccount";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
    </div>
  );
}
