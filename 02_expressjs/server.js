import express from "express";

const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${req.method} ${req.url}`);

  next();
});

let cars = [
  { id: 1, make: "Toyota", model: "Camry", year: "2022", price: 28000 },
  { id: 2, make: "Ford", model: "Fiesta", year: "2021", price: 19500 },
  { id: 3, make: "Nissan", model: "Sentra", year: "2020", price: 19000 },
];

app.get("/", (req, res) => {
  res.send("Hello from the Cars API!");
});
router.get("/", (req, res) => {
  res.json(cars);
  console.log("Hello ");
});
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const car = cars.find((car) => car.id === id);

  if (!car) return res.status(404).send("Car not found");
  res.json(car);
});
router.post("/", (req, res) => {
  const { make, model, year, price } = req.body;

  if (!make || !model || !year || !price) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const newCar = {
    id: cars.length + 1,
    make,
    model,
    year: Number(year),
    price: Number(price),
  };

  cars.push(newCar);
  res.status(201).json(newCar);
});
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = cars.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Car not found" });
  }

  const { make, model, year, price } = req.body;

  if (make) cars[index].make = make;
  if (model) cars[index].model = model;
  if (year) cars[index].year = Number(year);
  if (price) cars[index].price = Number(price);

  res.json(cars[index]);
});
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = cars.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Car not found" });
  }

  const deleted = cars.splice(index, 1)[0];
  res.json({ message: "Car deleted", car: deleted });
});

app.use("/api/v1/cars", router);

app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}`),
);
