import React from "react";

export const HtmlRenderer = ({ html }) => (
  <div dangerouslySetInnerHTML={{ __html: html }} />
);


