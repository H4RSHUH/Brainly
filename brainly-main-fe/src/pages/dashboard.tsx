import { useEffect, useState } from 'react'

import { AddContent } from '../components/addContent'
import { Button } from '../components/button'
import { Card } from '../components/card'
import { PlusIcon } from '../icon/plusIcon'
import { ShareIcon } from '../icon/shareIcon'
import { Sidebar } from '../components/sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { Logout } from '../components/Logout'

export function Dashboard() {
const { contents, refresh, setType, type } = useContent();
  const [openModal, setModalOpen]= useState(false)
  useEffect(()=>{
    refresh()
  },[openModal])

  useEffect(() => {
    // @ts-ignore
    if (window.twttr) {
      // @ts-ignore
      window.twttr.widgets.load();
    }
  }, [contents]);

  return (
    <div>
      <Sidebar
        activeType={type}
        onYoutube={() => setType("youtube")}
        onTwitter={() => setType("twitter")}
        onNotes={() => setType("notes")}
        onAll={() => setType(null)}
      />

    <div className='p-4 ml-64 h-full min-h-screen bg-slate-100'>
      <AddContent open={openModal} onClose={()=>{setModalOpen(false)}}/>
    <div className='flex justify-end gap-3'>
    <Button onClick={()=>{
      setModalOpen(true)
    }} variant='primary' text='Add Content' startIcon={<PlusIcon/>}></Button>
    <Button onClick={
      async()=>{
        const response= await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
          share: true
        },{
      headers:{
        "Authorization": localStorage.getItem("token")
      }})
        const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
        alert(shareUrl);
        navigator.clipboard.writeText(shareUrl)
      }
    } variant='secondary' text='Share' startIcon={<ShareIcon/>}></Button>

    <Logout/>
    </div>
    <div className='columns-1 sm:columns-2 lg:columns-3 gap-4 mt-5'>
      {contents.map(({ _id, type, title, link, content }) => (
      <Card
        key={_id}
        _id={_id} 
        type={type}
        title={title}
        link={link}
        content={content}
        onDelete={() => refresh()}
      />
))}

    </div>
    </div>
    </div>
  )
}