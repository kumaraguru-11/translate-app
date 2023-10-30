import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import languages from "../languages.json";

const InputWrapper = ({ typedtext, setTypedText, setTypelang,selectinput,setSelectInput}) => {
  const [dropdown, setDropDown] = useState(false);
  const msg = new SpeechSynthesisUtterance();

  const speechHandler = (msg) => {
    msg.text = typedtext.value;
    window.speechSynthesis.speak(msg);
  };

  const handleSelect = (event) => {
    if (event.target.tagName === "LI") {
      setDropDown(false);
      setSelectInput(event.target.textContent);
      languages.map((el) => {
        if (el.name === event.target.textContent) {
          setTypelang(el.code);
        }
        if(el.code!==selectinput){
          setTypedText({value:"",copied:false})
        }
        return null;
      });
    }
  };

  const handleTypedText = (e) => {
    const inputValue = e.target.value;
    const capitalizedValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setTypedText({value: capitalizedValue, copied: false});
  };

  return (
    <div className="card input-wrapper">
      <div className="from">
        <span className="heading">From: </span>
        <div
          className={
            dropdown ? "dropdown-container active" : "dropdown-container"
          }
          id="input-language"
        >
          <div
            className="dropdown-toggle"
            onClick={() => setDropDown(!dropdown)}
          >
            <i className="bi bi-globe2"></i>
            <span> {selectinput ? selectinput : "English"}</span>
            <i className="bi bi-caret-down-fill"></i>
          </div>
          <ul className="dropdown-menu" onClick={(e) => handleSelect(e)}>
            {languages.map((language) => (
              <li
                key={language.code}
                className={
                  selectinput.includes(language.name) ? "active" : ""
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
          id="input-text"
          cols={30}
          rows={10}
          placeholder="Enter your text here "
          value={typedtext.value}
          maxLength={300}
          onChange={(e) => handleTypedText(e)}
        ></textarea>
        <div className="chars">
          <div className="icons">
            <CopyToClipboard
              text={typedtext.value}
              onCopy={() => setTypedText({...typedtext, copied: true })}
            >
              <span>
                {typedtext.copied && typedtext.value ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <i className="bi bi-copy"></i>
                )}
              </span>
            </CopyToClipboard>
            <span onClick={() => speechHandler(msg)}>
              <i className="bi bi-volume-up"></i>
            </span>
          </div>
          {typedtext.value.length > 0 ? `${typedtext.value.length}` : 0}/ 300
        </div>
      </div>
    </div>
  );
};

export default InputWrapper;
