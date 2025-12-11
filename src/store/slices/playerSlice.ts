import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ContentItem } from '../../services/api'

interface PlayerState {
  isPlaying: boolean
  currentContent: ContentItem | null
  volume: number
  playbackRate: number
  isFullscreen: boolean
  currentTime: number
  duration: number
}

const initialState: PlayerState = {
  isPlaying: false,
  currentContent: null,
  volume: 1,
  playbackRate: 1,
  isFullscreen: false,
  currentTime: 0,
  duration: 0,
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playContent: (state, action: PayloadAction<ContentItem>) => {
      state.currentContent = action.payload
      state.isPlaying = true
    },
    pause: (state) => {
      state.isPlaying = false
    },
    resume: (state) => {
      state.isPlaying = true
    },
    stop: (state) => {
      state.isPlaying = false
      state.currentContent = null
      state.currentTime = 0
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
    },
    setPlaybackRate: (state, action: PayloadAction<number>) => {
      state.playbackRate = action.payload
    },
    toggleFullscreen: (state) => {
      state.isFullscreen = !state.isFullscreen
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload
    },
  },
})

export const {
  playContent,
  pause,
  resume,
  stop,
  setVolume,
  setPlaybackRate,
  toggleFullscreen,
  setCurrentTime,
  setDuration,
} = playerSlice.actions
export default playerSlice.reducer

