import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loadCategories, setCategoryFilter } from '../../store/slices/contentSlice'

const CategoryFilter = () => {
  const dispatch = useAppDispatch()
  const { categories, categoryFilter } = useAppSelector((state) => state.content)

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(loadCategories())
    }
  }, [dispatch, categories.length])

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => dispatch(setCategoryFilter(null))}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            categoryFilter === null
              ? 'bg-primary-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => dispatch(setCategoryFilter(category.name))}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              categoryFilter === category.name
                ? 'bg-primary-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter

