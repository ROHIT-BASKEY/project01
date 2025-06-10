import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

axios.defaults.baseURL = "https://chatverse-backend-23d4.onrender.com";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [authUser, setAuthUser] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [socket, setSocket] = useState(null)

  // Connect socket function
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return

    const newSocket = io(backendUrl, {
      query: { userId: userData._id },
    })

    setSocket(newSocket)

    newSocket.on('getOnlineUsers', (userIds) => {
      setOnlineUsers(userIds)
    })
  }

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      const { data } = await axios.get('/api/auth/check')
      if (data.success) {
        setAuthUser(data.user)
        connectSocket(data.user)
      }
    } catch (error) {
      toast.error('Session expired or invalid token.')
      logout()
    }
  }

  // Login
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials)
      if (data.success) {
        setAuthUser(data.userData)
        connectSocket(data.userData)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setToken(data.token)
        localStorage.setItem('token', data.token)

        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('token')
    
    setAuthUser(null)
    setOnlineUsers([])
    delete axios.defaults.headers.common['Authorization'] 
 
    setToken(null)
    if (socket) socket.disconnect()
    toast.success('Logged out successfully')
  }

  // Update profile
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put('/api/auth/update-profile', body,{
  headers: {
    'Content-Type': 'application/json',
  }
})
      if (data.success) {
        setAuthUser(data.user)
        toast.success('Profile updated successfully')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  // Initial setup
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      checkAuth()
    }
  }, [token])

  const value = {
    axios,
    authUser,
    setAuthUser, 
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
