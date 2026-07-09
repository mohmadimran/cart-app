import React, { useState } from "react";
import "./App.css";

const productsData = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Headphones", price: 150 },
  { id: 3, name: "Keyboard", price: 80 },
  { id: 4, name: "Mouse", price: 40 }
];

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-app">
      <h1 className="page-title">🛒 Shopping Cart</h1>

      {/* Product List */}
      <h2 className="section-title">Products</h2>
      <div className="product-grid">
        {productsData.map((product) => (
          <div key={product.id} className="product-card">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
            <button 
              className="btn btn-primary" 
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <h2 className="section-title">Your Cart</h2>

      {cart.length === 0 && (
        <div className="cart-empty">🛍️ Your cart is empty</div>
      )}

      {cart.length > 0 && (
        <div className="cart-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-detail">
                  $<span>{item.price}</span> × {item.quantity}
                </span>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-group">
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    −
                  </button>
                  <span className="quantity-number">{item.quantity}</span>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <button 
                  className="btn btn-danger" 
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Total */}
      <div className="cart-total">
        <span className="total-label">Total</span>
        <span className="total-amount">{totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}
