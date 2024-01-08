import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef Hook
  const passwaedRef = useRef(null)

  const passwordGenerator = useCallback(
    () => {
      let pass = ""
      let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
      if (numberAllowed) str += "0123456789"
      if (charAllowed) str += "~!@#$%^&*_-"
      for (let i = 0; i < length; i++){
        let char = Math.floor(Math.random() * str.length)
        pass += str[char]
      } 
      setPassword(pass)
    },
    [length, numberAllowed, charAllowed, setPassword],
  )

  const copyPasswordClipboard = useCallback(() => {
    passwaedRef.current?.select()
    passwaedRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  

  return (
    <div className='h-screen w-full bg-gray-900 py-8'>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3  text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center'>Password genrator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            ref={passwaedRef} 
          />
          <button onClick={copyPasswordClipboard} className='bg-green-500 px-2 text-white font-bold rounded-r-xl'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
              <input 
                type="range"
                min={6}
                max={100}
                value = {length}
                className='cursor-pointer'
                onChange={(e) => {setLength(e.target.value)}} 
              />
              <label htmlFor="">length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input 
                type="checkbox"
                defaultChecked={numberAllowed}
                id='numderInput'
                onChange={() => {
                  setNumberAllowed(!numberAllowed)
                }} 
              />
              <label htmlFor="numderInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input 
                type="checkbox"
                defaultChecked={charAllowed}
                id='charInput'
                onChange={() => {
                  setCharAllowed(!charAllowed)
                }} 
              />
              <label htmlFor="charInput">Numbers</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
