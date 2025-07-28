import Hero from "./Hero";
import Left from "./Left";
import Right from "./Right";
import Universe from "./Universe";
import Footer from "../Footer";
import Navbar from "../Navbar";
export default function ProductPage() {
  return (
    <div className="ProductPage">
        <Hero />
        <Left url="media/images/kite.png" topic="Kite"
        description="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices." link1="Try Demo" link2="Learn More" link3="#" link4="#" />

        <Right url="media/images/console.png" topic="Console"
        description="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations." link1="Learn more"/>

        <Left url="media/images/coin.png" topic="Coin"
        description="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices." link1="Coin" link2="" link3="#" link4="#" />

        <Right url="media/images/kiteconnect.png" topic="Kite Connect API"
        description="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase." link1="Kite connect"/>

        <Left url="media/images/varsity.png" topic="Varsity mobile"
        description="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go." link1="Try Demo" link2="" link3="#" link4="#" />

        <h4 className="text-muted text-center mt-5 py-5 mb-5">Want to know more about our technology stack? Check out the Zerodha.tech blog.</h4>
        <Universe />
    </div>
  );
}
