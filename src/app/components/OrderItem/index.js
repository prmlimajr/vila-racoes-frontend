import React, { useState, useCallback } from 'react';
import { FiTrash2 } from 'react-icons/fi';


import './OrderItem.css';

export default function OrderItem({ id, product, price, stock, onClick}) {
  const [quantity, setQuantity] = useState(1);

  const handleTotal = useCallback(() => {
    let total = parseFloat(price) * quantity;

    return total.toFixed(2);
  }, [price, quantity])


  return (
    <div className='orderItem'>
      <div className="rowOrder">
        <div>
          <FiTrash2 size={14} className='clickable' onClick={onClick} />
          <span className="boldOrder">{product}</span>
        </div>
        <span className="item">{`Valor unitário: R$${price}`}</span>
      </div>

      <div className="rowOrder">
        <div className="quantity">
          <span className="itemQuantity">Quantidade: </span>
          <input type="number" className='inputOrder' min={1} max={stock} onChange={(e) => setQuantity(e.target.value)} value={quantity} />
        </div>

        <span className="bold">{`Valor total: R$${handleTotal()}`}</span>
      </div>    
    </div>
  );
};
