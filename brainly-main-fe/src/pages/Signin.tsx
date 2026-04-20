import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function SignIn(){
const usernameRef = useRef<HTMLInputElement | null>(null);
const passwordRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate()
    async function signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) return;
        const response= await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username, 
                password 
        })
        const jwt = response.data.token;
        localStorage.setItem("token", jwt)
        //redirect user to /dashboard
        navigate("/dashboard")
    }

    return <div className="flex bg-gray-200 h-screen w-screen justify-center items-center">
        <div className="bg-white rounded-2xl  border border-slate-300 min-w-48 p-4">
            <Input ref={usernameRef} placeholder="Username"/>
            <Input ref={passwordRef} placeholder="Password"/>
            <p className="text-gray-600 text-sm mx-10 my-1.5">new user? <a href="/signup" className="text-blue-300">Sign up</a></p>
            <div className="flex justify-center">
                <Button onClick={signin} variant="primary" text="SignIn" loading={false  }/>
            </div>
        </div>
        
    </div>
}