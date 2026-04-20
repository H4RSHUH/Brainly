import axios from "axios";
import { ExternalLink, Trash2, Pencil } from "lucide-react";
import { BACKEND_URL } from "../config";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import type { HTMLAttributes } from "react";

interface CardProps {
  _id: string;
  title: string;
  type: "youtube" | "twitter" | "notes";
  link?: string;
  content?: string;
  onDelete?: () => void;
  onEdit?: () => void;
  dragHandleProps?: HTMLAttributes<HTMLDivElement>;
}

const typeLabel: Record<string, string> = {
  youtube: "Video",
  twitter: "Tweet",
  notes: "Note",
};

const typeDot: Record<string, string> = {
  youtube: "bg-red-500",
  twitter: "bg-sky-400",
  notes: "bg-sage-500",
};

export function Card({
  _id,
  title,
  type,
  link,
  content,
  onDelete,
  onEdit,
  dragHandleProps,
}: CardProps) {
  const { theme } = useTheme();
  let vidId: string | undefined;
  const dragHandleClassName = dragHandleProps?.className ?? "";

  async function handleDelete() {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/brain/content`, {
        data: { contentId: _id },
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      onDelete?.();
    } catch (e) {
      console.error("Failed to delete content", e);
    }
  }

  if (type === "youtube" && link) {
    if (link.includes("v=")) {
      vidId = link.split("v=")[1]?.split("&")[0];
    } else if (link.includes("youtu.be/")) {
      vidId = link.split("youtu.be/")[1]?.split("?")[0];
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-surface-200 bg-white transition-shadow duration-200 hover:shadow-lg hover:shadow-surface-900/5 dark:border-surface-800 dark:bg-surface-900 dark:hover:shadow-amber-500/5"
    >
      {/* Header */}
      <div
        {...dragHandleProps}
        className={`flex items-start justify-between gap-3 p-4 pb-0 ${dragHandleClassName}`.trim()}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`h-2 w-2 rounded-full shrink-0 ${typeDot[type]}`} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-400 dark:text-surface-500">
              {typeLabel[type]}
            </span>
          </div>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-surface-900 dark:text-surface-100">
            {title}
          </h3>
        </div>

        {/* Actions — visible on hover (desktop), always on mobile */}
        <div className="flex shrink-0 items-center gap-0.5 opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="rounded-md p-1.5 text-surface-400 hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-surface-200 transition-colors"
              title="Open link"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="rounded-md p-1.5 text-surface-400 hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-surface-200 transition-colors cursor-pointer"
              title="Edit"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="rounded-md p-1.5 text-surface-400 hover:bg-err-500/10 hover:text-err-500 dark:hover:bg-err-500/10 dark:hover:text-err-400 transition-colors cursor-pointer"
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* 📝 NOTES */}
        {type === "notes" && (
          <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-surface-600 dark:text-surface-400">
            {content}
          </p>
        )}

        {/* ▶️ YOUTUBE */}
        {type === "youtube" && vidId && (
          <div className="overflow-hidden rounded-lg bg-surface-100 dark:bg-surface-800 -mx-0.5">
            <iframe
              className="aspect-video w-full"
              src={`https://www.youtube.com/embed/${vidId}`}
              title="YouTube video player"
              allowFullScreen
            />
          </div>
        )}

        {/* 🐦 TWITTER */}
        {type === "twitter" && link && (
          <div className="overflow-hidden rounded-lg">
            <blockquote className="twitter-tweet w-full" data-theme={theme === 'dark' ? 'dark' : 'light'}>
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}
      </div>
    </motion.div>
  );
}
