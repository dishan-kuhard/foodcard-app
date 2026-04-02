function FoodCard({ product }) {
  const { product_name, brands, nutriments, image_small_url } = product

  return (
    <div className="food-card">
      {/* render the product image if it exists */}
      {/* render the product name */}
      {/* render the brand */}
      {/* render calories, protein, carbs, fat from nutriments */}
    </div>
  )
}

export default FoodCard