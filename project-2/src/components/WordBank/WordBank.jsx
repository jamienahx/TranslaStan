// src/components/WordBank/WordBank.jsx
import { useEffect, useState } from 'react';
import { fetchTranslations, deleteTranslation, updateComment} from '../../services/airtableService'; 
import './WordBank.css';

const WordBank = () => {
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');  //in case translation fails
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs]= useState({});
  

  useEffect(() => {
    const loadTranslations = async () => {
      setLoading(true);
      const data = await fetchTranslations();
      setTranslations(data);    //stores the fetched translations into the 'translations' state
      setLoading(false);
      
      const initialComments = {};  //empty object first
      data.forEach((record)=> {   //loops through each translation record
        initialComments[record.id] = record.fields['Comment']|| "";  //each record will be set with record ID which is the key and the value is the comment, if no comment then blank
        
      } );
      setComments(initialComments);    
      setCommentInputs({});  //make sure the comment box is empty
    };

    loadTranslations();
  }, []);

  if (loading) {
    return <p>Loading translations...</p>;
  }

  if (translations.length === 0) {
    return <p>No translations found.</p>;
  }

//grouping functionality --> reduce will transform the array of translations into a grouped object 
const groupedTranslations = translations.reduce((groups,record)=> {


  const title = record.fields['Article Title']||'Untitled Article';   //gets the article title

  if(!groups[title]) {  //if the title hasn't appeared before  create  a new array
    groups[title] = [];
  }
  groups[title].push(record); //adds the current record into the correct group 
  return groups;

}, {})




  const handleDelete = async (recordId) => {

    const result = await deleteTranslation(recordId);
    if(result) {
      setTranslations((prev)=>prev.filter((record)=>record.id!==recordId));
      setErrorMessage('');
    } else {

      setErrorMessage('Failed to delete');
    }

  };

  //comments related

  const handleCommentInputChange = (recordId, value) => {
    setCommentInputs((prev)=> ({
      ...prev,
      [recordId]: value,
    }));
  };

  const handleCommentSave = async (recordId) => {
    const comment = commentInputs[recordId];
    const result = await updateComment(recordId, comment);
    if (!result) {
      setErrorMessage('Failed to save comment.');
      } else {
        setErrorMessage('');
        //clear the comments 
        setComments((prev)=> ({...prev,
          [recordId]: comment,
        }));

        setCommentInputs((prev) => ({
          ...prev,
          [recordId]: '',
        }));
      }
  };


  return (
    <div className="wordbank-container">
      <h2>Saved Translations</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/*grouped by articles, wrap  the whole rendering with this. took the groupedtranslations object and converted it to an array of key-value.
      Each article group gets its own div*/ }

      {Object.entries(groupedTranslations).map(([articleTitle,records]) => (
        
      <div key = {articleTitle} className = "article-group"> 
      <h3>Title: {articleTitle}</h3>
      {/*error message for failed deletions */}
     <ul className="translation-list">
        {/*change the mapping to records because previously it is looping through ALL translations. records loops thru the current article group*/}
        {records.map((record) => (
          <li key={record.id} className="translation-item">
            {/*removed the titles header from here because it is already showing upstairs*/}
            <p><strong>Original:</strong> {record.fields['Original Text']}</p>
            <p><strong>Translated:</strong> {record.fields['Translated Text']}</p>
            <a href={record.fields['Article URL']} target="_blank" rel="noopener noreferrer">
              View Original Article
            </a>
            
              {/*field for updating comments */}
              <div className="comment-section">
              {comments[record.id] && (
                <p><strong>Saved Comment:</strong>{comments[record.id]}</p>  

              )}
              <textarea 

              value = {commentInputs[record.id] || ''}
              onChange={(event) => handleCommentInputChange(record.id,event.target.value)}
              placeholder = "Add a comment..."
                className="comment-textarea"
               />
               {/*button goes here*/}
               <button 
               onClick = {() => handleCommentSave(record.id)}
               style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                cursor: 'pointer',
                marginTop: '5px'
        }}
          >Save Comment</button>
          </div>
          <br />
            <button
              onClick={() => handleDelete(record.id)}
              style={{
                backgroundColor: '#ff4d4d',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Delete Entry
            </button>
          </li>
        ))}
      </ul>
    </div>
  ))}
  {/*grouped by article ends*/}
  </div>
  );
};

export default WordBank;
