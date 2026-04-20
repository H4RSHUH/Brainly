import { Menu, Plus, Share2 } from "lucide-react";
import { Button } from "./button";

interface HeaderProps {
  onMenuClick: () => void;
  onAddContent: () => void;
  onShare: () => void;
}

export function Header({ onMenuClick, onAddContent, onShare }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-surface-200 bg-surface-50/80 px-4 backdrop-blur-xl dark:border-surface-800 dark:bg-surface-900/80 sm:px-6 lg:justify-end lg:px-8">
      {/* Mobile Menu */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={onMenuClick}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-surface-500 hover:bg-surface-200 dark:text-surface-400 dark:hover:bg-surface-800 transition-colors cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-[family-name:var(--font-display)] font-bold text-surface-900 dark:text-surface-100 tracking-tight">
          Brainly
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2.5">
        <Button 
          onClick={onShare} 
          variant="ghost" 
          text="Share" 
          startIcon={<Share2 />}
          className="hidden sm:inline-flex"
        />
        <Button 
          onClick={onAddContent} 
          variant="primary" 
          text="Add Content" 
          startIcon={<Plus />}
        />
      </div>
    </header>
  );
}
