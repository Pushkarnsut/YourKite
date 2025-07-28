export default function Left({url,topic,description,link1,link2,link3,link4}) {
  return (
    <div className="container mt-5">
      <div className="row mt-5">
        <div className="col-6">
          <img className="" src={url} alt="" />
        </div>
        <div className="col-1"></div>
        <div className="col-5 mt-5 px-5">
          <h2 className="text-muted">{topic}</h2>
          <p className="text-muted mt-4">{description} </p>
          <div className="mt-4">
            <a href="#">{link1}</a>
            <a style={{ marginLeft: "15%" }} href="#">{link2}</a>
          </div>
          <div className="mt-4">
          <a href={link3}><img src="media/images/appstoreBadge.svg" alt="" /></a>
          <a href={link4}><img src="media/images/googlePlayBadge.svg" alt="" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
