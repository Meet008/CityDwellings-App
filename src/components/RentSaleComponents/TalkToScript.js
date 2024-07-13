import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const TawkToScript = ({ propertyId, chatId }) => {
  useEffect(() => {
    console.log("its mounted");
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${chatId}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      console.log("its not mounted");
      document.body.removeChild(script);
    };
  }, [propertyId, chatId]);

  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      const existingScript = document.querySelector(
        `script[src="https://embed.tawk.to/${propertyId}/${chatId}"]`
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [propertyId, chatId]);

  return null;
};

export default TawkToScript;
