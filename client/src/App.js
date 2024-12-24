import React, { useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import "./style.css";

const App = () => {
  const [markdownText, setMarkdownText] = useState("");
  const [htmlPreview, setHtmlPreview] = useState("");

  const convertMarkdown = async () => {
    try {
      const response = await axios.post("http://localhost:5000/convert", {
        markdownText,
      });
      const sanitizedHtml = DOMPurify.sanitize(response.data.html);
      setHtmlPreview(sanitizedHtml);
    } catch (error) {
      console.error("Error converting markdown : ", error);
    }
  };

  const onInputChange = (e) => {
    const input = e.target.value;
    setMarkdownText(input); // 상태 업데이트
    convertMarkdown(input); // 입력 즉시 변환 요청
  };

  return (
    <div className="app">
      <h1>Markdown to HTML Converter</h1>
      <textarea
        placeholder="Enter Markdown..."
        value={markdownText}
        onChange={onInputChange}
      />
      <div className="preview">
        <h2>HTML Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: htmlPreview }}></div>
      </div>
    </div>
  );
};

export default App;
