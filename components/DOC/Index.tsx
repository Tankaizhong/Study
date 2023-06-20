import React, { useEffect, useRef } from "react";
import { docx } from "html-docx-js";

const DocxViewer = () => {
  const docxFileUrl = "./Coding.docx";
  const docxContentRef = useRef(null);

  useEffect(() => {
    fetch(docxFileUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const content = docx(arrayBuffer);
        docxContentRef.current.innerHTML = content;
      })
      .catch((error) => {
        console.error("Error fetching or converting .docx file:", error);
      });
  }, [docxFileUrl]);

  return (
    <div>
      <div ref={docxContentRef}></div>
    </div>
  );
};

export default DocxViewer;
