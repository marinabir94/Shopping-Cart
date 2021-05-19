const express = require("express");
//const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(express.json());

app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"));

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/react-shopping-cart-db",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

//****************Fetch, add and delete Products from database
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

//Get all products from the database
app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(products);
});

//Add a new product to the database
app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

//Delete a product from the database
app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

//****************Fetch, add and delete Orders from database
const Order = mongoose.model(
  "orders",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    email: String,
    name: String,
    address: String,
    total: Number,
    cartItems: [{
      _id: String,
      title: String,
      price: Number,
      count: Number
    }]
  }), 
  // {
  //   timestamps: true
  // }
);

//Create a new order in the database
app.post("/api/orders", async (req, res) => {
  
  //We check that all mandatory fields exist
  if(
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ){
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.send({message: "Some data is missing"});
  }

  const order = await Order(req.body).save();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(order);
});


//****************
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server at http://localhost:" + PORT + ""));
