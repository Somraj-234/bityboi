import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// List of public endpoints that don't require authentication
const publicEndpoints = [
    '/auth/login/',
    '/auth/registration/',
    '/auth/token/refresh/',
    '/auth/token/verify/',
    '/auth/google/',
    '/auth/google/callback/',
];

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        // Check if the current request is to a public endpoint
        const isPublicEndpoint = publicEndpoints.some(endpoint => 
            config.url.endsWith(endpoint)
        );

        // Only add auth header if it's not a public endpoint
        if (!isPublicEndpoint) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// Add response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Don't try to refresh token for public endpoints
        const isPublicEndpoint = publicEndpoints.some(endpoint => 
            originalRequest.url.endsWith(endpoint)
        );

        if (!isPublicEndpoint && error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                console.log('Attempting token refresh with:', refreshToken); // Debug log
                
                if (refreshToken) {
                    const response = await api.post('/auth/token/refresh/', {
                        refresh: refreshToken
                    });
                    console.log('Token refresh response:', response.data); // Debug log
                    
                    const { access } = response.data;
                    localStorage.setItem('token', access);
                    originalRequest.headers.Authorization = `Bearer ${access}`;
                    return api(originalRequest);
                } else {
                    console.log('No refresh token found in localStorage'); // Debug log
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError.response?.data); // Debug log
                // If refresh fails, redirect to login
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/registration/', userData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login/', credentials);
        return response;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = ()=>{
    return api.post('/auth/logout/');
}

export const getUser = async () => {
    try {
        const response = await api.get('/auth/user/');
        return response;
    } catch (error) {
        throw error;
    }
};

export const getLinks=()=>{
    return api.get('/links/');
}

export const createLink = (data)=>{
    return api.post('/links/', data);
}

export const deleteLink = (id)=>{
    return api.delete(`/links/${id}/`);
}

export const updateLink = (id, data)=>{
    return api.put(`/links/${id}/`, data);
}

export const refreshToken = async (refresh) => {
    try {
        const response = await api.post('/auth/token/refresh/', { refresh });
        return response;
    } catch (error) {
        throw error;
    }
};

export const verifyToken = (token) => {
    return api.post('/auth/token/verify/', { token });
}

export const getGoogleAuthUrl = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
    //   redirect_uri: 'postmessage',
      redirect_uri: "http://localhost:5173/auth/google/callback",
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // your web OAuth client ID
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '),
    };
  
    const queryString = new URLSearchParams(options).toString();
    return `${rootUrl}?${queryString}`;
  };
  


export const exchangeGoogleCode = async (code) => {
    try {
        const response = await api.post('/auth/google/', { code });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const forgotPassword = async (email) => {
    return api.post('/auth/password/reset/', { email });
}

export const changePassword = async (data) => {
    return api.post('/auth/password/change/', data);
}

export const resetPassword = async (email, new_password, confirm_password) => {
    const response = await api.post('/auth/password/reset/', {
        email,
        new_password,
        confirm_password
    });
    return response.data;
}

export const requestPasswordResetOTP = async (email) => {
    const response = await api.post('/auth/password/reset/otp/', { email });
    return response.data;
}

export const verifyOTP = async (email, otp) => {
    const response = await api.post('/auth/password/reset/verify/', { email, otp });
    return response.data;
}



