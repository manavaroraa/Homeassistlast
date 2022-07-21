import React, { createContext, useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

import portuguese from "../json/languages/pt.json";
import brazilianPortuguese from "../json/languages/pt-br.json";
import english from "../json/languages/en-us.json";

const LanguageContext = createContext({});

export function LanguageProvider({ children, ...rest }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [language, setLanguage] = useState("pt");
  const [lang, setLang] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = queryString.parse(location.search);
    // if (query.lang) {
    //   setLanguage(query.lang);
    // }
    switch (language) {
      case "pt":
        setLang(portuguese);
        break;
      case "pt-br":
        setLang(brazilianPortuguese);
        break;
      case "en":
        setLang(english);
        break;
      case "es":
        // setLang(spanish);
        break;
    }
  }, [location, language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        lang,
        isModalOpen,
        setLanguage,
        setLang,
        setIsModalOpen,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
