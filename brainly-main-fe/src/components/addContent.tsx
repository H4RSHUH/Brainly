import { useRef, useState, useEffect } from "react";
import { X, FileText } from "lucide-react";
import { Button } from "./button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { motion } from "framer-motion";
import { YoutubeIcon } from "../icon/youtubeIcon";
import { TwitterIcon } from "../icon/twitterIcon";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Notes = "notes"
}

type Props = {
  open: boolean;
  onClose: () => void;
  initialData?: any;
};

export function AddContent({ open, onClose, initialData }: Props) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [type, setType] = useState(initialData?.type || ContentType.Youtube);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      if (titleRef.current) titleRef.current.value = initialData.title || "";
      if (linkRef.current && initialData.link) linkRef.current.value = initialData.link;
      if (contentRef.current && initialData.content) contentRef.current.value = initialData.content;
    }
  }, [initialData, type, open]);

  async function addContent() {
    const title = titleRef.current?.value;
    if (!title) {
      setError("Title is required");
      return;
    }

    let payload: any = { title, type };

    if (type === ContentType.Notes) {
      const content = contentRef.current?.value;
      if (!content) {
        setError("Note content is required");
        return;
      }
      payload.content = content;
    } else {
      const link = linkRef.current?.value;
      if (!link) {
        setError("Link is required");
        return;
      }
      payload.link = link;
    }

    setError(null);
    setLoading(true);

    try {
      if (initialData) {
        payload.contentId = initialData._id;
        await axios.put(`${BACKEND_URL}/api/v1/content`, payload, {
          headers: { Authorization: localStorage.getItem("token") }
        });
      } else {
        await axios.post(`${BACKEND_URL}/api/v1/content`, payload, {
          headers: { Authorization: localStorage.getItem("token") }
        });
      }
      onClose();
    } catch (e: any) {
      console.error(e);
      setError(e.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  const typeOptions = [
    { value: ContentType.Youtube, label: "Video", icon: <span className="[&>svg]:h-4 [&>svg]:w-4"><YoutubeIcon /></span>, dot: "bg-red-500" },
    { value: ContentType.Twitter, label: "Tweet", icon: <span className="[&>svg]:h-4 [&>svg]:w-4"><TwitterIcon /></span>, dot: "bg-sky-400" },
    { value: ContentType.Notes, label: "Note", icon: <FileText className="h-4 w-4" />, dot: "bg-sage-500" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-surface-950/50 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-surface-200 bg-white shadow-2xl dark:border-surface-800 dark:bg-surface-900"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-surface-900 dark:text-surface-100">
            {initialData ? "Edit content" : "Add content"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-surface-400 hover:bg-surface-100 hover:text-surface-600 dark:hover:bg-surface-800 dark:hover:text-surface-300 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-5 px-5 pb-5">
          {/* Error */}
          {error && (
            <div className="rounded-lg bg-err-500/10 border border-err-500/20 px-3 py-2.5 text-sm text-err-500 dark:text-err-400 font-medium">
              {error}
            </div>
          )}

          {/* Type Selector */}
          <div className="flex gap-1.5 p-1 bg-surface-100 rounded-lg dark:bg-surface-850 border border-surface-200 dark:border-surface-700">
            {typeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setType(opt.value); setError(null); }}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold transition-all cursor-pointer ${
                  type === opt.value 
                    ? "bg-white text-surface-900 shadow-sm dark:bg-surface-800 dark:text-surface-100" 
                    : "text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-300"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${opt.dot}`} />
                {opt.label}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <Input 
              ref={titleRef} 
              label="Title"
              placeholder="e.g. Next.js 14 Guide" 
            />

            {type === ContentType.Notes ? (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-surface-500 dark:text-surface-400 ml-0.5">
                  Content
                </label>
                <textarea
                  ref={contentRef}
                  placeholder="Write your note here..."
                  rows={4}
                  className="w-full rounded-lg border border-surface-200 bg-white px-3.5 py-2.5 text-sm text-surface-900 placeholder:text-surface-400 transition-all duration-150 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:placeholder:text-surface-600 resize-none"
                />
              </div>
            ) : (
              <Input 
                ref={linkRef} 
                label="Link"
                placeholder={type === ContentType.Youtube ? "https://youtube.com/..." : "https://x.com/..."} 
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-surface-100 bg-surface-50 px-5 py-3 dark:border-surface-800 dark:bg-surface-900/80">
          <div className="flex justify-end gap-2">
            <Button onClick={onClose} variant="ghost" text="Cancel" />
            <Button 
              onClick={addContent} 
              variant="primary" 
              text={initialData ? "Update" : "Save"} 
              loading={loading}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
