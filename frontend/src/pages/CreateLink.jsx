import React, { useState } from 'react'
import OrangeButton from '../components/OrangeButton'
import { createLink } from '../api/api'
import { useNavigate } from 'react-router-dom';
function CreateLink() {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    slug: '',
  })

 const [error, setError] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);
 const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault()
    try{
      const response = await createLink(formData);
      setIsLoading(false);
      console.log(response);
      setIsSuccess(true);
      navigate('/dashboard');
    }
    catch(error){
      setError(error.response.data);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center px-8 py-8">
      <div className="w-full max-w-lg rounded-2xl shadow-xl bg-gradient-to-b from-[#1F1C19] to-[#141415] px-4 sm:px-8 py-10 flex flex-col gap-6 border border-[#232325]">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-1">Create New Link</h2>
          <p className="text-center text-[#b0b0b0] text-sm sm:text-base">Hey lil bro, please enter your details</p>
        </div>
        {error && <p className="text-red-500 text-center">{error.slug || error.name || error.url}</p>}
        {isSuccess && <p className="text-green-500 text-center">Link created successfully</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          {/* Name Field */}
          <div className='flex flex-col items-start gap-2'>
            <h4 className='text-white text-sm sm:text-base'>Name*</h4>
          
          <div className="relative flex items-center border border-white/10 rounded-2xl px-4 sm:px-6 py-4 gap-2 w-full">
        
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter name for your link"
              required
              minLength={1}
              maxLength={50}
              className="flex-1 bg-transparent outline-none text-white text-sm sm:text-base"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          </div>
          {/* URL Field */}
          <div className='flex flex-col items-start gap-2'>
            <h4 className='text-white text-sm sm:text-base'>URL*</h4>
          <div className="relative flex items-center border border-white/10 rounded-2xl px-4 sm:px-6 py-4 gap-2 w-full">
            <input
              type="text"
              name="url"
              id="url"
              placeholder="Enter URL"
              required
              minLength={1}
              maxLength={200}
              className="flex-1 bg-transparent outline-none text-white text-sm sm:text-base"
              value={formData.url}
              onChange={handleChange}
            />
          </div>
          </div>
          {/* Slug Field */}
          <div className='flex flex-col items-start gap-2'>
            <h4 className='text-white text-sm sm:text-base'>Slug</h4>
          <div className="relative flex items-center border border-white/10 rounded-2xl px-4 sm:px-6 py-4 gap-2 w-full">
            <input
              type="text"
              name="slug"
              id="slug"
              placeholder="Enter custom slug or leave blank"
              maxLength={50}
              className="flex-1 bg-transparent outline-none text-white text-sm sm:text-base"
              value={formData.slug}
              onChange={handleChange}
            />
          </div>
          </div>
          <OrangeButton
          isLoading={isLoading}
          loadingText={isLoading && "Creating link..."}
            width="w-full"
            type="submit"
            text="Create"
            rounded="rounded-2xl"
            disabled={!formData.name || !formData.url}
          />
        </form>
      </div>
    </div>
  )
}

export default CreateLink