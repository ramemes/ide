import { Box, Text, Button, useToast } from '@chakra-ui/react'
import React, {useState} from 'react'
import { executeCode } from '../api'

import { changeVerticalHeight } from '../utils'


const Output = ({editorRef, language}) => {
  const toast = useToast()
  const [editorHeight, setEditorHeight] = useState(600)
  
  const [output, setOutput] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if(!sourceCode) return;
    try {
      setIsLoading(true)
      const {run:result} = await executeCode(language, sourceCode)
      setOutput(result.output.split("\n"))
      result.stderr ? setIsError(true) : setIsError(false)
    } catch (error) {
      console.log(error)
      toast({
        title:"An error occurred.",
        description: error.message || "Unable to run code",
        status:"error",
        duration:6000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box width={"50%"}>
      <Text mb={2} fontSize="lg">Output</Text>
      <Box
        height={editorHeight}
        p={2}
        color={
          isError ? "red.400" : "gray.200"
        }
        border="1px solid"
        borderRadius={4}
        borderColor={
          isError ? "red.500" : "#333"
        }>

        {output ? 
          output.map((line, index) => {
              return (
                <Text key={index}>{line}</Text>
              )
            })
          
        : `Click "Run Code" to see the output here`}


        {/* {
          output ? output : `Click "Run Code" to see the output here`
        } */}
      </Box>
      <div 
    className="drag-editor"
    onMouseDown={(e) => changeVerticalHeight(e,editorHeight, setEditorHeight)}
    style={{ cursor: 'ns-resize' }}
    ></div>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
        >
          Run Code
      </Button>

    </Box>
  )
}

export default Output