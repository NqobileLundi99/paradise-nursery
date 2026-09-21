import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  {
    category: "Air Purifying",
    plants: [
      { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bac?w=300", description: "Produces oxygen at night.", cost: "$15" },
      { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=300", description: "Filters formaldehyde and xylene.", cost: "$12" },
      { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=300", description: "Removes indoor toxins.", cost: "$18" },
      { name: "Boston Fern", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300", description: "Restores moisture indoors.", cost: "$14" },
      { name: "Rubber Tree", image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=300", description: "Large leaves absorb toxins.", cost: "$20" },
      { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=300", description: "Air cleaning and healing gel.", cost: "$10" }
    ]
  },
  {
    category: "Aromatic Plants",
    plants: [
      { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", description: "Calming scent for relaxation.", cost: "$20" },
      { name: "Rosemary", image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=300", description: "Fragrant herb for cooking.", cost: "$15" },
      { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=300", description: "Refreshing and easy to grow.", cost: "$10" },
      { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=300", description: "invigorating spa-like aroma.", cost: "$22" },
      { name: "Jasmine", image: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=300", description: "Sweet night-blooming fragrance.", cost: "$25" },
      { name: "Thyme", image: "https://images.unsplash.com/photo-1592187270271-9a4b84faa228?w=300", description: "Aromatic culinary perennial.", cost: "$12" }
    ]
  },
  {
    category: "Low Maintenance",
    plants: [
      { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=300", description: "Thrives in low light with rare watering.", cost: "$25" },
      { name: "Pothos", image: "https://images.unsplash.com/photo-1596724811751-0ae1770fc202?w=300", description: "Fast-growing vine, highly forgiving.", cost: "$14" },
      { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300", description: "Extremely durable foliage.", cost: "$22" },
      { name: "Succulent Mix", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", description: "Drought tolerant desk plants.", cost: "$15" },
      { name: "Jade Plant", image: "https://images.unsplash.com/photo-1508022057371-4f937727f440?w=300", description: "Succulent symbol of good luck.", cost: "$18" },
      { name: "Ponytail Palm", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=300", description: "Stores water in thick trunk.", cost: "$28" }
    ]
  }
];

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isPlantInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div className="product-page">
      {/* Navbar */}
      <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#2e7d32', color: '#fff' }}>
        <div onClick={onHomeClick} style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem' }}>
          Paradise Nursery
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>Plants</span>
          <span onClick={() => setShowCart(true)} style={{ cursor: 'pointer', position: 'relative' }}>
            🛒 Cart ({totalCartCount})
          </span>
        </div>
      </nav>

      {/* Main Content */}
      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid" style={{ padding: '20px' }}>
          {plantsArray.map((categoryGroup, index) => (
            <div key={index} className="category-section" style={{ marginBottom: '40px' }}>
              <h2>{categoryGroup.category}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                {categoryGroup.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="plant-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p style={{ fontWeight: 'bold' }}>{plant.cost}</p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={isPlantInCart(plant.name)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: isPlantInCart(plant.name) ? '#ccc' : '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isPlantInCart(plant.name) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isPlantInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
