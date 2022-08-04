import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title= this.props.category==="general"? "NewsPillar - Get your daily dose of news for free!" :  `${this.capitalizeFirstLetter(this.props.category)} - NewsPillar`;
  }

  async updateNews() {
    this.props.changeProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.changeProgress(30);
    let parsedData = await data.json();
    this.props.changeProgress(70);
    this.setState({
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      // page: this.state.page+1
    });
    this.props.changeProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    // this.setState({page: this.state.page+1});

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      article: this.state.article.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: this.state.page+1
    });
    // console.log(this.state.article.length);
    // console.log(this.state.totalResults);
  };

  render() {
    return (
      <>
        <h1 className="text-center my-4">{`NewsPillar - Top ${this.props.category!=="general"? this.capitalizeFirstLetter(this.props.category): ""} Headlines`}</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length%6 === 0}
          loader={<Spinner/>}
        >
          <div className="container">
              <div className="row">
                { this.state.article.map((element) => {
                  return (
                    <>
                      <div className="col-md-4" key={element.url}>
                        {/* {console.log(element.url)} */}
                        <NewsItem
                          title={element.title ? element.title : ""}
                          description={element.description ? element.description : ""}
                          imageUrl={element.urlToImage}
                          newsId={element.url}
                          author={element.author}
                          date={element.publishedAt}
                          source={element.source.name}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
          </div>
          
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
