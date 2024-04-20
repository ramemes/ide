import fs from 'fs'
import { useState, useEffect } from 'react'
import parse from 'html-react-parser';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:"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", 
  dangerouslyAllowBrowser: true 
});

 
export default function PromptToCss(props) {
  const [promptInput, setPromptInput] = useState("")
  const [completions, setCompletions] = useState([])
  const [createdComponents, setCreatedComponents] = useState("")
  

  function looseJsonParse(htmlStr) {
    const parser = new DOMParser()
    const document = parser.parseFromString(htmlStr, "text/html")
    return document
  }

  // const addMessage = async (e) => {
  //   e.preventDefault()
  //   console.log(promptInput)
  //   const completion = await openai.chat.completions.create({
  //     messages: [{"role": "system", "content": `You are front end designer that uses tailwindcss.
  //     //       The user gives you information based on the component they want on their react screen and you response with the jsx html elements and styling requested.
  //     //       you put the styling in className="" which is the format for tailwind. you try your best and successfully capture what UI the user wants using tailwind components. you dont make syntax errors or mistakes. you respond with only the returned jsx element and nothing else. For example: <div className="bg-gradient-to-r"></div> and not "jsx <div className="bg-gradient-to-r"></div>"`},
  //     {"role": "user", "content": promptInput}],
  //     model: "gpt-4",
  //   })
  //   console.log(completion.choices[0].message.content)
  //   setCreatedComponents(completion.choices[0].message.content)
  // }

  const addMessage = async (e) => {
    e.preventDefault()

    // const file = await openai.files.create({
    //   file: await fs.createReadStream("./../../screenshot.png"),
    //   purpose: "assistants",
    // });

    const thread = await openai.beta.threads.create()
    const message = await openai.beta.threads.messages.create(
            thread.id,
            {
              role: "user",
              content: promptInput,
              // file_ids: [file.id]
            }
          )

    let run = await openai.beta.threads.runs.create(
      thread.id,
      { 
        assistant_id: "asst_A5GipQuWLEQECmmWckrM9aD0",
        // instructions: "Please address the user as Jane Doe. The user has a premium account."
      }
    )
    while (['queued', 'in_progress', 'cancelling'].includes(run.status)) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
      run = await openai.beta.threads.runs.retrieve(
        run.thread_id,
        run.id
      );
    }
    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(
        run.thread_id
      );

      const messageKeys = Object.keys(messages.data.reverse())
      setCreatedComponents(messages.data[messages.data.length-1].content[0].text.value)
      for (const message of messages.data.reverse()) {
        console.log(`${message.role} > ${message.content[0].text.value}`);
      }
      // setCreatedComponents(messages.data[0].content[0].text.value)
    } else {
      console.log(run.status);
    }

    
  }


  return (
    <div>
      <form 
        onSubmit={addMessage}
        className="m-auto m-0">
          <label htmlFor="name">Enter your prompt: </label>
          <input 
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          type="text" name="prompt" id="prompt" 
          className=" border-black border-2"
          />
      </form>
    <div>{parse(createdComponents)}</div>

    <div className="w-full h-screen bg-gradient-to-r from-pink-500 to-cyan-500 flex flex-col overflow-hidden"> <div className="w-full h-20 px-8 flex items-center justify-between border-b border-white"> <h1 className="text-2xl text-white">Dashboard</h1> <nav className="flex items-center"> <a href="#" className="text-white mx-4">Home</a> <a href="#" className="text-white mx-4">About</a> <a href="#" className="text-white mx-4">Contact</a> </nav> </div> <div className="w-full flex-1 p-8 grid grid-cols-3 gap-8"> <div className="col-span-1 bg-white rounded-xl shadow-lg flex items-center justify-center"> <h2 className="text-xl">Widget 1</h2> </div> <div className="col-span-2 bg-white rounded-xl shadow-lg flex items-center justify-center"> <h2 className="text-xl">Widget 2</h2> </div> <div className="col-span-1 bg-white rounded-xl shadow-lg flex items-center justify-center"> <h2 className="text-xl">Widget 3</h2> </div> <div className="col-span-2 bg-white rounded-xl shadow-lg flex items-center justify-center"> <h2 className="text-xl">Widget 4</h2> </div> <div className="col-span-3 bg-white rounded-xl shadow-lg flex items-center justify-center"> <h2 className="text-xl">Widget 5</h2> </div> </div> </div>

    </div>
  )
}