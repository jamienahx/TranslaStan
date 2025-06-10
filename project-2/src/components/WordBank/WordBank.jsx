// src/components/WordBank/WordBank.jsx
import { useEffect, useState } from 'react';
import { fetchTranslations } from '../../services/airtableService';

const WordBank = () => {
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h2>Saved Translations</h2>
      <ul>
        {translations.map((record) => (
          <li key={record.id}>
            <p><strong>Article Title:</strong> {record.fields['Article Title']}</p>
            <p><strong>Original:</strong> {record.fields['Original Text']}</p>
            <p><strong>Translated:</strong> {record.fields['Translated Text']}</p>
            <a href={record.fields['Article URL']} target="_blank" rel="noopener noreferrer">
              View Article
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordBank;