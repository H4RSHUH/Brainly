import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function SignUp(){
    const usernameRef= useRef<HTMLInputElement>()
    const passwordRef=useRef<HTMLInputElement>()
    const navigate= useNavigate()
    async function signup(){
        const username= usernameRef.current.value;
        const password= passwordRef.current.value;
        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username, 
                password
            
        })
        alert("you have signed up")
        navigate("/signin")

    }


    return <div className="flex bg-gray-200 h-screen w-screen justify-center items-center">
        <div className="bg-white rounded-2xl  border border-slate-300 min-w-48 p-4">
            <Input ref={usernameRef} placeholder="Username"/>
            <Input ref={passwordRef} placeholder="Password"/>
            <p className="text-gray-600 text-sm mx-2">already have an account? <a href="/signin" className="text-blue-300">Sign in</a></p>

            <div className="flex justify-center">
                <Button onClick={signup} variant="primary" text="Signup" loading={false}/>
            </div>
        </div>
        
    </div>
}