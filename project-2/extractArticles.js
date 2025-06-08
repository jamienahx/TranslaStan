const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const fs = require('fs').promises;

async function fetchAndSaveArticles() {
  const apiKey = 'YOUR_NEWSAPI_KEY';
  const url = `https://newsapi.org/v2/everything?q=k-pop&apiKey=${apiKey}`;

  const res = await axios.get(url);
  const articles = res.data.articles;
  const fullArticles = [];

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    try {
      const htmlRes = await axios.get(article.url);
      const dom = new JSDOM(htmlRes.data, { url: article.url });
      const reader = new Readability(dom.window.document);
      const parsed = reader.parse();

      if (parsed && parsed.textContent) {
        fullArticles.push({
          id: `article_${i}`,
          title: article.title,
          description: article.description,
          url: article.url,
          full_text: parsed.textContent,
        });
        console.log(`Parsed article ${i}`);
      }
    } catch (e) {
      console.error(`Failed for article ${i}: ${e.message}`);
    }
  }

  await fs.writeFile('articles.json', JSON.stringify(fullArticles, null, 2), 'utf8');
  console.log('Saved all articles to articles.json');
}

fetchAndSaveArticles();
