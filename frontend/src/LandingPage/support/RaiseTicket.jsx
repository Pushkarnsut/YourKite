export default function RaiseTicket() {
  return (
    <div className="container mb-5 mt-5">
      <div className="row">
        <h4 className="text-muted">To create a ticket, select a relevant topic</h4>
      </div>
      <div className="row mt-5 ">
        <div className="col-4 " style={{lineHeight: "2"}}>
          <h5><i class="fa fa-plus-circle" aria-hidden="true"></i> Account Opening</h5>
            <a href="">Resident individual</a>
            <br />
            <a href="">Minor</a>
            <br />
            <a href="">Non Resident Indian (NRI)</a>
            <br />
            <a href="">Company, Partnership, HUF and LLP</a>
            <br />
            <a href="">Glossary</a>
        </div>
        <div className="col-4" style={{lineHeight: "2"}}>
          <h5><i class="fa-regular fa-user"></i> Your Zerodha Account</h5>
            <a href="">Your Profile</a>
            <br />
            <a href="">Account modification</a>
            <br />
            <a href="">Client Master Report (CMR) and Depository Participant (DP)</a>
            <br />
            <a href="">Nomination</a>
            <br />
            <a href="">Transfer and conversion of securities</a>
        </div>
        <div className="col-4 px-5" style={{lineHeight: "2"}}>
          <h5><i class="fa-solid fa-chart-simple"></i> Kite</h5>
            <a href="">IPO</a>
            <br />
            <a href="">Trading FAQs</a>
            <br />
            <a href="">Margin Trading Facility (MTF) and Margins</a>
            <br />
            <a href="">Charts and orders</a>
            <br />
            <a href="">Alerts and Nudges</a>
            <br />
            <a href="">General</a>
        </div>
      </div>
      <div className="row mt-5 ">
        <div className="col-4  mb-5" style={{lineHeight: "2"}}>
          <h5><i class="fa-solid fa-wallet"></i> Funds</h5>
            <a href="">Add money</a>
            <br />
            <a href="">Withdraw money</a>
            <br />
            <a href="">Add bank accounts</a>
            <br />
            <a href="">eMandates</a>
        </div>
        <div className="col-4 mb-5" style={{lineHeight: "2"}}>
          <h5><i class="fa-solid fa-terminal"></i> Console</h5>
            <a href="">Portfolio</a>
            <br />
            <a href="">Corporate actions</a>
            <br />
            <a href="">Funds statement</a>
            <br />
            <a href="">Reports</a>
            <br />
            <a href="">Profile</a>
            <br />
            <a href="">Segments</a>
        </div>
        <div className="col-4 mb-5 px-5" style={{lineHeight: "2"}}>
          <h5><i class="fa-solid fa-coins"></i> Coin</h5>
            <a href="">Mutual funds</a>
            <br />
            <a href="">National Pension Scheme (NPS)</a>
            <br />
            <a href="">Features on Coin</a>
            <br />
            <a href="">Payments and Orders</a>
            <br />
            <a href="">General</a>
        </div>
      </div>
    </div>
  );
}
