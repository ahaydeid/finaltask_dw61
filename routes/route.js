import express from "express";
import multer from "multer";
import path from "path";
import { home } from "../controllers/homeController.js";
import { dashboard } from "../controllers/dashboardController.js";
import { login } from "../controllers/loginController.js";
import { register, handleRegister } from "../controllers/registerController.js";
import { manageStack, stackHandler } from "../controllers/stackController.js";
import { manageExperience, addExperience } from "../controllers/experienceController.js";
import { manageProject } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", home);
router.get("/login", login);
router.get("/register", register);
router.post("/register", handleRegister);
router.get("/managestack", manageStack);
// Upload stack-icon dan routernya
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "uploads/stack");
    cb(null, "src/assets/tech");
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + path.extname(file.originalname));
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
// Route untuk add stack
router.post("/managestack", upload.single("stack-icon"), stackHandler);

router.get("/manageexperience", manageExperience);
router.get("/addexperience", addExperience);

router.get("/manageproject", manageProject);

// Sementara untuk keperluan desain UI nya dulu
router.get("/dashboard", dashboard);

export default router;
