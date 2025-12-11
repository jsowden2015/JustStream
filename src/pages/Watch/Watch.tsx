import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { playContent } from '../../store/slices/playerSlice'
import { fetchContentById } from '../../services/api'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import { ContentItem } from '../../services/api'

const Watch = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [content, setContent] = useState<ContentItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      if (!id) {
        navigate('/')
        return
      }

      try {
        setLoading(true)
        setError(null)
        const data = await fetchContentById(id)
        if (data) {
          setContent(data)
          dispatch(playContent(data))
        } else {
          setError('Content not found')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content')
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [id, dispatch, navigate])

  const handleRetry = () => {
    if (id) {
      const loadContent = async () => {
        try {
          setLoading(true)
          setError(null)
          const data = await fetchContentById(id)
          if (data) {
            setContent(data)
            dispatch(playContent(data))
          } else {
            setError('Content not found')
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load content')
        } finally {
          setLoading(false)
        }
      }
      loadContent()
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <ErrorMessage message={error || 'Content not found'} onRetry={handleRetry} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
          <div className="flex items-center space-x-4 text-gray-400">
            <span>{content.year}</span>
            <span>•</span>
            <span>{content.rating}</span>
            <span>•</span>
            <span>{content.genres.join(', ')}</span>
          </div>
        </div>
        <VideoPlayer />
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-400">{content.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Watch

