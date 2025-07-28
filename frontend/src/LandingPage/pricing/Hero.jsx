export default function Hero() {
  return (
    <div className="container">
      <div className="row text-center mt-5 p-5 mb-5">
        <h1 style={{color: '#424242'}}>Charges</h1>
        <h4 className="text-muted">List of all charges and taxes</h4>
      </div>
      <div className="row mt-5  text-center">
        <div className="col-4 py-5">
          <img src="media/images/pricingEquity.svg" alt="" />
          <h2 style={{color: '#424242'}}>Free equity delivery</h2>
          <p className="text-muted">All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
        </div>
        <div className="col-4 py-5">
          <img src="media/images/intradayTrades.svg" alt="" />
          <h2 style={{color: '#424242'}}>Intraday and F&O trades</h2>
          <p className="text-muted">Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
        </div>
        <div className="col-4 py-5">
          <img src="media/images/pricingMF.svg" alt="" />
          <h2 style={{color: '#424242'}}>Free direct MF</h2>
          <p className="text-muted">All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
        </div>
      </div>
    </div>
  );
}
