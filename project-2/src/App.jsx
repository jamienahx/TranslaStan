// src/App.jsx
import { useState, useEffect } from 'react';
import * as newsService from './services/newsService.js';
import NewsList from './components/NewsList/NewsList.jsx';
import TextHighlighter from './components/TextHighlighter/TextHighlighter.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx';
import {Routes, Route } from 'react-router-dom';
import ArticlePage from './components/ArticlePage/ArticlePage.jsx';
const App = () => {

  const [newsData, setNewsData] = useState([]);      
  const [displayedNews, setDisplayedNews] = useState([]);

  const fetchNews = async (query) => {
     const data = await newsService.getNews(query);
     const articles = data.articles || [];
     setDisplayedNews(articles);

  }

    useEffect(() => {
      fetchNews('k-pop'); 
  }, []);

  return (
  <>
 <h1>Kpop News</h1>
 <SearchBar onSearch={fetchNews}/>
 <NewsList articles={displayedNews} />
 <TextHighlighter/>
</>
 )

}

export default App
