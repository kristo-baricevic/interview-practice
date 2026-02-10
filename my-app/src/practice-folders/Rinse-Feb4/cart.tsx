import React from "react";
const { useState } = React;

const pricesByServiceType = {
  dc: {
    service_name: "Dry Cleaning",
    items: [
      { id: 1, name: "Shirts", price: 2.5, qty: 0 },
      { id: 2, name: "Shorts", price: 6, qty: 0 },
      { id: 3, name: "Pants", price: 8, qty: 0 },
      { id: 4, name: "Sweaters", price: 8, qty: 0 },
      { id: 5, name: "Jacket/Blazer", price: 8, qty: 0 },
      { id: 6, name: "Dresses: Casual", price: 12, qty: 0 },
      { id: 7, name: "Dresses: Formal", price: 18, qty: 0 },
      { id: 8, name: "Comforters", price: 30, qty: 0 },
      { id: 9, name: "Sheets", price: 12, qty: 0 },
      { id: 10, name: "Napkins", price: 1, qty: 0 },
    ],
  },
};

const App = () => {
  const [cart, setCart] = useState(() => new Map()); // Map<id, {id,name,price,qty}>

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const next = new Map(prev);
      const existing = next.get(item.id);

      if (existing) {
        next.set(item.id, { ...existing, qty: existing.qty + 1 });
      } else {
        next.set(item.id, { ...item, qty: 1 });
      }

      return next;
    });
  };

  const calcTotal = (cartMap) => {
    let total = 0;
    for (const item of cartMap.values()) {
      total += item.price * item.qty;
    }
    return total;
  };

  const cartItems = Array.from(cart.values());

  return (
    <div className="container">
      <h1>Dry Cleaning Estimator</h1>

      <div className="wrapper">
        <div className="prices">
          <h2>Item</h2>

          <ul>
            {pricesByServiceType.dc.items.map((item) => (
              <li key={item.id} onClick={() => handleAddToCart(item)}>
                {item.name} ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        <div className="cart">
          <h2>Your cart</h2>

          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div>{item.name}</div>
                <div>Qty: {item.qty}</div>
                <div>Subtotal: ${(item.price * item.qty).toFixed(2)}</div>
              </li>
            ))}
          </ul>

          <strong>Total: ${calcTotal(cart).toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

export default App;
