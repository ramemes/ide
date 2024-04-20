import React, { useRef, useState, useEffect } from "react";
import { Box, HStack, Button, Text } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import { changeVerticalHeight } from "../utils";

const CodeEditor = ({
  editorRef,
  openFileIndex,
  files,
  setFiles,
  value,
  setValue,
  language,
  setLanguage
}) => {
  const [editorHeight, setEditorHeight] = useState(600);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // const onSelect = (language) => {
  //   setLanguage(language);
  //   setValue(CODE_SNIPPETS[language]);
  // };

  const handleSave = () => {
    setFiles((files) => {
      const updatedFiles = [...files];
      updatedFiles[openFileIndex].value = value;
      return updatedFiles;
    });
  };

  return (
    <HStack width={"100%"} alignItems={"start"}>
      {/* <LanguageSelector language={language} onSelect={onSelect} /> */}
      <Box width={"50%"}>
        <Text mb={2} fontSize="lg">Code</Text>
        <Editor
          className="editor"
          height={editorHeight}
          theme="vs-dark"
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={onMount}
          value={value}
          onChange={(value) => setValue(value)}
        />
        <div
          className="drag-editor"
          onMouseDown={(e) =>
            changeVerticalHeight(e, editorHeight, setEditorHeight)
          }
          style={{ cursor: "ns-resize" }}
        ></div>
        <Button variant="outline" colorScheme="gray" onClick={handleSave}>
          Save Code
        </Button>
      </Box>

      <Output editorRef={editorRef} language={language}/>

    </HStack>
  );
};

export default CodeEditor;
