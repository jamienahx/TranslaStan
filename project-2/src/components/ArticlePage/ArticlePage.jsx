// src/components/ArticlePage/ArticlePage.jsx
import { useParams } from 'react-router-dom';
import TextHighlighter from '../TextHighlighter/TextHighlighter';
import './ArticlePage.css';

const ArticlePage = (props) => {
  const { id } = useParams();
  const article = props.articles[parseInt(id)];

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div> <p className="instruction-text">
      Highlight any text to see its translation and save it!
    </p>
    <div className="article-card">
      <h2>{article.title}</h2>

      {/*image goes here */}
      <img 
      src ={article.urlToImage}
      alt = {article.title}
      />
      <p>{article.content || article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read original article
      </a>
      <TextHighlighter articleTitle={article.title} articleURL={article.url} />
    </div>
    </div>
  );
};

export default ArticlePage;
