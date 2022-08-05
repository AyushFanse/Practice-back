const express = require("express");
const router = express.Router();
const upload = require("../middleWare/Multer");
const {
  PostProduct,
  GetProduct,
  GetProductByName,
  GetProductById,
  UpdateProduct,
  DeleteProduct,
} = require("../modules/ProductModule");

//~------------------------| CREATE PRODUCT DATA |------------------------~//

router.post("/post", upload.array('files', 3), PostProduct);

//~------------------------| GET ALL PRODUCT DATA |------------------------~//

router.get("/get/all", GetProduct);

//~------------------------| GET PRODUCT DATA BY NAME |------------------------~//

router.get("/get/:team", GetProductByName);

//~------------------------| GET PRODUCT DATA BY ID |------------------------~//

router.get("/get/:id", GetProductById);

//~------------------------| UPDATE PRODUCT DATA |------------------------~//

router.patch("/update/:productId", upload.single("file"), UpdateProduct);

//~------------------------| DELETE PRODUCT DATA |------------------------~//

router.delete("/delete/:productId", DeleteProduct);

module.exports = router;
