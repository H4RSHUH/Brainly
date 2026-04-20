import { Logo } from "../icon/logo";
import { NotesIcon } from "../icon/notesIcon";
import { TwitterIcon } from "../icon/twitterIcon";
import { YoutubeIcon } from "../icon/youtubeIcon";
import { SidebarItem } from "./sidebarItem";

  export function Sidebar({
        activeType,
        onYoutube,
        onTwitter,
        onNotes,
        onAll,
        }: {
        activeType: string | null;
        onYoutube: () => void;
        onTwitter: () => void;
        onNotes: () => void;
        onAll: () => void;
        }){
    return <div className="w-64 h-screen fixed left-0 top-0 border-r-2  border-gray-300">
        <div  onClick={onAll} className={`text-2xl pt-4 flex items-center cursor-pointer
            ${activeType === null ? "text-purple-600" : " "}`}>
            <div className="pl-2 pr-1">
                <Logo/> 
            </div>
            
            Brainly </div>
                
    <div className="pt-4 pl-4">
        <SidebarItem text="Youtube" onClick={onYoutube} active={activeType === "youtube"} icon={<YoutubeIcon/>}/>
        <SidebarItem text="Twitter" onClick={onTwitter} active={activeType === "twitter"} icon={<TwitterIcon/>}/>
        <SidebarItem text="Notes" onClick={onNotes} active={activeType === "Notes"} icon={<NotesIcon/>}/>
    </div>
    </div>
  }