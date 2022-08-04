import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsId, author, date, source } =
      this.props;
    return (
      <div className="mx-4 my-4">
        <div className="card">
          <div>
              <span
                className=" badge rounded-pill bg-danger"
                style={{ display: "flex", position: "absolute", right: "0" }}
              >
                {source}
              </span>
          </div>
          <div style={{ height: "200px" }}>
            <img
              src={
                imageUrl
                  ? imageUrl
                  : "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png"
              }
              className="card-img-top"
              style={{ maxHeight: "100%" }}
              alt="..."
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-success">
                By {author ? author : "Unkown"} on
                {" "+new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsId}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
