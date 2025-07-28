// import './App.css'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './LandingPage/home/HomePage'
import PricingPage from './LandingPage/pricing/PricingPage'
import AboutPage from './LandingPage/abouts/AboutPage'
import SupportPage from './LandingPage/support/SupportPage'
import ProductPage from './LandingPage/products/ProductPage'
import SignupPage from './LandingPage/signup/SignupPage'
import LoginPage from './LandingPage/signup/LoginPage'
import Navbar from './LandingPage/Navbar'
import Footer from './LandingPage/Footer'
import ScrollToTop from './LandingPage/ScrollToTop'
import NotFound from './LandingPage/NotFound'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/abouts" element={<AboutPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App
