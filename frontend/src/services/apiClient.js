import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

// ============================================
// Health Check
// ============================================

export const checkHealth = () => apiClient.get('/health')

// ============================================
// Children / Profile Management
// ============================================

export const createChild = (name, pin) =>
  apiClient.post('/children', { name, pin })

export const getChild = (childId) =>
  apiClient.get(`/children/${childId}`)

export const loginChild = (name, pin) =>
  apiClient.post('/children/login', { name, pin })

// ============================================
// Dogs
// ============================================

export const createDog = (childId, breed, dogName) =>
  apiClient.post('/dogs', { childId, breed, dogName })

export const getDog = (dogId) =>
  apiClient.get(`/dogs/${dogId}`)

export const updateDog = (dogId, updates) =>
  apiClient.put(`/dogs/${dogId}`, updates)

// ============================================
// Tasks
// ============================================

export const getTasks = (dogId) =>
  apiClient.get(`/tasks/${dogId}`)

export const completeTask = (dogId, taskType) =>
  apiClient.post(`/tasks/${dogId}/complete`, { taskType })

// ============================================
// Shop
// ============================================

export const getShopItems = () =>
  apiClient.get('/shop')

export const buyItem = (childId, shopItemId) =>
  apiClient.post('/shop/buy', { childId, shopItemId })

export const getInventory = (childId) =>
  apiClient.get(`/shop/inventory/${childId}`)

// ============================================
// Badges
// ============================================

export const getBadges = (childId) =>
  apiClient.get(`/badges/${childId}`)

// ============================================
// Error Handler
// ============================================

export const handleApiError = (error) => {
  if (error.response) {
    console.error('API Error:', error.response.status, error.response.data)
    return error.response.data
  } else if (error.request) {
    console.error('No response from server:', error.request)
    return { error: 'Server nicht erreichbar' }
  } else {
    console.error('Error:', error.message)
    return { error: error.message }
  }
}

export default apiClient
