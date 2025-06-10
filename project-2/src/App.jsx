// src/App.jsx
import { useState, useEffect } from 'react';
import * as newsService from './services/newsService.js';
import NewsList from './components/NewsList/NewsList.jsx';
import TextHighlighter from './components/TextHighlighter/TextHighlighter.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx';
import {Routes, Route } from 'react-router-dom';
import ArticlePage from './components/ArticlePage/ArticlePage.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import WordBank from './components/WordBank/WordBank.jsx';
import './app.css';


const App = () => {

  const [newsData, setNewsData] = useState([]);      
  const [displayedNews, setDisplayedNews] = useState([]);

  const fetchNews = async (query) => {
     const data = await newsService.getNews(query);
     const articles = data.articles || [];
     setDisplayedNews(articles); //a. fetched articles are stored in this state. 

  }

    useEffect(() => {
      fetchNews('k-pop'); 
  }, []);

  return (
  <>
  <NavBar/>
 <h1>Kpop News</h1>
 <SearchBar onSearch={fetchNews}/>
 <Routes>
  <Route path = "/" element = {<NewsList articles = {displayedNews}/>}/> {/*a. articles are passed down to newsList component */}
 <Route path = "/articles/:id" element = {<ArticlePage articles ={displayedNews}/>} />
 <Route path = "/word-bank" element = {<WordBank/>} />
 </Routes>
</>
 );

};

export default App
