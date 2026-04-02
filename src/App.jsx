import { useState } from 'react'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'

function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (query) => {
    setLoading(true)
    setError(null)

    try {
      const encoded = encodeURIComponent(query)
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encoded}&json=1&page_size=10`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`)
      }

      const data = await response.json()
      const products = Array.isArray(data.products) ? data.products : []

      setResults(
        products.filter((item) => item.product_name && item.product_name.trim())
      )
    } catch (err) {
      console.error('Something went wrong:', err)
      setError(err.message || 'Unable to fetch results')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>🥗 FoodFacts</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && !error && results.length === 0 && (
        <p>Search for a food above to see its nutrition info.</p>
      )}
      {!loading && !error && results.length > 0 && <FoodList products={results} />}
    </div>
  )
}

export default App