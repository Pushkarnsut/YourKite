import {Link} from "react-router-dom";

export default function Universe() {
  return (
    <div className="container mb-5">
      <div className="row text-center ">
        <h2 className="text-muted">The Zerodha Universe</h2>
        <p className="mt-3">Extend your trading and investment experience even further with our partner platforms</p>
        <div className="col-4 mt-5">
          <img style={{ width: "50%" }} src="media/images/zerodhaFundhouse.png" alt="" />
          <p className="text-muted text-small mt-4">Invest in a diversified portfolio of stocks with Fund House</p>
        </div>
        <div className="col-4 mt-5">
          <img style={{ width: "70%" }} className="pb-2" src="media/images/sensibullLogo.svg" alt="" />
          <p className="text-muted text-small mt-4">Invest in a diversified portfolio of stocks with Sensibull</p>
        </div>
        <div className="col-4 mt-4 pt-3">
          <img style={{ width: "55%" }} className="" src="media/images/goldenpiLogo.png" alt="" />
          <p className="text-muted text-small mt-4">Invest in a diversified portfolio of stocks with GoldenPi</p>
        </div>
        <div className="col-4 mt-5">
          <img style={{ width: "50%" }} src="media/images/streakLogo.png" alt="" />
          <p className="text-muted text-small mt-4">Invest in a diversified portfolio of stocks with Streak</p>
        </div>
        <div className="col-4 mt-5 pt-1">
          <img src="media/images/smallcaseLogo.png" alt="" />
          <p className="text-muted text-small mt-4">Invest in a diversified portfolio of stocks with Smallcase</p>
        </div>
        <div className="col-4 mt-5">
          <img style={{ width: "40%" }} src="media/images/dittoLogo.png" alt="" />
          <p className="text-muted text-small mt-4">Invest in a diversified portfolio of stocks with Ditto</p>
        </div>
        <div className="justify-content-center align-items-center">
          <Link to="/signup">
            <button className="mb-5 mt-5 py-2 px-4 btn btn-primary w-auto fs-5">Sign up for free</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
