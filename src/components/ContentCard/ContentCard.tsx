import { useNavigate } from 'react-router-dom'
import { ContentItem } from '../../services/api'

interface ContentCardProps {
  content: ContentItem
}

const ContentCard = ({ content }: ContentCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/watch/${content.id}`)
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer transform transition-transform hover:scale-105"
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-800">
        <img
          src={content.thumbnail}
          alt={content.title}
          className="w-full aspect-[2/3] object-cover group-hover:opacity-75 transition-opacity"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
              {content.title}
            </h3>
            <div className="flex items-center space-x-2 text-xs text-gray-300">
              <span>{content.year}</span>
              <span>•</span>
              <span>{content.rating}</span>
              <span>•</span>
              <span>{formatDuration(content.duration)}</span>
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 text-xs font-semibold bg-primary-600 text-white rounded">
            {content.type}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ContentCard

