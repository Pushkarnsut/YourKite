export default function Hero() {
  return (
    <div className="container-fluid mt-0" id="supportHero">
      <div className="pt-5" id="supportWrapper">
        <h4 style={{ color: "white" }}>Support Portal</h4>
        <a style={{ color: "white", textDecoration: "underline" }} href="">Track Tickets</a>
      </div>
      <div className="row mb-5 px-5">
        <div className="col-6 p-5" >
          <h4>Search for an answer or browse help topics to create a ticket</h4>
          <input placeholder="Eg: How do i activate my trading account ...." />
          <br />
          <a href="">Track account opening</a>
          <a className="px-4" href="">Track segment activation</a>
          <a className="" href="">Intraday margins</a>
          <a className="px-4" href="">Kite user manual</a>
        </div>
        <div className="col-6 p-5 d-flex flex-column justify-content-center align-items-center">
          <div>
            <h4>Features</h4>
          <ol>
            <li><a href="">Track account opening</a></li>
            <li><a href="">Track segment activation</a></li>
          </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
