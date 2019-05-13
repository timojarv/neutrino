import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/html';
import 'brace/theme/textmate';

const CodeEditor = props => (
    <AceEditor
        mode="html"
        theme="textmate"
        fontSize={14}
        showPrintMargin={false}
        showGutter={false}
        highlightActiveLine={false}
        setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: false,
            tabSize: 2
        }}
        {...props}
    />
);

export default CodeEditor;
