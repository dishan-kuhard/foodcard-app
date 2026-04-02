import FoodCard from './FoodCard'

function FoodList({ products = [], onCardClick }) {
  if (products.length === 0) {
    return <p>No results found. Try a different search.</p>
  }

  return (
    <div className="food-list">
      {products.map((product, index) => (
        <FoodCard
          key={product.code || product.id || index}
          product={product}
          onClick={onCardClick}
        />
      ))}
    </div>
  )
}

export default FoodList