import express from "express";
import multer from "multer";
import path from "path";
import { home } from "../controllers/homeController.js";
import { dashboard } from "../controllers/dashboardController.js";
import { login } from "../controllers/loginController.js";
import { register } from "../controllers/registerController.js";

const router = express.Router();

router.get("/", home);
router.get("/login", login);
router.get("/register", register);
// Sementara untuk keperluan desain UI nya dulu
router.get("/dashboard", dashboard);

export default router;
