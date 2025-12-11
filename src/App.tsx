import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'

// Lazy load routes for code splitting
const Home = lazy(() => import('./pages/Home/Home'))
const Browse = lazy(() => import('./pages/Browse/Browse'))
const Watch = lazy(() => import('./pages/Watch/Watch'))
const Search = lazy(() => import('./pages/Search/Search'))

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  )
}

export default App

