import { Moon, Sun, X, LayoutGrid, LogOut } from "lucide-react";
import { Logo } from "../icon/logo";
import { NotesIcon } from "../icon/notesIcon";
import { TwitterIcon } from "../icon/twitterIcon";
import { YoutubeIcon } from "../icon/youtubeIcon";
import { SidebarItem } from "./sidebarItem";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeType: string | null;
  onYoutube: () => void;
  onTwitter: () => void;
  onReddit: () => void;
  onNotes: () => void;
  onAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  activeType,
  onYoutube,
  onTwitter,
  onReddit,
  onNotes,
  onAll,
  isOpen,
  onClose
}: SidebarProps) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-surface-950/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r transition-transform duration-300 ease-in-out",
        "border-surface-200 bg-surface-50 dark:border-surface-800 dark:bg-surface-900",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5">
          <button 
            onClick={onAll} 
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="text-amber-500 transition-transform duration-200 group-hover:scale-110">
              <Logo /> 
            </div>
            <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-surface-900 dark:text-surface-100">
              Brainly
            </span>
          </button>
          <button 
            onClick={onClose}
            className="rounded-md p-1.5 text-surface-400 hover:bg-surface-200 lg:hidden dark:hover:bg-surface-800 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Label */}
        <div className="px-5 pt-2 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-surface-400 dark:text-surface-500">
            Collections
          </p>
        </div>
                
        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 px-3">
          <SidebarItem text="All Content" onClick={onAll} active={activeType === null} icon={<LayoutGrid />} />
          <SidebarItem text="Tweets" onClick={onTwitter} active={activeType === "twitter"} icon={<TwitterIcon/>}/>
          <SidebarItem text="Videos" onClick={onYoutube} active={activeType === "youtube"} icon={<YoutubeIcon/>}/>
          <SidebarItem text="Reddit" onClick={onReddit} active={activeType === "reddit"} icon={<LayoutGrid />}/>
          <SidebarItem text="Notes" onClick={onNotes} active={activeType === "notes"} icon={<NotesIcon/>}/>
        </nav>

        {/* Footer */}
        <div className="border-t border-surface-200 dark:border-surface-800 p-3 space-y-0.5">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-800 dark:text-surface-400 dark:hover:bg-surface-850 dark:hover:text-surface-200 cursor-pointer"
          >
            {theme === 'dark' ? (
              <><Sun className="h-[18px] w-[18px]" /><span>Light mode</span></>
            ) : (
              <><Moon className="h-[18px] w-[18px]" /><span>Dark mode</span></>
            )}
          </button>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-surface-500 transition-colors hover:bg-err-500/10 hover:text-err-500 dark:text-surface-400 dark:hover:bg-err-500/10 dark:hover:text-err-400 cursor-pointer"
          >
            <LogOut className="h-[18px] w-[18px]" />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  )
}