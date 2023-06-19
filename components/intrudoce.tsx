import React from "react";
import { remark } from "remark";
import emoji from "remark-emoji";

export default function intrudoce() {
  return <div>这是什么</div>;
}



export const Phone = async function name() {
  const doc = "Emojis in this text will be replaced: :dog: :+1:";
  const processor = remark().use(emoji);
  const file = await processor.process(doc);
  console.log(String(file));
  return <div></div>;
};
