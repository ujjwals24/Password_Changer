import { useState, useCallback,useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [CharAllowed, setCharAllowed] = useState(false);
  const [password,setPassword] = useState("");

    //useRef hook
    const passwordRef=useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass=''
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnqrstuvwxyz'  
    if (numberAllowed) str+='0123456789'
    if (CharAllowed) str+=  ' !@#$%^&*()-_+=[]{}~'

    for (let i = 1; i <=length; i++) {
      let char =Math.floor(Math.random() * str.length)+1;
      pass += str.charAt(char); 
    }

    setPassword(pass)


  },[length,setPassword,numberAllowed,CharAllowed]);

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSeclectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password  ])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,CharAllowed, passwordGenerator])

  return (    
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 text-white bg-black' >Passcode Changer</div>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password' 
      readOnly
      ref={passwordRef}
      />

      <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-500 text-white px-3  py-0.5 shrink=0' >copy</button>


     </div>
     <div className='flex text-sm gap-x-2'>
     <div className='flex items-center gap-x-1'>
      <input type="range" 
         min={6}
         max={100}
          value={length}
          className='cursor-pointer' 
          onChange={(e) =>{setLength(e.target.value)}}
      />
      <label className='text-white'>length: {length}</label>
      
     </div>
     <div className='"flex items-center gap-x-1'>
      <input type="checkbox" 
      defaultChecked={numberAllowed} 
      id="numberInput"
      onChange={(e) =>{
        setNumberAllowed((prev) =>!prev);
      }} />
      <label htmlFor="numberInput"  className='text-white'>Numbers</label>

     </div>
     <div className='"flex items-center gap-x-1'>
      <input type="checkbox" 
      defaultChecked={CharAllowed} 
      id="characterInput"
      onChange={(e) =>{
        setCharAllowed((prev) =>!prev);
      }} />
      <label  className='text-white' htmlFor="characterInput">Characters</label>

     </div>
     </div>
     
    </>
  )
} 

export default App
