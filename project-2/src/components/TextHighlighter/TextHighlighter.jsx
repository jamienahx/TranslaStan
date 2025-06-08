//state for storing text and popup posn
//useeffect for setting up the event listener on the whole page. Trigger some function when the user mouses up 
import {useEffect, useState} from 'react';

const TextHighlighter = () => {
const [selectedText, setSelectedText] = useState('');
const [popupPosition, setPopupPosition] = useState(null);


useEffect(()=> {
    const handleMouseUp=(event) =>{
    const selection = window.getSelection();  //get what user selected
    const text = selection.toString().trim();   //convert everything to plain text with no html, no formatting no bold, italics
    if (text) {
        setSelectedText(text);
        const rect = selection.getRangeAt(0).getBoundingClientRect(); //getrangeat(0) to get the selected range, so that the popup posn can be determined.
        setPopupPosition ({
            top: rect.top,
            left: rect.left,
            });
        }else {
            setSelectedText('');
            setPopupPosition(null);
        }
    };
    document.addEventListener('mouseup', handleMouseUp);
    return() => {
        document.removeEventListener('mouseup', handleMouseUp);
    };
}, []);

    return (
  <>
    {selectedText && popupPosition && (
      <div style={{ position: 'absolute', top: popupPosition.top, left: popupPosition.left, background: 'yellow' }}>
        You have highlighted: {selectedText}
      </div>
    )}
  </>
)
};

export default TextHighlighter;