export default function Pricing() {
  return (
    <div className="container mt-5 pb-5">
      <div className="row">
        <div className="col-4">
          <h2 className="mb-3">Unbeatable pricing</h2>
          <p className="text-muted">We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
          <a href="">See Pricing</a>
        </div>
        <div className="col-2"></div>
        <div className="col-6">
          <div className="row text-center mt-3">
            <div className="col p-4 border">
              <h2>₹0</h2>
              <p>Free equity delivery and direct mutual funds</p>
            </div>
            <div className="col p-4 border">
              <h2>₹20</h2>
              <p className="">Intraday and F&O</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
