import React, { useState, useEffect } from "react";
import InputWrapper from "./component/InputWrapper";
import OutputWrapper from "./component/OutputWrapper";
import ToggleSwitch from "./component/ToggleSwitch";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./App.css";

function App() {
  const [mode, setMode] = useState(false);
  const [typedtext, setTypedText] = useState({ value: "", copied: false });
  const [translatetext, setTranslateText] = useState({
    value: "",
    copied: false,
  });
  const [selectinput,setSelectInput]=useState('English');
  const [selectoutput,setSelectOutput]=useState('')
  const [language, setLanguage] = useState("");
  const [typelang, setTypelang] = useState("en-US");
  useEffect(() => {
    if (typedtext.value && language) {
      const fetchDate = () => {
        axios
          .get(
            `https://api.mymemory.translated.net/get?q=${typedtext.value}!&langpair=${typelang}|${language}`
          )
          .then((res) => {
            if (res.data.responseData.translatedText) {
              setTranslateText({
                value: res.data.responseData.translatedText,
                copied: false,
              });
            } else {
              setTranslateText({
                value: "try new sentences",
                copied: false,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const settime = setTimeout(() => {
        fetchDate();
      }, 500);

      return () => clearTimeout(settime);
    }

    if (!typedtext.value.length) {
      setTranslateText({ value: "", copied: false });
    }
  }, [typedtext.value, language, typelang]);

  const hanldeSwap = () => {
    let typeData=typedtext.value;
    let translateData=translatetext.value;
    let input=selectinput;
    let output=selectoutput;
    let inputCode=typelang;
    let outputCode=language;
    setTypelang(outputCode);
    setLanguage(inputCode)
    setSelectInput(output);
    setSelectOutput(input)
    setTypedText({...typedtext,value:translateData})
    setTranslateText({...translatetext,value:typeData})
  };
  return (
    <div className={mode ? "body dark" : "body"}>
      <div className="container">
        <InputWrapper
          typedtext={typedtext}
          setTypedText={setTypedText}
          setTypelang={setTypelang}
          selectinput={selectinput}
          setSelectInput={setSelectInput}
        />
        <div className="center">
          <div
            className="swap-position"
            onClick={() => {
              hanldeSwap();
            }}
          >
            <i className="bi bi-arrow-left-right"></i>
          </div>
        </div>
        <OutputWrapper
          translatetext={translatetext}
          setTranslateText={setTranslateText}
          setLanguage={setLanguage}
          selectoutput={selectoutput}
          setSelectOutput={setSelectOutput}
        />
      </div>
      <div className="mode">
        <ToggleSwitch mode={mode} setMode={setMode} />
      </div>
    </div>
  );
}

export default App;
