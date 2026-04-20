import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Card } from "../components/card"
import { BACKEND_URL } from "../config"
import { Sidebar } from "../components/sidebar"

export function SharedBrain() {
  const { shareLink } = useParams()
  const [contents, setContents] = useState([])
  const [username, setUsername] = useState("")
  const [activeType, setActiveType] = useState<string | null>(null)  // 👈 add this

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`)
      .then((response) => {
        setContents(response.data.content)
        setUsername(response.data.username)
      })
  }, [shareLink])

        useEffect(() => {
            // @ts-ignore
            if (window.twttr) {
            // @ts-ignore
            window.twttr.widgets.load();
            }
        }, [contents, activeType]);

  // 👇 client side filtering
  const filtered = activeType
    ? contents.filter((c: any) => c.type === activeType)
    : contents

  return (
    <div className="flex">
      <Sidebar
        activeType={activeType}
        onYoutube={() => setActiveType("youtube")}
        onTwitter={() => setActiveType("twitter")}
        onNotes={() => setActiveType("notes")}
        onAll={() => setActiveType(null)}
      />

      <div className="ml-64 p-4 min-h-screen bg-slate-100 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">{username}'s Brain</h1>
          <span className="text-sm text-gray-400 bg-white px-3 py-1 rounded-full border">
            👁️ View only
          </span>
        </div>

        <div className="mt-5 gap-4" style={{ columns: "320px 3" }}>
          {filtered.map(({ _id, type, title, link, content }: any) => (
            <Card
              key={_id}
              _id={_id}
              type={type}
              title={title}
              link={link}
              content={content}
            />
          ))}
        </div>
      </div>
    </div>
  )
}