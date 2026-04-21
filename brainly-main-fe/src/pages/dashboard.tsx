import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { AddContent } from "../components/addContent";
import { SortableCard } from "../components/SortableCard";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/Header";
import { useContent } from "../hooks/useContent";
import { Loader2, Plus, BookOpen } from "lucide-react";
import { Button } from "../components/button";
import { AnimatePresence } from "framer-motion";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

const ORDER_KEY = "brainly-card-order";

function getSavedOrder(): string[] {
  try {
    const saved = localStorage.getItem(ORDER_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function saveOrder(ids: string[]) {
  localStorage.setItem(ORDER_KEY, JSON.stringify(ids));
}

export function Dashboard() {
  const { contents, refresh, setType, type } = useContent();
  const [openModal, setModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orderedIds, setOrderedIds] = useState<string[]>([]);

  // Pointer sensor with a small activation distance to avoid accidental drags
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  useEffect(() => {
    refresh().finally(() => setIsLoading(false));
  }, [openModal]);

  useEffect(() => {
    // @ts-ignore
    if (window.twttr) {
      // @ts-ignore
      window.twttr.widgets.load();
    }
  }, [contents]);

  useEffect(() => {
  if ((window as any).reddit) {
    (window as any).reddit.widgets.load();
  }
}, [contents]);

  // Sync order when contents change (new items added, items deleted)
  useEffect(() => {
    if (contents.length === 0) return;
    const saved = getSavedOrder();
    const contentIds = contents.map((c) => c._id);
    
    // Keep saved order for existing items, append new items at end
    const ordered = saved.filter((id) => contentIds.includes(id));
    const newItems = contentIds.filter((id) => !ordered.includes(id));
    setOrderedIds([...ordered, ...newItems]);
  }, [contents]);

  // Sort contents by saved order
  const sortedContents = useMemo(() => {
    if (orderedIds.length === 0) return contents;
    const map = new Map(contents.map((c) => [c._id, c]));
    const sorted = orderedIds.map((id) => map.get(id)).filter(Boolean) as typeof contents;
    // Add any items not in orderedIds
    const remaining = contents.filter((c) => !orderedIds.includes(c._id));
    return [...sorted, ...remaining];
  }, [contents, orderedIds]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = orderedIds.indexOf(active.id as string);
    const newIndex = orderedIds.indexOf(over.id as string);
    const newOrder = arrayMove(orderedIds, oldIndex, newIndex);
    setOrderedIds(newOrder);
    saveOrder(newOrder);
  }

  async function handleShare() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
      await navigator.clipboard.writeText(shareUrl);
      alert("Share link copied to clipboard!");
    } catch (e) {
      console.error("Failed to generate share link", e);
    }
  }

  const activeLabel = type === null 
    ? "All Content" 
    : type.charAt(0).toUpperCase() + type.slice(1) + "s";

  return (
    <div className="bg-grain min-h-screen bg-surface-50 dark:bg-surface-950 flex">
      <AnimatePresence>
        {openModal && (
          <AddContent 
            open={openModal} 
            onClose={() => { setModalOpen(false); setEditingContent(null); }} 
            initialData={editingContent}
          />
        )}
      </AnimatePresence>

      <Sidebar
        activeType={type}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onYoutube={() => { setType("youtube"); setSidebarOpen(false); }}
        onTwitter={() => { setType("twitter"); setSidebarOpen(false); }}
        onReddit={() => { setType("reddit"); setSidebarOpen(false); }}
        onNotes={() => { setType("notes"); setSidebarOpen(false); }}
        onAll={() => { setType(null); setSidebarOpen(false); }}
      />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col lg:ml-64">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onAddContent={() => { setEditingContent(null); setModalOpen(true); }}
          onShare={handleShare}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-surface-900 dark:text-surface-100 sm:text-2xl">
                {activeLabel}
              </h1>
              <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
                {sortedContents.length} item{sortedContents.length !== 1 ? 's' : ''} saved
                <span className="ml-2 text-surface-400 dark:text-surface-600"></span>
              </p>
            </div>

            {isLoading ? (
              <div className="flex w-full items-center justify-center py-24">
                <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
              </div>
            ) : sortedContents.length === 0 ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-surface-300 bg-surface-100/50 px-6 py-16 text-center dark:border-surface-700 dark:bg-surface-900/30">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 dark:bg-amber-500/15">
                  <BookOpen className="h-7 w-7 text-amber-500" />
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-base font-bold text-surface-900 dark:text-surface-100">
                  Your brain is empty
                </h3>
                <p className="mt-2 max-w-xs text-sm text-surface-500 dark:text-surface-400">
                  Start collecting ideas, videos, tweets, and notes. Everything you save lives here.
                </p>
                <div className="mt-6">
                  <Button 
                    onClick={() => { setEditingContent(null); setModalOpen(true); }}
                    startIcon={<Plus />}
                    text="Add your first item"
                  />
                </div>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sortedContents.map((c) => c._id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 2xl:columns-4 [column-gap:1.25rem]">
                    {sortedContents.map(({ _id, type, title, link, content }) => (
                      <SortableCard
                        key={_id}
                        _id={_id}
                        type={type}
                        title={title}
                        link={link}
                        content={content}
                        onEdit={() => {
                          setEditingContent({ _id, type, title, link, content });
                          setModalOpen(true);
                        }}
                        onDelete={() => refresh()}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}