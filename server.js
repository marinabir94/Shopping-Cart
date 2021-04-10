//Backend implementation
//Express --> web server
//Body-parser --> Parse data inside the POST request
//Mongoose --> Connects us to the MongoDB data
//ShortID --> creates user-friendly ID to save as a product ID
const express = require("express");
//const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
//app.use(express.urlencoded());
app.use(express.json());

mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);

app.get("/api/products", async (req, res) => {
  //Find all producust, no filter
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  //Stpre the new product into the database
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  //Delete a product from the database
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server at http://localhost:5000"));
