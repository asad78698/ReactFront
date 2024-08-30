import React, { useState } from 'react';
import AxiosInstance from '../http/AxiosInstance'
import {useNavigate} from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [fullname, setFullname] = useState('')
    const [errors, seterrors] = useState([])
    const [message, setmessage] = useState('')
    const [email, setemail] = useState('')

    const handlepasswordvalue = (e)=>{

        setPassword(e.target.value)
    }

    const handlePasswordToggle = () => {
        
        setShowPassword(!showPassword);
    };

    const handleform = async (e) => {
        e.preventDefault()

        try {
            const formdata = {
                name: fullname,
                email: email,
                password: password

            }

            const response = await AxiosInstance.post('/register', formdata)

            console.log(response)


            if (response.data.status == false) {

                seterrors(response.data.errors)
            }

            else{
               navigate('/login', {state:{message: 'Accound Created'}})
            }

        } catch (error) {
            console.error(error)
        }

    }
    return (
        <>
            <div className="h-screen md:flex">
                <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr bg-red-600 justify-around items-center hidden">
                    <div>
                        <h1 className="text-white font-bold text-4xl font-sans">Register</h1>
                        <p className="text-white mt-1">The most popular peer to peer lending at SEA</p>
                        <button type="button" className="block w-28 bg-white text-green-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button>
                    </div>
                    <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                </div>
                <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
                    <div className="bg-white">
                        <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                        <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            <input className="pl-2 outline-none border-none" onChange={(e) => setFullname(e.target.value)} type="text" placeholder="Full name" />
                        </div>
                        {errors && <p className='text-red-500 mb-3'>{errors.name}</p>}
                        {/* <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                            </svg>
                            <input className="pl-2 outline-none border-none" onChange={(e)=>setusername(e.target.value)} type="text" placeholder="Username" />
                        </div> */}
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="text" onChange={(e) => setemail(e.target.value)} placeholder="Email Address" />
                        </div>
                        {errors && <p className='text-red-500 mb-3'>{errors.email}</p>}

                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <input
                                onChange={handlepasswordvalue}
                                type={showPassword ? 'text' : 'password'}
                                className="pl-2 outline-none border-none"
                                placeholder="Password"
                            />
                            <button
                                onClick={handlePasswordToggle}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-gray-500"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>

                        </div>

                        {errors && <p className='text-red-500 mb-3'>{errors.password}</p>}

                        <button onClick={handleform} type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
                        <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password?</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
