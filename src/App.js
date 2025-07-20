import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = process.env.REACT_APP_API_NINJAS_KEY;

  async function fetchQuote() {
  setIsLoading(true);
  try {
    const apiUrl = "https://api.api-ninjas.com/v1/quotes";
    let response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    setQuote(data[0].quote);
    setAuthor(data[0].author);
    setIsLoading(false);
  } catch (e) {
    console.error(e.message);
  }
}

  useEffect(() => {
    fetchQuote();
  }, []);

  let content = (
    <div className="content">
          <h1 className="quote">{`"${quote}"`}</h1>
          <h3 className="author">
            <em>{`- ${author}`}</em>
          </h3>
        </div>
  );

  let loader = (
    <div className="loader"></div>
  );

  return (
    <>
      <div className="background"></div>

      <div className="container">

        {isLoading ? loader : content}
        
        <button className="quote-btn" onClick={() => fetchQuote()}>New Quote</button>
      </div>
    </>
  );
}

export default App;
