import { useMemo } from 'react'
import { useAppSelector } from '../../store/hooks'
import ContentCard from '../../components/ContentCard/ContentCard'

const Search = () => {
  const searchQuery = useAppSelector((state) => state.ui.searchQuery)
  const { items } = useAppSelector((state) => state.content)

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return []
    }
    const query = searchQuery.toLowerCase()
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.genres.some((genre) => genre.toLowerCase().includes(query))
    )
  }, [searchQuery, items])

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Search'}
        </h1>
        {!searchQuery ? (
          <p className="text-gray-400">Enter a search query to find content</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-gray-400">No results found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredItems.map((item) => (
              <ContentCard key={item.id} content={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search

