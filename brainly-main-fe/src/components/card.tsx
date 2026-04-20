// import { DeleteIcon } from "../icon/deleteIcon";
// import { ShareIcon } from "../icon/shareIcon";

// interface CardProps{
//     title: string
//     link: string 
//     type: "youtube" | "twitter" | "notes"
//     content?: string
// }
// export function Card(props: CardProps){
//     let vidId;
//     if(props.link.includes("v=")){
//         vidId=props.link.split("v=")[1]?.split("&")[0];
//     }
//     if(props.link.includes("youtu.be/")){
//         vidId=props.link.split("youtu.be/")[1]?.split("?")[0];
//     }

//     return <div className="p-8 bg-white rounded-md max-w-76 border-gray-100 border shadow-sm">
//         <div className="flex items-center justify-between ">
//             <div >   
//                 <p className="text-sm ">{props.title}</p>
//             </div>
//             <div  className="flex">
//                 <div className="pr-2 text-gray-400">
//                     <a href={props.link} target="_blank"></a>
//                     <ShareIcon/> 
//                 </div>
//                 <div className="pr-2 text-gray-400">
//                     <DeleteIcon/>
//                 </div>
//             </div>
//         </div>
//         <div className="pt-4">
            
//             {props.type ==="youtube" && <iframe className="w-full" src={`https://www.youtube.com/embed/${vidId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
             


//         {props.type==="twitter" && <blockquote className="twitter-tweet">
//             <a href={props.link.replace("x.com", "twitter.com")}></a> 
//         </blockquote>}

//         </div>
//     </div>
// }


import axios from "axios";
import { DeleteIcon } from "../icon/deleteIcon";
import { ShareIcon } from "../icon/shareIcon";
import { BACKEND_URL } from "../config";

interface CardProps {
  _id: string;
  title: string;
  type: "youtube" | "twitter" | "notes";
  link?: string;
  content?: string;
  onDelete?: () => void;
}

export function Card({ _id, title, type, link, content, onDelete }: CardProps) {
  let vidId: string | undefined;

  async function handleDelete() {
    await axios.delete(`${BACKEND_URL}/api/v1/brain/content`, {
      data: { contentId: _id },
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    onDelete?.();
  }
  if (type === "youtube" && link) {
    if (link.includes("v=")) {
      vidId = link.split("v=")[1]?.split("&")[0];
    } else if (link.includes("youtu.be/")) {
      vidId = link.split("youtu.be/")[1]?.split("?")[0];
    }
  }

  return (
<div className="p-4 bg-white rounded-md border-gray-100 border shadow-sm mb-4 break-inside-avoid w-full">
        <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{title}</p>

        <div className="flex">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="pr-2 text-gray-400"
            >
              <ShareIcon />
            </a>
          )}
          {onDelete && (
            <div onClick={handleDelete} className="pr-2 text-gray-400 cursor-pointer">
              <DeleteIcon />
            </div>
          )}
        </div>
      </div>

      <div className="pt-4">
        {/* 📝 NOTES */}
        {type === "notes" && (
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {content}
          </p>
        )}

        {/* ▶️ YOUTUBE */}
        {type === "youtube" && vidId && (
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${vidId}`}
            title="YouTube video player"
            allowFullScreen
          />
        )}

        {/* 🐦 TWITTER */}
        {type === "twitter" && link && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
