import { useEffect, useState } from 'react';
import TranslationPopup from '../TranslationPopup/TranslationPopup.jsx';

const TextHighlighter = (props) => {
  const [selectedText, setSelectedText] = useState('');
  const [popupPosition, setPopupPosition] = useState(null);

  useEffect(() => {
    const handleMouseUp = (event) => {
      const selection = window.getSelection();
      const text = selection.toString().trim();

      if (text) {
        const rect = selection.getRangeAt(0).getBoundingClientRect();
        setSelectedText(text);
        setPopupPosition({
          top: rect.top + 30,
          left: rect.left + 10,
        });
      } else {
        setSelectedText('');
        setPopupPosition(null);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const closePopup = () => {
    setSelectedText('');
    setPopupPosition(null);
  };

  return (
    <>
      {selectedText && popupPosition && (
        <TranslationPopup
            text={selectedText}
  position={popupPosition}
  articleTitle={props.articleTitle}
  articleURL={props.articleURL}
  onClose={closePopup}
        />
      )}
    </>
  );
};

export default TextHighlighter;
