import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Box, HStack } from "@chakra-ui/react";
import PromptToCss from "./components/PromptToCss";
import CodeEditor from "./components/CodeEditor";
import FileBar from "./components/FileBar";
import Output from "./components/Output";
import './App.scss'

export default function App() {
  const [files, setFiles] = useState([{language: "javascript", fileName:"index.js",value:""}])
  const [openFileIndex, setOpenFileIndex] = useState(0)
  const [editorValue, setEditorValue] = useState(files[openFileIndex].value);
  const [language, setLanguage] = useState(files[openFileIndex].language)
  const editorRef = useRef()

  return (
    <Box display={"flex"} minH="100vh" bg="#0f0a19" color="gray.500" pl={3} pr={6} py={8} gap={"15px"} >
      <FileBar files={files} setFiles={setFiles} setOpenFileIndex={setOpenFileIndex} openFileIndex={openFileIndex}/>
      <CodeEditor 
        value={editorValue}
        setValue={setEditorValue}
        language={language}
        setLanguage={setLanguage}
        files={files}
        setFiles={setFiles}
        openFileIndex={openFileIndex}
        key={openFileIndex}
        editorRef={editorRef} 
      />
    </Box>
    // <PromptToCss/>
  );
}

