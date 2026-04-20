import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function useContent(){
    const [contents, setContents]= useState([]);
    const [type, setType] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    function refresh(selectedType: string | null = type){

        setLoading(true);

        let url = `${BACKEND_URL}/api/v1/content`;
        if (selectedType) {
            url += `?type=${selectedType}`;
        }

        axios.get(url,{
            headers:{
                "Authorization": localStorage.getItem("token")
            }
        }).then((response)=>{
            setContents(response.data.content)
        }).finally(()=>{
            setLoading(false)
        })

    }
    useEffect(()=>{
        refresh();
        const interval = setInterval(()=>{
            refresh()
        }, 10*1000)

        return  ()=>{
            clearInterval(interval)
        }

    }, [type])
    return {contents, refresh, loading, setType, type }
}