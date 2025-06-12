const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = 'krtranslations';
const AIRTABLE_API_TOKEN = import.meta.env.VITE_AIRTABLE_API_TOKEN ;

const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

const headers = {
  Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
  'Content-Type': 'application/json',
};

export async function saveTranslation(articleTitle, originalText, translatedText, articleURL) {
  const body = {
    fields: {
      'Article Title': articleTitle,
      'Original Text': originalText,
      'Translated Text': translatedText,
      'Article URL' : articleURL,
    },
  };

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to save translation');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error saving translation', error);
    return null;
  }
}

//fetching translations

export async function fetchTranslations() {
  try {
    const response = await fetch(BASE_URL, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch translations');
    }

    const data = await response.json();
    return data.records; // Airtable returns an array of "records"
  } catch (error) {
    console.error('Error fetching translations', error);
    return [];
  }
}

//deletion function

export async function deleteTranslation(recordId) {
  try {
    const response = await fetch(`${BASE_URL}/${recordId}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to delete translation');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting translation', error);
    return null;
  }
}

//update with comments

export async function updateComment (recordId, comment) {
const body = {

  fields : { 
    'Comment': comment,

  },
};

try {
  const response = await fetch (`${BASE_URL}/${recordId}`, {

    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  });

  if(!response.ok) {
    throw new Error('Failed to update comment')
  }
  return await response.json();
} catch (error) {
  console.error('Error updating comment', error);
  return null;
}
}
