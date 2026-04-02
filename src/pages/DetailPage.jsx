import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isSaved = saved.some((p) => p.code === barcode)

  const handleSaveToggle = () => {
    if (!product) return

    if (isSaved) {
      dispatch({ type: 'REMOVE', payload: { code: barcode } })
    } else {
      dispatch({ type: 'ADD', payload: product })
    }
  }

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        )

        if (!cancelled) {
          if (response.data.status !== 1) {
            setError('Product not found')
            setProduct(null)
          } else {
            setProduct(response.data.product)
          }
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Could not load product details.')
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  if (loading) return <p>Loading product details...</p>
  if (error) return <p>{error}</p>
  if (!product) return <p>Product not found.</p>

  const { product_name, brands, image_small_url, nutriments } = product

  return (
    <div className="detail-page">
      <button onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-header">
        {image_small_url && <img src={image_small_url} alt={product_name} width={150} />}
        <div>
          <h2>{product_name || 'Unknown product'}</h2>
          {brands && <p>Brand: {brands}</p>}
        </div>
      </div>

      <div className="nutrition-table">
        <h3>Nutrition per 100g</h3>
        {nutriments ? (
          <ul>
            {nutriments.energy_kcal && <li>Calories: {nutriments.energy_kcal} kcal</li>}
            {nutriments.proteins && <li>Protein: {nutriments.proteins} g</li>}
            {nutriments.carbohydrates && <li>Carbohydrates: {nutriments.carbohydrates} g</li>}
            {nutriments.fat && <li>Fat: {nutriments.fat} g</li>}
          </ul>
        ) : (
          <p>No nutrition data available.</p>
        )}
      </div>

      <button onClick={handleSaveToggle}>
        {isSaved ? '★ Remove from Saved' : '☆ Save to My List'}
      </button>
    </div>
  )
}

export default DetailPage