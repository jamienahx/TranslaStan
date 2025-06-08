import { useParams } from 'react-router-dom';
import TextHighlighter from '../TextHighlighter/TextHighlighter';

const ArticlePage = ({articles}) => {

    const {id} = useParams();
    const article = articles[parseInt(id)];

    if (!article) {
      return <p>Article not found</p>
    }


  return (
    <>
      <h2>{article.title}</h2>
      <p>{article.content || article.description}</p>

      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read original article
      </a>
      {/*Pass this into texthighlighter */}
      <TextHighlighter articleTitle={article.title} articleURL={article.url} /> 
       </>
  );
 
  };
export default ArticlePage;