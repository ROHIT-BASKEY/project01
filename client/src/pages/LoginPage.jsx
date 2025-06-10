import React, { useContext, useState } from 'react'
import assets from '../assets/assets.js'
import { AuthContext } from '../../context/AuthContext.jsx'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const [currState,setCurrState] = useState("Sign up")
  const [fullName,setFullName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [bio,setBio] = useState("")
  const [isDataSubmitted,setIsDataSubmitted] = useState(false);
  const {login} = useContext(AuthContext)
  const [agreeToPolicy,setAgreeToPolicy] = useState(false);
  const onSubmitHandler = (event)=>{
    event.preventDefault();
    if(!agreeToPolicy){
        toast.error("You must agree to the Terms of Use & Privacy Policy.");
    return;
    }
    if(currState === 'Sign up' && !isDataSubmitted){
      setIsDataSubmitted(true)
      return;
    }
    login(currState === 'Sign up' ? 'signup' : 'login',{fullName,email,password,bio})
  }
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl '>
      {/* left  */}
      <div className='flex flex-col items-center justify-center'>
        <div className='flex'>
          <span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-3xl box-content font-extrabold text-transparent text-center select-none">
    Welcome to ChatVerse <span className="text-black dark:text-white ml-2">🚀</span>
  </span>
    <h1
        className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-3xl font-extrabold text-transparent text-center select-auto">
        Welcome to ChatVerse <span className="text-black dark:text-white ml-2">🚀</span>
    </h1></div>
        <div className='flex'>
          <span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-3xl box-content font-extrabold text-transparent text-center select-none">
    Connect. Chat. Share moments.
  </span>
    <h1
        className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-3xl font-extrabold text-transparent text-center select-auto">
        Connect. Chat. Share moments.
    </h1></div>
      
      <img src={assets.logo_full} alt="" className='animate-bounce w-[min(30vw,250px)]'/>

      </div>
    
      {/* right  */}
      
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
      <h2 className='font-medium text-2xl flex justify-between items-center '>{currState}
        {isDataSubmitted && <img onClick={()=>setIsDataSubmitted(false)} src={assets.angle_left} alt='' className='ml-3 w-5 cursor-pointer '/>}

        
      </h2>
      {currState === "Sign up" && !isDataSubmitted && (
        <input onChange={(e)=>setFullName(e.target.value)} value={fullName} type='text' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ' placeholder='fulll name' required/>
      )}
      {!isDataSubmitted && (
        <>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 '/> 
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type='password' placeholder='password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 '/> 
        </>
      )}
      {
        currState==="Sign up" && isDataSubmitted && (
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='provide a short bio...' required></textarea>
        )
      }
      <button type="submit" className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer' >
        {currState === "Sign up" ?"create Account" : "Login Now"}
      </button>
      <div>
        <input type="checkbox"  checked={agreeToPolicy} onChange={(e)=>setAgreeToPolicy(e.target.checked)}/>
        <p>Agree to the terms of  ise & privacy policy</p>
      </div>
      <div className='flex flex-col gap-2' >
        {currState === "Sign up" ? (
          <p  className='text-sm text-gray-600'>
            Already have an account? <span onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Login here</span>
          </p>
        ) :(
          <p className='text-sm text-gray-600'>Create an account<span  onClick={()=>{setCurrState("Sign up"); setIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'> Click here</span></p>
        )}
      </div>
      </form>
    </div>
  )
}

export default LoginPage