import React, { useEffect, useState } from 'react';
import './css/product.css';
import Card from './card'; // Adjust the import based on your project structure
import { useNavigate } from "react-router-dom";
import Footer from './footer'; // Adjust the import if necessary

const Product = () => {
  const [allItems, setAllItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');

  const toItem = () => {
    if (authToken == null) {
      navigate('/login');
    } else {
      navigate('/item');
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${window.location.origin}/create/allitems`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Expected an array of items');
      }

      setAllItems(data);
      console.log(data);
      setIsLoading(false); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('No item found');
      setIsLoading(false);
    }
  };
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
        if (search === '') {
            fetchData();
        } else {
            const response = await fetch(`${window.location.origin}/create/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: search }),
            });
            const data = await response.json();
            setAllItems(data);
        }
    }
}

  return (
    <>
      <div className="container pmain my-3">
        <div className="text">Products</div>
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <input className="searchbar mx-2" type="text" placeholder="Search Products" onChange={(e) => { setSearch(e.target.value) }} onKeyDown={handleKeyDown}/>
          <button className="btn_pro" onClick={toItem}>
            Add Item
          </button>
        </div>
      </div>

      <div className="custom_container mt-3">
        <div className="container d-flex justify-content-center">
          <div className="container">
            {isLoading ? ( // Display loading message while fetching
              <div className="text-center mt-4">
                <h3>Loading products...</h3>
              </div>
            ) : error ? ( // If there's an error, display the error message
              <div className="text-center my-4">
                <h3>{error}</h3>
              </div>
            ) : allItems.length === 0 ? ( // If no products are found
              <div className="text-center mt-4">
                <h3>No products available.</h3>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 gx-4 gy-4">
                {allItems.map((element, index) => (
                  <div key={index} className="col">
                    <Card
                      name={element.name}
                      price={element.price}
                      description={element.description}
                      image={element.image}
                      bidActive={element.bidActive}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Product;
