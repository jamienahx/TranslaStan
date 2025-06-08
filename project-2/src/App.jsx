// src/App.jsx
import { useState, useEffect } from 'react';
import * as newsService from './services/newsService.js';
import NewsList from './components/NewsList/NewsList.jsx';
import TextHighlighter from './components/TextHighlighter/TextHighlighter.jsx'

const App = () => {

  const [newsData, setNewsData] = useState([]);      
  const [displayedNews, setDisplayedNews] = useState([]);

    useEffect(() => {
    async function fetchNews() {  //function to fetch news
      const data = await newsService.getNews();
      const articles = data.articles || [];
      setNewsData(articles); //updated with fetched data
      setDisplayedNews(articles); //updated with fetched data
    }
    fetchNews(); //immediately call the function
  }, []);

  return (
  <>
 <h1>Kpop News</h1>
 <NewsList articles={displayedNews} />
 <TextHighlighter/>
</>
 )

}

export default App
