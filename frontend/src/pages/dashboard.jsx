import { getLinks } from '@/api/api';
import React, { useEffect, useState } from 'react'

function dashboard() {
  const [links, setLinks] = useState([]);

  useEffect(()=>{
    const fetchLinks = async()=>{
      const response = await getLinks();
      setLinks(response.data);
      console.log(response);
    }
    fetchLinks();
  },[])

  return (
    <div className="w-full min-h-screen bg-[#0A0A0B] text-white px-4 sm:px-16 pt-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10">Your Links</h1>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border-separate border-spacing-y-2 text-sm sm:text-base">
          <thead>
            <tr className="text-left text-base sm:text-lg font-bold text-white/90">
              <th className="pb-3 sm:pb-4 pl-1 sm:pl-2 font-semibold border-b-2 border-white/10 whitespace-nowrap">/ Name</th>
              <th className="pb-3 sm:pb-4 font-semibold border-b-2 border-white/10 whitespace-nowrap">/ Url</th>
              <th className="pb-3 sm:pb-4 font-semibold border-b-2 border-white/10 whitespace-nowrap">/ Short URL</th>
              <th className="pb-3 sm:pb-4 font-semibold border-b-2 border-white/10 whitespace-nowrap">/ Clicks</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link, idx) => (
              <tr key={idx} className="text-sm sm:text-base font-medium text-white/70 hover:bg-white/5 transition rounded-full space-x-2 sm:space-x-0">
                <td className="py-2 sm:py-3 pl-1 sm:pl-2 border-b border-white/10 truncate max-w-[100px] sm:max-w-[200px] px-2 sm:px-0">{link.name}</td>
                <td className="py-2 sm:py-3 border-b border-white/10 truncate max-w-[120px] sm:max-w-[300px] px-2 sm:px-0">
                  <a href={`https://${link.url}`} target="_blank" rel="noopener noreferrer" className="underline text-white/70 hover:text-white/90 transition ">{link.url}</a>
                </td>
                <td className="py-2 sm:py-3 border-b border-white/10 truncate max-w-[180px] sm:max-w-[300px] px-2 sm:px-0">
                  <a href={`${import.meta.env.VITE_SERVER_URL}/${link.slug}`} target="_blank" rel="noopener noreferrer" className="underline text-white/70 hover:text-white/90 transition">{import.meta.env.VITE_SERVER_URL}/{link.slug}</a>
                </td>
                <td className="py-2 sm:py-3 border-b border-white/10 truncate max-w-[100px] sm:max-w-[200px] px-2 sm:px-0">{link.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default dashboard