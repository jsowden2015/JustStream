import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { fetchContent, fetchContentByCategory, ContentItem, Category } from '../../services/api'

interface ContentState {
  items: ContentItem[]
  categories: Category[]
  selectedContent: ContentItem | null
  loading: boolean
  error: string | null
  hasMore: boolean
  currentPage: number
  categoryFilter: string | null
}

const initialState: ContentState = {
  items: [],
  categories: [],
  selectedContent: null,
  loading: false,
  error: null,
  hasMore: true,
  currentPage: 1,
  categoryFilter: null,
}

export const loadContent = createAsyncThunk(
  'content/loadContent',
  async (page: number = 1) => {
    const response = await fetchContent(page)
    return response
  }
)

export const loadContentByCategory = createAsyncThunk(
  'content/loadContentByCategory',
  async ({ category, page }: { category: string; page: number }) => {
    const response = await fetchContentByCategory(category, page)
    return response
  }
)

export const loadCategories = createAsyncThunk(
  'content/loadCategories',
  async () => {
    const response = await fetchContent(1)
    // Extract unique categories from content
    const categories = new Set<string>()
    response.items.forEach(item => {
      item.genres.forEach(genre => categories.add(genre))
    })
    return Array.from(categories).map(name => ({ id: name, name }))
  }
)

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSelectedContent: (state, action: PayloadAction<ContentItem | null>) => {
      state.selectedContent = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      state.categoryFilter = action.payload
      state.currentPage = 1
      state.items = []
      state.hasMore = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadContent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadContent.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.page === 1) {
          state.items = action.payload.items
        } else {
          state.items = [...state.items, ...action.payload.items]
        }
        state.hasMore = action.payload.hasMore
        state.currentPage = action.payload.page
      })
      .addCase(loadContent.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load content'
      })
      .addCase(loadContentByCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadContentByCategory.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.page === 1) {
          state.items = action.payload.items
        } else {
          state.items = [...state.items, ...action.payload.items]
        }
        state.hasMore = action.payload.hasMore
        state.currentPage = action.payload.page
      })
      .addCase(loadContentByCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load content'
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
  },
})

export const { setSelectedContent, clearError, setCategoryFilter } = contentSlice.actions
export default contentSlice.reducer

