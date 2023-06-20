import React from "react";
import { saveAs } from "file-saver";
import Docxtemplater from "docxtemplater";

const GenerateDocument = () => {
  const generateDocx = () => {
    const templateFileUrl = "./Coding.docx"; // 替换为你的模板文件路径或URL

    fetch(templateFileUrl)
      .then((response) => response.arrayBuffer())
      .then((templateArrayBuffer) => {
        const buffer = new Uint8Array(templateArrayBuffer);
        const doc = new Docxtemplater();
        doc.loadZip(buffer);

        const data = {
          // 在这里提供用于替换模板中占位符的数据
          title: "示例文档",
        };

        doc.setData(data);
        doc.render();

        const generatedDocxUint8Array = doc
          .getZip()
          .generate({ type: "uint8array" });
        const blob = new Blob([generatedDocxUint8Array], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        saveAs(blob, "generated.docx");
      })
      .catch((error) => {
        console.error("Error generating docx:", error);
      });
  };

  return (
    <div>
      <button onClick={generateDocx}>生成文档</button>
    </div>
  );
};

export default GenerateDocument;
