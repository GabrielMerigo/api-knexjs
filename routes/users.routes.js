const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const auth = require("../middleware/AdminAuth");

router.get("/users", auth, UserController.findAllUsers);
router.get("/user/:id", auth, UserController.findUserById);
router.post("/user", UserController.createUser);
router.put("/user", auth, UserController.editUser);
router.delete("/user/:id", auth, UserController.deleteUser);
router.post("/recoverpassword", auth, UserController.recoverPassword);
router.post("/changepassword", auth, UserController.changePassword);
router.post("/login", UserController.login);

module.exports = router;
