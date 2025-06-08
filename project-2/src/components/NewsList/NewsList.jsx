import {Link} from 'react-router-dom'

const NewsList = (props) => {
//check if there are any articles fetched . if no articles in props or article length is 0.

if(!props.articles || props.articles.length===0) {

 return<p>No news available</p>

}

return (

    <ul>
        {props.articles.map((article,index) => (

            <li key = {article.url || index}>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href = {article.url} target = "_blank" rel="noopener noreferrer">
                {article.url}
                </a>
                {' '}
                <Link to = {`/articles/${index}`}>
                <button>Read More</button>
                </Link>
            </li>

        ))}

    </ul>


);

};

export default NewsList;