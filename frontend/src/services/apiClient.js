import axios from 'axios'
import { mockApi } from './mockApi'

// ============================================
// API Configuration
// ============================================

const USE_MOCK = import.meta.env.MODE === 'development' && import.meta.env.VITE_USE_MOCK_API === 'true'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

// ============================================
// Interceptor: Use Mock API if enabled
// ============================================

if (USE_MOCK) {
  console.log('🔧 Mock API aktiviert für lokale Entwicklung')
  
  apiClient.interceptors.request.use(async config => {
    // Route POST /children to mockApi
    if (config.method === 'post' && config.url.includes('/children') && !config.url.includes('/login')) {
      const response = await mockApi.createChild(config.data.name, config.data.pin)
      throw { response: { status: 200, data: response.data } }
    }
    // Route POST /children/login
    if (config.method === 'post' && config.url.includes('/children/login')) {
      const response = await mockApi.loginChild(config.data.name, config.data.pin)
      throw { response: { status: 200, data: response.data } }
    }
    // Route POST /dogs
    if (config.method === 'post' && config.url.includes('/dogs') && !config.url.includes('/api/dogs/')) {
      const response = await mockApi.createDog(config.data.childId, config.data.breed, config.data.dogName)
      throw { response: { status: 200, data: response.data } }
    }
    // Route GET /dogs/:id
    if (config.method === 'get' && config.url.match(/\/dogs\/\d+$/)) {
      const dogId = config.url.split('/').pop()
      const response = await mockApi.getDog(dogId)
      throw { response: { status: 200, data: response.data } }
    }
    return config
  })

  apiClient.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 200) {
        return Promise.resolve(error.response)
      }
      return Promise.reject(error)
    }
  )
}

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
