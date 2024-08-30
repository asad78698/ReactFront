import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AxiosInstance from '../http/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message
  const messagelogout = location.state?.messagelogout

  const loginmessage = location.state?.loginmessage

  const [showpassword, setshowpassword] = useState(false)

  const handleshowpassword = () => {

    setshowpassword(!showpassword)

  }

  const [hidemessage, sethidemessage] = useState(false)
  const [alertmessage, setalertmessage] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [showerrors, setshowerrors] = useState([])

  const handlemessage = () => {

    sethidemessage(!hidemessage)


  }

  const loginform = async (e) => {
    e.preventDefault()

    const formdata = {
      email: email,
      password: password
    }

    try {

      const response = await AxiosInstance.post('/login', formdata)


      if (response.data.status == true) {
        setalertmessage(response.data.message);
        localStorage.setItem('authToken', response.data.tokens);
        navigate('/');
      }

      if (response.data.status == "false") {

        setshowerrors(response.data.errors)
        console.log(errors);

      }

      if (response.data.status == false) {
        setalertmessage(response.data.message)
      }


    } catch (error) {
      console.error(error);
    }




  }
  return (
    <>
      {message ?
        <div role="alert" className={` ${hidemessage ? 'hidden' : 'block'}  alert alert-success md:w-1/2 m-auto `}>
          <span>{message}</span>
          <p onClick={handlemessage} className='float-end text-xl'>x</p>
        </div>
        : ''}

      {messagelogout ?
        <div role="alert" className={` ${hidemessage ? 'hidden' : 'block'}  alert alert-success md:w-1/2 m-auto `}>
          <span>{messagelogout}</span>
          <p onClick={handlemessage} className='float-end text-xl'>x</p>
        </div>
        : ''}


      {loginmessage ?
        <div role="alert" className={` ${hidemessage ? 'hidden' : 'block'}  alert alert-success md:w-1/2 m-auto `}>
          <span>{loginmessage}</span>
          <p onClick={handlemessage} className='float-end text-xl'>x</p>
        </div>
        : ''}
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden lg:block">
          <img src="https://img.freepik.com/free-photo/closeup-shot-beautiful-ginger-domestic-kitten-sitting-white-surface_181624-35913.jpg?t=st=1724913612~exp=1724917212~hmac=f0c634904dd9f79a6d90f8e10cec057318df8dc0fa8dc22b7776dd44a1fc2558&w=740" alt="Placeholder Image" className="object-cover w-full h-full" />
        </div>
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form method="POST">
            <div className="mb-4">
              <label className="block text-gray-600">Email</label>
              <input value={email} onChange={(e) => setemail(e.target.value)} type="email" id="email" name="email" className={`${showerrors.email ? 'border-red-500' : ''} w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`} autoComplete="off" />
            </div>
            {showerrors && <p className='text-red-500'>{showerrors.email}</p>}
            <div className="mb-4">
              <label className="block text-gray-600">Password</label>
              <input type={showpassword ? 'text' : 'password'} value={password} onChange={(e) => setpassword(e.target.value)} id="password" name="password" className={`${showerrors.password ? 'border-red-500' : ''} w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`} autoComplete="off" />
              <p className='cursor-pointer' onClick={handleshowpassword}>{showpassword ? 'hide' : 'show'}</p>
            </div>
            {showerrors && <p className='text-red-500'>{showerrors.password}</p>}
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
              <label className="text-gray-600 ml-2">Remember Me</label>
            </div>
            <div className="mb-6 text-blue-500">
              <a href="#" className="hover:underline">Forgot Password?</a>
            </div>
            <button onClick={loginform} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
          </form>
          <div className="mt-6 text-blue-500 text-center">
            <a href="#" className="hover:underline">Sign up Here</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login