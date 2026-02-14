import { useEffect, useState } from "react";
import Car from "./components/Car";

const App = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
  });

  // ---------------- FETCH CARS ----------------
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await fetch("api/v1/cars");
      const data = await res.json();
      setCars(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- HANDLE INPUT CHANGE ----------------
  const handleChange = (e) => {
    setNewCar({
      ...newCar,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- CREATE CAR ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("api/v1/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });

      const createdCar = await res.json();

      setCars((prev) => [...prev, createdCar]);
      setNewCar({ make: "", model: "", year: "", price: "" });
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- DELETE CAR ----------------
  const handleDelete = async (id) => {
    try {
      await fetch(`api/v1/cars/${id}`, {
        method: "DELETE",
      });

      setCars((prev) => prev.filter((car) => car.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- UPDATE CAR ----------------
  const handleUpdate = async (id, updatedCar) => {
    try {
      const res = await fetch(`api/v1/cars/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCar),
      });

      const data = await res.json();

      setCars((prev) => prev.map((car) => (car.id === id ? data : car)));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Welcome to the Car Store</h1>

        <h2>Add a New Car</h2>
        <form className="car-form" onSubmit={handleSubmit}>
          <input
            name="make"
            placeholder="Make"
            value={newCar.make}
            onChange={handleChange}
            required
          />
          <input
            name="model"
            placeholder="Model"
            value={newCar.model}
            onChange={handleChange}
            required
          />
          <input
            name="year"
            type="number"
            placeholder="Year"
            value={newCar.year}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={newCar.price}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Car</button>
        </form>

        <h2>Car List</h2>
        <ul className="car-list">
          {cars.map((car) => (
            <Car
              key={car.id}
              {...car}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
