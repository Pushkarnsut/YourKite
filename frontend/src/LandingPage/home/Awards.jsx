export default function Awards() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <img src="media/images/largestBroker.svg"/>
        </div>
        <div className="col-6 mt-3">
          <h2>Largest stock broker in India</h2>
          <p>2+ million Zerodha clients contribute to over 15% of the retail order volumes in India by trading and Investing in</p>
          <div className="row mt-5">
            <div className="col-6">
              <ul>
                <li><p>Futures and Options</p></li>
                <li><p>Commodity Derivatives</p></li>
                <li><p>Currency Derivatives</p></li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li><p>Stock & IPOs</p></li>
                <li><p>Direct Mutual Fund</p></li>
                <li><p>Bonds & Govt.Securities</p></li>
              </ul>
            </div>
          </div>
          <img className="img-fluid" src="media/images/pressLogos.png" />
        </div>
      </div>
    </div>
  );
}
