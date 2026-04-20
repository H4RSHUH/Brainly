import type { ReactElement } from "react"

 export function SidebarItem({text, icon, active, onClick}:{
    text: string
    icon: ReactElement
    active?: boolean
    onClick?: ()=>void
 }){
     return <div onClick={onClick}
      className={`flex items-center pl-6 py-2 cursor-pointer transition-all
      ${active ? "text-purple-600 bg-purple-100"
            : "text-gray-700 hover:text-gray-400"}
      hover:text-gray-400  text-gray-700 `}>
        <div className="pr-2">
            {icon} 
        </div>  
        <div className="">
            {text} 
        </div>
     </div>
 }