import FoodCard from './FoodCart'

function FoodList({ products }) {
  if (!products || products.length === 0) {
    return <p>No results found. Try a different search.</p>
  }

  return (
    <div className="food-list">
      {products.map((product, index) => (
        <FoodCard
          key={product.code || product.id || index}
          product={product}
        />
      ))}
    </div>
  )
}

export default FoodList