// src/components/WordBank/WordBank.jsx
import { useEffect, useState } from 'react';
import { fetchTranslations, deleteTranslation} from '../../services/airtableService'; 

const WordBank = () => {
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadTranslations = async () => {
      setLoading(true);
      const data = await fetchTranslations();
      setTranslations(data);
      setLoading(false);
    };

    loadTranslations();
  }, []);

  if (loading) {
    return <p>Loading translations...</p>;
  }

  if (translations.length === 0) {
    return <p>No translations found.</p>;
  }

  const handleDelete = async (recordID) => {

    const result = await deleteTranslation(recordID);
    if(result) {
      setTranslations((prev)=>prev.filter((record)=>record.id!==recordID));
      setErrorMessage('');
    } else {

      setErrorMessage('Failed to delete');
    }



  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Saved Translations</h2>
      {errorMessage && (
      <p style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</p>
    )}   {/*error message for failed deletions */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {translations.map((record) => (
          <li key={record.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <p><strong>Article Title:</strong> {record.fields['Article Title']}</p>
            <p><strong>Original:</strong> {record.fields['Original Text']}</p>
            <p><strong>Translated:</strong> {record.fields['Translated Text']}</p>
            <a href={record.fields['Article URL']} target="_blank" rel="noopener noreferrer">
              View Article
            </a>
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
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordBank;
