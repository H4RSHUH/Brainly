import { useNavigate } from "react-router-dom"
import { Button } from "./button";


export const Logout = () =>{

    const navigate = useNavigate();  // 👈 add this

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/signin")
    }

    return <div>
        <Button onClick={handleLogout} variant="primary" text="Log Out"/>
    </div>
}

