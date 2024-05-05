import React from 'react';
import { useNavigate  } from 'react-router-dom';
import './css/createItem.css';

const CreateItem = ({ onSubmit }) => {
  const navigate=useNavigate();
  const authToken = localStorage.getItem('authToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch(`${window.location.origin}/create/createitem`, {
        method: 'POST',
        headers: {
          'auth-token': authToken,
        },
        body: formData,
      });
      if (!response.ok) { // Check for any HTTP error status
        const errorData = await response.json(); // Get error details from the server
        throw new Error(`Failed to submit item: ${errorData.error}`);
      }
      const responseData = await response.json();
      console.log('Successfully submitted item:', responseData);
      navigate('/shop');
    } catch (error) {
      console.error('Error during submission:', error.message); // Detailed error message
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center my-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center" style={{ fontFamily: 'monospace' }}>Add Item</h2>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Item Details</legend>
              <label htmlFor="image" className="form-label">
                Image:
              </label>
              <input type="file" className="form-control" id="image" name="image" required />

              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input type="text" className="form-control" id="name" name="name" placeholder="Enter name"required />

              <label htmlFor="price" className="form-label">
                Price:
              </label>
              <input type="number" className="form-control" id="price" name="price" placeholder="Enter minimum bid price" min={0} required />

              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <input type="text" className="form-control mb-3" id="description" name="description" placeholder="Enter description"required/>
            </fieldset>

            <button className="createitem_btn">
              <span>Submit</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
