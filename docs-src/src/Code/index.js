import React from 'react';

import prettier from 'prettier/standalone';
import parser from 'prettier/parser-babylon';
import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage ('jsx', jsx);

const Code = ({code, language = 'javascript'}) => (
  <SyntaxHighlighter language={language} style={atomDark} showLineNumbers>
    {language === 'javascript'
      ? prettier.format (code, {plugins: [parser]})
      : code}
  </SyntaxHighlighter>
);

export default Code;
