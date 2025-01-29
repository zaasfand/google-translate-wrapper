function GoogleTranslate(apiKey) {
    if (!apiKey) {
      throw new Error("Google API Key is required");
    }
    this.apiKey = apiKey;
    this.apiUrl = "https://translation.googleapis.com/language/translate/v2";
  }
  
  GoogleTranslate.prototype.translate = async function (text, sourceLang, targetLang) {
    // Validation to ensure required parameters are passed
    if (!text || !sourceLang || !targetLang) {
      throw new Error("Text, Source and Target languages are required");
    }
  
    try {
      // Create the URL with query parameters
      const url = new URL(this.apiUrl);
      const params = {
        q: text,
        source: sourceLang,
        target: targetLang,
        key: this.apiKey,
      };
  
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
      // Use fetch to make the request
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Check if response structure is valid
      if (data && data.data && data.data.translations) {
        return data.data.translations[0].translatedText;
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      // Enhanced error handling
      throw new Error(error.message || "Translation failed");
    }
  };
  
  module.exports = GoogleTranslate;
  