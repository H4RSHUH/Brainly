import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Card } from "../components/card"
import { BACKEND_URL } from "../config"
import { Sidebar } from "../components/sidebar"
import { Loader2, BookOpen, Menu } from "lucide-react"

export function SharedBrain() {
  const { shareLink } = useParams()
  const [contents, setContents] = useState([])
  const [username, setUsername] = useState("")
  const [activeType, setActiveType] = useState<string | null>(null)
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`)
      .then((response) => {
        setContents(response.data.content)
        setUsername(response.data.username)
      })
      .finally(() => { setIsLoading(false) })
  }, [shareLink])

  useEffect(() => {
    // @ts-ignore
    if (window.twttr) {
      // @ts-ignore
      window.twttr.widgets.load();
    }
  }, [contents, activeType]);

  const filtered = activeType
    ? contents.filter((c: any) => c.type === activeType)
    : contents

  return (
    <div className="bg-grain flex min-h-screen bg-surface-50 dark:bg-surface-950">
      <Sidebar
        activeType={activeType}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onYoutube={() => { setActiveType("youtube"); setSidebarOpen(false); }}
        onTwitter={() => { setActiveType("twitter"); setSidebarOpen(false); }}
        onNotes={() => { setActiveType("notes"); setSidebarOpen(false); }}
        onAll={() => { setActiveType(null); setSidebarOpen(false); }}
      />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col lg:ml-64">
        <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-surface-200 bg-surface-50/80 px-4 backdrop-blur-xl dark:border-surface-800 dark:bg-surface-900/80 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-surface-500 hover:bg-surface-200 dark:text-surface-400 dark:hover:bg-surface-800 cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="font-[family-name:var(--font-display)] font-bold text-surface-900 dark:text-surface-100 tracking-tight">
              Brainly
            </span>
          </div>
          <div className="ml-auto">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-300/30 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:border-amber-500/20 dark:text-amber-400">
              Shared view
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-surface-900 dark:text-surface-100 sm:text-2xl">
                {username}'s Brain
              </h1>
              <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
                {filtered.length} item{filtered.length !== 1 ? 's' : ''} shared
              </p>
            </div>

            {isLoading ? (
              <div className="flex w-full items-center justify-center py-24">
                <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-surface-300 bg-surface-100/50 px-6 py-16 text-center dark:border-surface-700 dark:bg-surface-900/30">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-200 dark:bg-surface-800">
                  <BookOpen className="h-7 w-7 text-surface-400" />
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-base font-bold text-surface-900 dark:text-surface-100">
                  Nothing here yet
                </h3>
                <p className="mt-2 max-w-xs text-sm text-surface-500 dark:text-surface-400">
                  This collection doesn't have any content of this type.
                </p>
              </div>
            ) : (
              <div className="masonry-grid">
                {filtered.map(({ _id, type, title, link, content }: any) => (
                  <div key={_id} className="break-inside-avoid">
                    <Card
                      _id={_id}
                      type={type}
                      title={title}
                      link={link}
                      content={content}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}