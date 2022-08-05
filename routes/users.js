const express = require("express");
const router = express.Router();
const User = require("../modules/userModule");

//~------------------------| GET USER DATA |------------------------~//

router.get("/get/all", User.GetUser);

//~------------------------| GET USER DATA BY ID |------------------------~//

router.get("/get/:userId", User.GetUserById);

//~------------------------| UPDATE USER DATA |------------------------~//

router.patch("/update/:userId", User.UpdateUser);

//~------------------------| UPDATE USER PASSWORD |------------------------~//

router.patch("/update/password/:userId", User.UpdatePassword);

//~------------------------| DELETE USER DATA BY ID |------------------------~//

router.delete("/delete/:userId", User.DeleteUser);

//~------------------------| SAVE PRODUCT DATA |------------------------~//

router.put("/cart/add/:userId", User.AddToCart);

//~------------------------| DELETE SAVED PRODUCT DATA |------------------------~//

router.put("/cart/remove/:userId/:shirtId", User.RemoveFromCart);

//~------------------------| SAVE PRODUCT DATA |------------------------~//

// router.put("/review/add/:userId", User.AddReview);

//~------------------------| DELETE SAVED PRODUCT DATA |------------------------~//

// router.put("/review/remove/:userId/:shirtId", User.RemoveReview);

module.exports = router;
