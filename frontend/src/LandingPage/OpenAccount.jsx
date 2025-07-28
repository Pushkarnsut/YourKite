import {Link} from "react-router-dom";
export default function OpenAccount() {
  return (
    <div className='container pt-5 mb-5 '>
      <div className='row text-center justify-content-center align-items-center'>
        <h2 className="mt-5">Open a Zerodha account</h2>
        <p className="mt-3">Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
        <Link to="/signup">
          <button className="mb-5 mt-4 py-2 px-4 btn btn-primary w-auto fs-5">Sign up for free</button>
        </Link>
      </div>
    </div>
  );
}