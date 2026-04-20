
import { useRef, useState } from "react";
import { CrossIcon } from "../icon/closeIcon";
import { Button } from "./button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType{
    Youtube = "youtube",
    Twitter= "twitter",
    Notes= "notes"
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AddContent({open, onClose}: Props){
    const titleRef= useRef<HTMLInputElement>(null)
    const linkRef= useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [type, setType]= useState(ContentType.Youtube)
    async function addContent() {
    const title = titleRef.current?.value;
    if (!title) return;

    const payload =
        type === ContentType.Notes
            ? {
                  title,
                  type,
                  content: contentRef.current?.value
              }
            : {
                  title,
                  type,
                  link: linkRef.current?.value
              };

    await axios.post(`${BACKEND_URL}/api/v1/content`, payload, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    });

    onClose();
}

    return <div>
        {open &&<div> <div onClick={onClose}  className="flex justify-center w-screen h-screen bg-slate-500 fixed opacity-80 top-0 left-0">
            
        </div>

        <div onClick={onClose}  className="flex justify-center w-screen h-screen fixed top-0 left-0">
            
        
        <div className="flex justify-center flex-col">
                <span onClick={(e) => e.stopPropagation()} className="bg-white opacity-100 p-5 rounded-md flex flex-col gap-3">
                    <div className="flex justify-end"> 
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Input ref={titleRef} placeholder="Title" />

                        {type === ContentType.Notes ? (
                            <textarea
                                ref={contentRef}
                                placeholder="Write your note here..."
                                className="border rounded p-2 h-32"
                            />
                        ) : (
                            <Input ref={linkRef} placeholder="Link" />
                        )}
                    </div>

                    <div className="p-2">
                        <h1 className="text-center">Select Type</h1>
                        <div className="flex gap-3">
                         <Button variant={type===ContentType.Youtube? "primary": "secondary"} text="YouTube"
                          onClick={()=>{
                            setType(ContentType.Youtube)
                          }}/>
                  
                         <Button variant={type===ContentType.Twitter? "primary": "secondary"} text="Twitter"
                          onClick={()=>{
                            setType(ContentType.Twitter)
                          }}/>

                          <Button variant={type===ContentType.Notes? "primary": "secondary"} text="Notes"
                          onClick={()=>{
                            setType(ContentType.Notes)
                          }}/>
                          </div>
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={addContent} variant="primary" text="submit"/>
                    </div>
                </span>
            </div>
            
            
        </div>

        </div>
        
        }
    </div>
}

