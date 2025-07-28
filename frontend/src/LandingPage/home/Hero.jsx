import {Link} from "react-router-dom";
export default function Hero() {
  return (
    <div className='container p-5 mb-5'>
      <div className='row text-center justify-content-center align-items-center'>
        <img className="mb-5" style={{ maxWidth: '80%', height: 'auto' }} src="media/images/homeHero.png" alt="Home Hero" />
        <h1 className="">Invest in everything</h1>
        <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
        <Link to="signup">
          <button className="mb-5 mt-4 py-2 px-4 btn btn-primary w-auto fs-5">Sign up for free</button>
        </Link>
      </div>
    </div>
  );
}
