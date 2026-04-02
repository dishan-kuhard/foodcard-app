function FoodCard({ product }) {
  const { product_name, brands, nutriments, image_small_url } = product

  return (
    <div className="food-card">
      {image_small_url && (
        <img src={image_small_url} alt={product_name || 'Food'} width={100} />
      )}
      <h2>{product_name || 'Unknown product'}</h2>
      {brands && <p>Brand: {brands}</p>}

      {nutriments ? (
        <ul>
          {nutriments.energy_kcal && <li>Calories: {nutriments.energy_kcal} kcal</li>}
          {nutriments.proteins && <li>Protein: {nutriments.proteins} g</li>}
          {nutriments.carbohydrates && <li>Carbs: {nutriments.carbohydrates} g</li>}
          {nutriments.fat && <li>Fat: {nutriments.fat} g</li>}
        </ul>
      ) : (
        <p>No nutrition details available.</p>
      )}
    </div>
  )
}

export default FoodCard