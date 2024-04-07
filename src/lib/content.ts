const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return Promise.resolve(data.content);
  } catch (error) {
    return Promise.reject("<speak><s>There was an error</s></speak>");
  }
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
  //Note:- We can surely improve this function. But for now this is first thing that came in my mind.
  const isSSMLInvalid = !content.startsWith("<speak>");

  if (isSSMLInvalid) throw new Error("This is not valid ssml");

  const sentences: string[] = [];
  content.split("</s>").forEach((item) => {
    if (item.includes("<s>")) {
      sentences.push(item.slice(item.indexOf("<s>") + 3, item.length));
    }
  });

  return sentences;
};

export { fetchContent, parseContentIntoSentences };
