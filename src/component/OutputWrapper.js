import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import languages from "../languages.json";

const OutputWrapper = ({ translatetext, setTranslateText, setLanguage,selectoutput,setSelectOutput }) => {
  const [dropdown, setDropDown] = useState(false);
  const msg = new SpeechSynthesisUtterance();
  const speechHandler = (msg) => {
    msg.text = translatetext.value;
    window.speechSynthesis.speak(msg);
  };
  const handleSelect = (event) => {
    if (event.target.tagName === "LI") {
      setDropDown(false);
      setSelectOutput(event.target.textContent);
      languages.map((el) => {
        if (el.name === event.target.textContent) {
          setLanguage(el.code);
        }
        return null;
      });
    }
  };

  return (
    <div className="card output-wrapper">
      <div className="to">
        <span className="heading">To: </span>
        <div
          className={
            dropdown ? "dropdown-container active" : "dropdown-container"
          }
          id="output-language"
        >
          <div
            className="dropdown-toggle"
            onClick={() => setDropDown(!dropdown)}
          >
            <i className="bi bi-globe2"></i>
            <span className="selected">
              {selectoutput ? selectoutput : "select lang"}
            </span>
            <i className="bi bi-caret-down-fill"></i>
          </div>
          <ul className="dropdown-menu" onClick={(e) => handleSelect(e)}>
            {languages.map((language) => (
              <li
                key={language.code}
                className={
                  selectoutput.includes(language.name) ? "active" : ""
                }
              >
                {language.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-area">
        <textarea
          id="output-text"
          cols={30}
          rows={10}
          placeholder="translated text here..."
          value={translatetext.value}
          onChange={() => {}}
        ></textarea>
        <div className="chars">
          <div className="icons">
            <CopyToClipboard
              text={translatetext.value}
              onCopy={() =>
                setTranslateText({
                  ...translatetext,
                  copied: true,
                })
              }
            >
              <span>
                {translatetext.copied && translatetext.value ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <i className="bi bi-copy"></i>
                )}{" "}
              </span>
            </CopyToClipboard>
            <span onClick={() => speechHandler(msg)}>
              <i className="bi bi-volume-up"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputWrapper;
