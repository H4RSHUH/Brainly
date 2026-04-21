import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface ContentItem {
    _id: string;
    title: string;
    type: "youtube" | "twitter" | "reddit" | "notes";
    link?: string;
    content?: string;
}

export function useContent(){
    const [contents, setContents]= useState<ContentItem[]>([]);
    const [type, setType] = useState<ContentItem["type"] | null>(null);
    const [loading, setLoading] = useState(false);

    async function refresh(selectedType: ContentItem["type"] | null = type){
        setLoading(true);

        let url = `${BACKEND_URL}/api/v1/content`;
        if (selectedType) {
            url += `?type=${selectedType}`;
        }

        try {
            const response = await axios.get(url,{
                headers:{
                    "Authorization": localStorage.getItem("token")
                }
            });
            setContents(response.data.content)
        } finally {
            setLoading(false)
        }
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