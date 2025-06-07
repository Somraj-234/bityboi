import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Redirect() {
  const { slug } = useParams();

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/${slug}`);
        const longUrl = response.data.long_url;
        window.location.href = longUrl;
      } catch (error) {
        console.error('Error redirecting:', error);
        window.location.href = '/'; // Redirect to home on error
      }
    };

    redirectToOriginalUrl();
  }, [slug]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white">Redirecting...</h2>
        <p className="text-base mt-2 text-white">Please wait while we redirect you to your destination.</p>
      </div>
    </div>
  );
}

export default Redirect; 