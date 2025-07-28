export default function Stats() {
  return (
    <div className="container py-5 mt-5">
      <div className="row mt-5 ">
        <div className="col-6 mt-5">
          <h2 className="mb-5">Trust with confidence</h2>
          <h4>Customer-first always</h4>
          <p className="mb-4 text-muted">
            That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.
          </p>
          <h4>No spam or gimmicks</h4>
          <p className="mb-4 text-muted">No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.
          </p>
          <h4>The Zerodha Universe</h4>
          <p className="mb-4 text-muted">
            Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.
          </p>
          <h4>Do better with Money</h4>
          <p className="mb-4 text-muted">
            With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.
          </p>
        </div>
        <div className="col-6">
          <img className="img-fluid" src="media/images/ecosystem.png" alt="" />
          <div className="d-flex justify-content-center align-items-center ">
            <a className="mx-5" href="">Explore our Products</a>
            <a href="">Try Kit demo</a>
          </div>
        </div>
      </div>
    </div>
  );
}
