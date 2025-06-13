// src/App.jsx
import { useState, useEffect } from 'react';
import * as newsService from './services/newsService.js';
import NewsList from './components/NewsList/NewsList.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import {Routes, Route } from 'react-router-dom';
import ArticlePage from './components/ArticlePage/ArticlePage.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import WordBank from './components/WordBank/WordBank.jsx';
import './app.css';


const App = () => {

        
  const [displayedNews, setDisplayedNews] = useState([]);
  //this will be for lifting state. searchterm is now inside APP not searchbar.
  const [searchTerm, setSearchTerm] = useState (' ');


  const fetchNews = async (query) => { //takes the parameter 'query' whenever it is run.
     const data = await newsService.getNews(query); //ALL info in the fetch. 
     const articles = data.articles || []; //check for articles property.
     setDisplayedNews(articles); //a. fetched articles are stored in this state. 
     setSearchTerm(query); //lifting state is here. search term is lifted from searchbar to app. fetchnews gets called.

  }

    useEffect(() => {
      fetchNews('k-pop');  //the default search term that is called on page load
  }, []);


  return (
  <>
  <NavBar/>
 <h1>TranslaStan!</h1>
 <Routes>
  <Route path = "/" 
  element = {
  <>
  <SearchBar onSearch={fetchNews}/> {/*moved search bar into Routes so that it only appears in the homepage */}
  {searchTerm && (
    <p> Showing search results for <strong>{searchTerm}</strong></p>
  )} {/*lifted state gets shown here*/}
  <NewsList articles = {displayedNews} /> {/*a. articles are passed down to newsList component */}
  </>
  }
  />
 <Route path = "/articles/:id" element = {<ArticlePage articles ={displayedNews}/>} />
 <Route path = "/word-bank" element = {<WordBank/>} />
 </Routes>
</>
 );

};

export default App
