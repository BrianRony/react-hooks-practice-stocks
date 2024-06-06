import React from "react";
import Stock from "./Stock";

function StockContainer({stocks, onHandleBuy}) {

  return (
    <div>
      <h2>Stocks</h2>
      {stocks.map(stock => (
        <Stock key={stock.id} stock={stock} onStockClick={onHandleBuy} />
      ))}
    </div>
  );
}

export default StockContainer;
