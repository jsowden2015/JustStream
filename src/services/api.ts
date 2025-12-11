// Mock API service for streaming content
// In a real application, this would connect to a backend API

export interface ContentItem {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  duration: number
  year: number
  rating: string
  genres: string[]
  type: 'movie' | 'series' | 'documentary'
}

export interface Category {
  id: string
  name: string
}

export interface ContentResponse {
  items: ContentItem[]
  page: number
  hasMore: boolean
  total: number
}

// Mock data generator
const generateMockContent = (count: number, offset: number = 0): ContentItem[] => {
  const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Thriller', 'Romance', 'Documentary']
  const types: ('movie' | 'series' | 'documentary')[] = ['movie', 'series', 'documentary']
  const ratings = ['G', 'PG', 'PG-13', 'R']
  
  return Array.from({ length: count }, (_, i) => {
    const id = `content-${offset + i + 1}`
    const genreCount = Math.floor(Math.random() * 3) + 1
    const selectedGenres = genres.sort(() => 0.5 - Math.random()).slice(0, genreCount)
    
    return {
      id,
      title: `Streaming Title ${offset + i + 1}`,
      description: `This is a compelling description for streaming content ${offset + i + 1}. It features engaging storytelling and high production values.`,
      thumbnail: `https://picsum.photos/seed/${id}/400/600`,
      videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
      duration: Math.floor(Math.random() * 120) + 60,
      year: 2020 + Math.floor(Math.random() * 4),
      rating: ratings[Math.floor(Math.random() * ratings.length)],
      genres: selectedGenres,
      type: types[Math.floor(Math.random() * types.length)],
    }
  })
}

const ITEMS_PER_PAGE = 20
const TOTAL_ITEMS = 200

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchContent = async (page: number = 1): Promise<ContentResponse> => {
  await delay(800) // Simulate network delay
  
  // Simulate occasional errors (10% chance)
  if (Math.random() < 0.1 && page > 1) {
    throw new Error('Failed to load content. Please try again.')
  }
  
  const offset = (page - 1) * ITEMS_PER_PAGE
  const remaining = TOTAL_ITEMS - offset
  const count = Math.min(ITEMS_PER_PAGE, remaining)
  
  if (count <= 0) {
    return {
      items: [],
      page,
      hasMore: false,
      total: TOTAL_ITEMS,
    }
  }
  
  return {
    items: generateMockContent(count, offset),
    page,
    hasMore: offset + count < TOTAL_ITEMS,
    total: TOTAL_ITEMS,
  }
}

export const fetchContentByCategory = async (
  category: string,
  page: number = 1
): Promise<ContentResponse> => {
  await delay(800)
  
  if (Math.random() < 0.1 && page > 1) {
    throw new Error('Failed to load content. Please try again.')
  }
  
  const offset = (page - 1) * ITEMS_PER_PAGE
  const allContent = generateMockContent(TOTAL_ITEMS)
  const filtered = allContent.filter(item => item.genres.includes(category))
  const paginated = filtered.slice(offset, offset + ITEMS_PER_PAGE)
  
  return {
    items: paginated,
    page,
    hasMore: offset + ITEMS_PER_PAGE < filtered.length,
    total: filtered.length,
  }
}

export const fetchContentById = async (id: string): Promise<ContentItem | null> => {
  await delay(500)
  
  const allContent = generateMockContent(TOTAL_ITEMS)
  return allContent.find(item => item.id === id) || null
}

