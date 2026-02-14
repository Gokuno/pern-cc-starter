import React, { useState } from "react";

const Car = ({ id, make, model, year, price, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCar, setEditedCar] = useState({
    make,
    model,
    year,
    price,
  });

  const handleChange = (e) => {
    setEditedCar({
      ...editedCar,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onUpdate(id, editedCar);
    setIsEditing(false);
  };

  return (
    <li className="car-card">
      {isEditing ? (
        <>
          <input name="make" value={editedCar.make} onChange={handleChange} />
          <input name="model" value={editedCar.model} onChange={handleChange} />
          <input
            name="year"
            type="number"
            value={editedCar.year}
            onChange={handleChange}
          />
          <input
            name="price"
            type="number"
            value={editedCar.price}
            onChange={handleChange}
          />

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <div className="car-info">
            <div>
              <span className="label">Make: </span>
              <span>{make}</span>
            </div>
            <div>
              <span className="label">Model: </span>
              <span>{model}</span>
            </div>
            <div>
              <span className="label">Year: </span>
              <span>{year}</span>
            </div>
            <div>
              <span className="label">Price: </span>
              <span className="price">${price}</span>
            </div>
          </div>

          <div className="car-actions">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => onDelete(id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default Car;
