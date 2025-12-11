import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loadContent, loadCategories, setCategoryFilter } from '../../store/slices/contentSlice'
import ContentGrid from '../../components/ContentGrid/ContentGrid'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

const Home = () => {
  const dispatch = useAppDispatch()
  const { loading, categories } = useAppSelector((state) => state.content)

  useEffect(() => {
    dispatch(loadCategories())
  }, [dispatch])

  if (loading && categories.length === 0) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Featured Content</h1>
        <CategoryFilter />
        <ContentGrid />
      </div>
    </div>
  )
}

export default Home

