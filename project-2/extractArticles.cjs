const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const fs = require('fs').promises;

async function fetchAndSaveArticles() {
  const apiKey = 'e7b2681a806a4d48a4a10e3c9b78c83f'; // 🔁 Replace with your real API key
  const url = `https://newsapi.org/v2/everything?q=k-pop&apiKey=${apiKey}`;

  try {
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
          console.log(`✅ Parsed article ${i}`);
        }
      } catch (err) {
        console.error(`❌ Failed to parse article ${i}: ${err.message}`);
      }
    }

    await fs.writeFile('articles.json', JSON.stringify(fullArticles, null, 2), 'utf8');
    console.log('✅ All articles saved to articles.json');
  } catch (err) {
    console.error('❌ Failed to fetch articles from NewsAPI:', err.message);
  }
}

fetchAndSaveArticles();
