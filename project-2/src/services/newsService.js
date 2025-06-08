const API_KEY = ' ';
const BASE_URL = `https://newsapi.org/v2/everything?language=en&apiKey=${API_KEY}`;


const getNews = async (query) => {
  try {
    const url = `${BASE_URL}&q=${encodeURIComponent(query)}`
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch news');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching news:', err);
    return {articles: []}; 
  }
};


export {getNews}