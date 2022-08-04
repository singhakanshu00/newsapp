// import './App.css';

import React, { Component } from 'react'
import LoadingBar from 'react-top-loading-bar'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 6;
  state = {
    progress: 0
  }
  changeProgress = (progress) => {
    this.setState({ progress: progress });
  }
  apiKey = process.env.REACT_APP_NEWS_APP;
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path='/' element={<News apiKey={this.apiKey} changeProgress={this.changeProgress} key="general" pageSize={this.pageSize} country={"in"} category={"general"} />} />
            <Route exact path='/business' element={<News apiKey={this.apiKey} changeProgress={this.changeProgress} key="business" pageSize={this.pageSize} country={"in"} category={"business"} />} />
            <Route exact path='/entertainment' element={<News apiKey={this.apiKey} changeProgress={this.changeProgress} key="entertainment" pageSize={this.pageSize} country={"in"} category={"entertainment"} />} />
            <Route exact path='/health' element={<News apiKey={this.apiKey} changeProgress={this.changeProgress} key="health" pageSize={this.pageSize} country={"in"} category={"health"} />} />
            <Route exact path='/science' element={<News apiKey={this.apiKey} changeProgress={this.changeProgress} key="science" pageSize={this.pageSize} country={"in"} category={"science"} />} />
            <Route exact path='/sports' element={<News apiKey={this.apiKey} changeProgress={this.changeProgress} key="sports" pageSize={this.pageSize} country={"in"} category={"sports"} />} />
            <Route exact path='/technology' element={<News apiKey={this.apiKey} changeProgress={this.changeProgress} key="technology" pageSize={this.pageSize} country={"in"} category={"technology"} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
