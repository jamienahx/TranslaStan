const API_KEY = '';
const BASE_URL = `https://newsapi.org/v2/everything?q=k-pop&language=en&apiKey=${API_KEY}`;


const getNews = async () => {
  try {
    const res = await fetch(BASE_URL);
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