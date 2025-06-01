import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { exchangeGoogleCode } from '../api/api';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { socialLogin } = useAuth();
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const handleCallback = async () => {
            try {
                // Get the code from URL
                const params = new URLSearchParams(location.search);
                const code = params.get('code');
                
                if (!code) {
                    throw new Error('No authorization code received');
                }

                // Exchange code for tokens
                const response = await exchangeGoogleCode(code);
                console.log('Google auth response:', response);

                // Use socialLogin function which handles token storage and navigation
                await socialLogin(response);
                
            } catch (error) {
                console.error('Google callback failed:', error);
                navigate('/login', { replace: true });
            }
        };

        handleCallback();
    }, [location, navigate, socialLogin]);

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-xl font-bold text-white">Processing Google Sign In...</h2>
                <p className="text-basemt-2 text-white">Please wait while we complete your sign in.</p>
            </div>
        </div>
    );
};

export default GoogleCallback; 