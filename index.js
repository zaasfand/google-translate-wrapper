const axios = require("axios");

class GoogleTranslate {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error("Google API Key is required");
    }
    this.apiKey = apiKey;
    this.apiUrl = "https://translation.googleapis.com/language/translate/v2";
  }

  async translate(text, sourceLang, targetLang) {
    if (!text) {
      throw new Error("Text is required for translation");
    }
    if (!sourceLang || !targetLang) {
      throw new Error("Source and Target languages are required");
    }

    try {
      const response = await axios.post(this.apiUrl, null, {
        params: {
          q: text,
          source: sourceLang,
          target: targetLang,
          key: this.apiKey,
        },
      });

      return response.data.data.translations[0].translatedText;
    } catch (error) {
      throw new Error(
        (error.response && error.response.data && error.response.data.error && error.response.data.error.message) || "Translation failed"
      );
    }
  }
}

module.exports = GoogleTranslate;
