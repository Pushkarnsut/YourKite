export default function Team() {
  return (
    <div className="container mb-5">
      <div className="row mt-5 p-3">
        <h2 className="text-center">Founder</h2>
      </div>
      <div className="row text-muted pb-5 mt-5">
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/Ownerphoto.png"
            alt="Founder"
            style={{ borderRadius: "100%", width: "200px",height: "200px",objectFit: "cover"}}
          />
          <h5 className="mt-4">Pushkar Aggarwal</h5>
          <h6>Founder & CEO</h6>
        </div>
        <div className="col-6 p-3 mt-3">
          <p>
            Pushkar bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on <a href="">Homepage</a> / <a href="">TradingQnA</a> / <a href="">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}
