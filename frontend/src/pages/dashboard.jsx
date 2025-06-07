import { deleteLink, getLinks } from '@/api/api';
import React, { useEffect, useState } from 'react';
import { CheckSquare, Square, Trash2, ChevronDown } from 'lucide-react';

function Dashboard() {
  const [links, setLinks] = useState([]);
  const [selected, setSelected] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await getLinks();
      setLinks(response.data);
    };
    fetchLinks();
  }, []);

  const allSelected = selected.length === links.length && links.length > 0;

  const toggleSelectAll = () => {
    setSelected(allSelected ? [] : links.map(link => link.id));
  };

  const toggleSelect = (id) => {
    setSelected(selected.includes(id) ? selected.filter(sid => sid !== id) : [...selected, id]);
  };

  const handleDeleteSelected = async () => {
    try{
      await Promise.all(selected.map(id => deleteLink(id)));
      setSelected([]);
      setLinks(links.filter(link => !selected.includes(link.id)));
    }catch(error){
      console.error('Error deleting links:', error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0B] text-white px-4 sm:px-16 pt-12">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Your Links</h1>
        <div className="relative">
            <button
              className={`flex items-center ${selected.length === 0 ? 'bg-[#1a1a1b] hover:bg-[#161616] ' : 'bg-red-600 hover:bg-red-700'} text-white px-4 py-2 rounded-md transition text-base font-semibold gap-2 cursor-pointer`}
              onClick={handleDeleteSelected}
              disabled={selected.length === 0}
            >
              Delete Links
              <Trash2 className="w-5 h-5" />
            </button>
        
          {dropdownOpen && selected.length === 0 && (
            <div className="absolute right-0 mt-2 w-40 bg-neutral-900 border border-neutral-700 rounded shadow-lg z-10">
              <div className="px-4 py-2 text-gray-400 cursor-not-allowed flex items-center">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Links
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border-separate border-spacing-y-2 text-sm sm:text-base">
          <thead>
            <tr className="text-left text-base sm:text-lg font-bold text-white/90">
              <th className="pb-3 sm:pb-4 pl-1 sm:pl-2 font-semibold border-b-2 border-white/10 whitespace-nowrap">
                <button onClick={toggleSelectAll} className="focus:outline-none">
                  {allSelected ? (
                    <CheckSquare className="w-5 h-5 text-red-500" />
                  ) : (
                    <Square className="w-5 h-5 text-white/50" />
                  )}
                </button>
              </th>
              <th className="pb-3 sm:pb-4 font-semibold border-b-2 border-white/10 whitespace-nowrap">/ Name</th>
              <th className="pb-3 sm:pb-4 font-semibold border-b-2 border-white/10 whitespace-nowrap">/ Url</th>
              <th className="pb-3 sm:pb-4 font-semibold border-b-2 border-white/10 whitespace-nowrap">/ Short URL</th>
              <th className="pb-3 sm:pb-4 font-semibold border-b-2 border-white/10 whitespace-nowrap">/ Clicks</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id} className="text-sm sm:text-base font-medium text-white/70 hover:bg-white/5 transition rounded-full space-x-2 sm:space-x-0">
                <td className="py-2 sm:py-3 pl-1 sm:pl-2 border-b border-white/10 truncate max-w-[100px] sm:max-w-[200px] px-2 sm:px-0">
                  <button onClick={() => toggleSelect(link.id)} className="focus:outline-none">
                    {selected.includes(link.id) ? (
                      <CheckSquare className="w-5 h-5 text-red-500" />
                    ) : (
                      <Square className="w-5 h-5 text-white/50" />
                    )}
                  </button>
                </td>
                <td className="py-2 sm:py-3 border-b border-white/10 truncate max-w-[100px] sm:max-w-[200px] px-2 sm:px-0">{link.name}</td>
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
  );
}

export default Dashboard;