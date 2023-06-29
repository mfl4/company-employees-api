const { Router } = require("express");
const ProductController = require("../controllers/products");

const router = express.Router();

router.post("/", ProductController.GetAllProducts);

module.exports = router;
