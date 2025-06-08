import { useEffect, useState } from 'react';
import {saveTranslation} from '../../services/airtableService';

const TranslationPopup = (props) => {
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Use default values if props.sourceLang or props.targetLang are not provided
  const sourceLang = props.sourceLang || 'en';
  const targetLang = props.targetLang || 'ko';

  useEffect(() => {
    if (!props.text) return; //text received from parent. if none, end.

    const translate = async () => {
      setLoading(true);
      try {
        const encodedText = encodeURIComponent(props.text); //the highlighted text from Texthighlighter
        const res = await fetch(`https://lingva.ml/api/v1/${sourceLang}/${targetLang}/${encodedText}`); //fetch the KR translation from the highlighted text
        const data = await res.json();
        setTranslatedText(data.translation);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedText('Translation failed');
      } finally {
        setLoading(false);
      }
    };

    translate();  //call the translate function
  }, [props.text, sourceLang, targetLang]); //the moment any one value changes, run translate


const handleSave = async () => {

    if (!props.text || !translatedText) return; //no selected or returned text

    setSaveStatus('Saving...');

    try {
        await saveTranslation(props.articleTitle || 'Untitled', 
                                props.text, 
                                translatedText,
                                props.articleURL || 'https://example.com'
        );
        setSaveStatus('Saved');
    }catch (err) {

        console.error('Save failed', err);
        setSaveStatus('Failed to save');
    }
};

  if (!props.text || !props.position) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: props.position.top + 20,
        left: props.position.left,
        background: 'yellow',
        padding: '10px',
        borderRadius: '6px',
        maxWidth: '300px',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      <button onClick={props.onClose} style={{ float: 'right' }}>✖</button>
      <p><b>Original:</b> {props.text}</p>
      <p><b>Translated:</b> {loading ? 'Translating...' : translatedText}</p>
      <button onClick = {handleSave}>Save</button>
      {saveStatus && <p>{saveStatus}</p>}
    </div>
  );
};

export default TranslationPopup;
