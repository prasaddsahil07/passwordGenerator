import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_+=()[]{}|/;:'<>,.?"


    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char) 
    }

    setPassword(pass)

  },[length, numberAllowed, charAllowed, setPassword])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(8,16)
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  

  return (
    <>
      <div className="w-full mt-52 pt-1 max-w-md mx-auto shadow-md text-center rounded-lg px-4 pb-2 my-8 text-orange-600 bg-gray-600 font-semibold ">
        <h1 className="text-3xl italic text-white text-center my-5 font-bold">
        Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 "><input type="text" value={password}
        className="outline-none w-full py-1 px-3" placeholder='password' readOnly ref={passwordRef}/>
        <button onClick={copyPasswordToClipboard} className="outline-none bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-0.5 shrink-0">copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={16} value={length} className="cursor-pointer" onChange={(e) => {setLength(e.target.value)}} />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1 px-3">
          <input className="cursor-pointer" type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 px-1">
            <input className="cursor-pointer" type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
