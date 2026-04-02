import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'
import ErrorMessage from '../components/ErrorMessage'
import useFoodSearch from '../hooks/useFoodSearch'

function HomePage() {
  const { results, loading, error, searchFood } = useFoodSearch()
  const navigate = useNavigate()

  const handleCardClick = (product) => {
    navigate(`/product/${product.id || product.code}`, { state: { product } })
  }

  return (
    <section>
      <h1>🥗 FoodFacts</h1>
      <SearchBar onSearch={searchFood} />

      {error && <ErrorMessage message={error} />}
      {loading && <p>Loading...</p>}
      {!loading && !error && results.length === 0 && (
        <p>Search for a food above to see its nutrition info.</p>
      )}
      {!loading && results.length > 0 && (
        <FoodList products={results} onCardClick={handleCardClick} />
      )}
    </section>
  )
}

export default HomePage