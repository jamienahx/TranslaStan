const AIRTABLE_BASE_ID = ' '
const AIRTABLE_TABLE_NAME = 'krtranslations'
const AIRTABLE_API_TOKEN = ' '

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