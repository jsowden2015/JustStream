import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loadContent, loadContentByCategory } from '../../store/slices/contentSlice'
import ContentCard from '../ContentCard/ContentCard'
import ContentCardSkeleton from '../ContentCardSkeleton/ContentCardSkeleton'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const ContentGrid = () => {
  const dispatch = useAppDispatch()
  const { items, loading, error, hasMore, currentPage, categoryFilter } =
    useAppSelector((state) => state.content)

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  })

  const hasLoadedInitial = useRef(false)

  useEffect(() => {
    if (!hasLoadedInitial.current && !loading && items.length === 0) {
      hasLoadedInitial.current = true
      if (categoryFilter) {
        dispatch(loadContentByCategory({ category: categoryFilter, page: 1 }))
      } else {
        dispatch(loadContent(1))
      }
    }
  }, [dispatch, loading, items.length, categoryFilter])

  useEffect(() => {
    if (inView && hasMore && !loading && hasLoadedInitial.current) {
      const nextPage = currentPage + 1
      if (categoryFilter) {
        dispatch(loadContentByCategory({ category: categoryFilter, page: nextPage }))
      } else {
        dispatch(loadContent(nextPage))
      }
    }
  }, [inView, hasMore, loading, currentPage, dispatch, categoryFilter])

  if (error && items.length === 0) {
    return <ErrorMessage message={error} onRetry={() => dispatch(loadContent(1))} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map((item) => (
          <ContentCard key={item.id} content={item} />
        ))}
        {loading &&
          Array.from({ length: 12 }).map((_, i) => (
            <ContentCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>
      {hasMore && (
        <div ref={ref} className="h-20 flex items-center justify-center">
          {loading && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
          )}
        </div>
      )}
      {error && items.length > 0 && (
        <div className="mt-4 text-center">
          <ErrorMessage
            message={error}
            onRetry={() => {
              const nextPage = currentPage + 1
              if (categoryFilter) {
                dispatch(loadContentByCategory({ category: categoryFilter, page: nextPage }))
              } else {
                dispatch(loadContent(nextPage))
              }
            }}
          />
        </div>
      )}
    </div>
  )
}

export default ContentGrid

