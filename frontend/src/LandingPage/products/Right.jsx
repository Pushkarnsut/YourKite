export default function Right({url,topic,description,link1}) {
  return (
    <div className="container mt-5">
      <div className="row mt-5">
        <div className="col-5 mt-5 p-5">
          <h2 className="text-muted mt-4">{topic}</h2>
          <p className="text-muted mt-4">{description} </p>
          <div className="mt-4">
            <a href="#">{link1}</a>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col-6">
          <img style={{ width: "100%" }} className="" src={url} alt="" />
        </div>
      </div>
    </div>
  );
}
