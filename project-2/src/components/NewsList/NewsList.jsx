import { Link } from 'react-router-dom';
import './NewsList.css'; // Make sure this path is correct

const NewsList = (props) => {
  const articles = props.articles;

  if (!articles || articles.length === 0) {
    return <p>No news available</p>;
  }

  return (
    <div className="news-list">
      {articles.map((article, index) => (
        <div key={article.url || index} className="news-card">
          <h3>{article.title}</h3>


          {/*adding the image here */}
          {article.urlToImage && (

              <img 

              src = {article.urlToImage}
              alt={article.title}
          
              />


          )
          }





          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.url}
          </a>
          <div className="news-buttons">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
            </a>
            <Link to={`/articles/${index}`}>
              <button>Read More</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
