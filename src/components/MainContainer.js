import React, {useEffect ,useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("Tech");

  useEffect(() => {
    // get stock data from API
    fetch("http://localhost:3001/stocks")
    .then(resp => resp.json())
    .then(stocks => {
        setStocks(stocks);
      })
    .catch((error) => {
        console.error("Error fetching stocks:", error);// Handle error state or retry logic
    })
  }, []);


  // add stock to portfolio
  function handleBuyingStock(stockToAdd) {
    const stockInPortfolio = portfolio.find(
      (stock) => stock.id === stockToAdd.id
    );
    if (!stockInPortfolio) {
      setPortfolio([...portfolio, stockToAdd]);
    }
  }

  // remove stock from portfolio
  function handleRemovingStock(stockToRemove) {
    setPortfolio(portfolio.filter(
      (stock) => stock.id !== stockToRemove.id
    ))
}
    // sort stocks
    const sortedStocks = [...stocks].sort((stock1, stock2) => {
      if (sortBy === "Alphabetically") {
        return stock1.name.localeCompare(stock2.name);
      } else {
        return stock1.price - stock2.price;
      }
    });
  
  
    // filter stocks
    const filterStocks = sortedStocks.filter(stock => stock.type === filterBy);
  

  return (
    <div>
      <SearchBar sortBy = {sortBy} filterBy = {filterBy} onChangeSort = {setSortBy} onChangeFilter = {setFilterBy} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filterStocks} onHandleBuy={handleBuyingStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onRemoveStock={handleRemovingStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
