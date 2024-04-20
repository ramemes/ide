import React, {useState, useRef, useEffect} from 'react';
import { Box, VStack, Tabs, TabList, Tab, Button, Input, Text} from '@chakra-ui/react';
import FileMenu from './FileMenu';
import { LANGUAGE_MAP } from '../constants';



const useOutsideClick = (ref, callback) => {
    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback()
        }
      }
      document.addEventListener('mousedown', handleOutsideClick)
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick)
      }
    }, [ref, callback])
}


const FileBar = ({files, setFiles, setOpenFileIndex, openFileIndex}) => {
  const [fileMenuOpen, setFileMenuOpen] = useState(false)
  const [addingFile, setAddingFile] = useState(false)
  const [editingFileIndex, setEditingFileIndex] = useState(null)
  const [position, setPosition] = useState(null)
  const [fileName, setFileName] = useState("")
  const wrapperRef = useRef(null)


  const handleOpenFileMenu = (e, index) => {
    e.preventDefault()
    setPosition({x:e.clientX, y:e.clientY})
    setEditingFileIndex(index)
    setFileMenuOpen(true)
  }

  useOutsideClick(wrapperRef, ()=> setFileMenuOpen(false))

  const handleAddFile = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      if (e.keyCode === 13) {
        const fileEnding = fileName.split(".")[1]
        setFiles((files) => {
          return [...files, {language: LANGUAGE_MAP[fileEnding],fileName:fileName, value:""}]
        })
        setOpenFileIndex(files.length-1)
      }
      setAddingFile(false)
      setFileName("")
    }
  }

  const handleRenameFile = (e) => {

  }

  const handleDeleteFile = (e) => {
    setOpenFileIndex(() => {
      return editingFileIndex-1 >= 0 ? editingFileIndex - 1 : 0
    })
    setFiles((files) => {
      return files.filter((file,index) => index !== editingFileIndex)
    })
 
    setFileMenuOpen(false)
  }

  
  const handleBlur = (e) => {
    setAddingFile(false)
    setFileName("")

  }

  return (
    <VStack minWidth={"150px"} maxWidth={"170px"}display={"flex"} alignItems={"start"} overflow={"clip"}>
      <Tabs orientation='vertical' display={"flex"} flexDirection={"column"} >
        <TabList display={"flex"} alignItems={"start"} justifyContent={"center"} >
          {files.map((file,index) => {
            return (
              <Tab    
              key={file.fileName} 
              onContextMenu={(e) => handleOpenFileMenu(e,index)}
              onClick={()=>setOpenFileIndex(index)}
              >{file.fileName}
              </Tab>
            )
          })}

        </TabList>
        {addingFile ? 
            <Input
            alignSelf={"self-start"}
            maxWidth={"140px"}
            ml={"20px"}
            // ref={inputRef}
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            onKeyDown={handleAddFile}
            onBlur={handleBlur}
            autoFocus
            />
          : 
            <Button maxWidth={"140px"} ml={"20px"} mt={"5px"} onClick={() => setAddingFile(true)}>Add File</Button>
          }
      </Tabs>
      {fileMenuOpen ? 
        <VStack 
        borderRadius={5}
        position={"absolute"} 
        zIndex={3}
        left={position.x}
        top={position.y}
        bg={"gray.800"} 
        mb={4} 
        ml={2} 
        ref={wrapperRef} 
        autoFocus
        >
          <Button width={"85%"} m={2} bg={"gray.500"} fontSize="lg" onClick={handleRenameFile}>
            Rename
          </Button>
          <Button width={"85%"} mb={2} bg={"gray.500"} fontSize="lg" onClick={handleDeleteFile}>
            Delete
          </Button>
        </VStack>
      : null}
    </VStack>
  )

}

export default FileBar