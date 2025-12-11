import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  pause,
  resume,
  setCurrentTime,
  setDuration,
  setVolume,
  toggleFullscreen,
} from '../../store/slices/playerSlice'

const VideoPlayer = () => {
  const dispatch = useAppDispatch()
  const { currentContent, isPlaying, volume, currentTime, duration } = useAppSelector(
    (state) => state.player
  )
  const playerRef = useRef<ReactPlayer>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (playerRef.current && currentTime > 0) {
      playerRef.current.seekTo(currentTime, 'seconds')
    }
  }, [])

  const handlePlay = () => {
    dispatch(resume())
  }

  const handlePause = () => {
    dispatch(pause())
  }

  const handleProgress = (state: { playedSeconds: number }) => {
    dispatch(setCurrentTime(state.playedSeconds))
  }

  const handleDuration = (duration: number) => {
    dispatch(setDuration(duration))
  }

  const handleSeek = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds, 'seconds')
      dispatch(setCurrentTime(seconds))
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    dispatch(setVolume(newVolume))
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().then(() => {
          dispatch(toggleFullscreen())
        })
      } else {
        document.exitFullscreen().then(() => {
          dispatch(toggleFullscreen())
        })
      }
    }
  }

  if (!currentContent) {
    return null
  }

  return (
    <div ref={containerRef} className="relative bg-black rounded-lg overflow-hidden">
      <div className="aspect-video">
        <ReactPlayer
          ref={playerRef}
          url={currentContent.videoUrl}
          playing={isPlaying}
          volume={volume}
          width="100%"
          height="100%"
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onReady={() => setIsReady(true)}
          controls={false}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
              },
            },
          }}
        />
      </div>

      {isReady && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="mb-2">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
          </div>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <button
                onClick={isPlaying ? handlePause : handlePlay}
                className="hover:text-primary-400 transition-colors"
              >
                {isPlaying ? (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
              </div>
              <div className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleFullscreen}
                className="hover:text-primary-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer

