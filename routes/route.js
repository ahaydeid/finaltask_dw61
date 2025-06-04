import express from "express";
import multer from "multer";
import { home } from "../controllers/homeController.js";
import { dashboard } from "../controllers/dashboardController.js";
import { login } from "../controllers/loginController.js";
import { register, handleRegister } from "../controllers/registerController.js";
import { manageStack, stackHandler, editStack, updateStack, deleteStack } from "../controllers/stackController.js";
import { manageExperience, addExperience } from "../controllers/experienceController.js";
import { manageProject, addProject } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", home);
router.get("/login", login);
router.get("/register", register);
router.post("/register", handleRegister);

// Sementara untuk keperluan desain UI nya dulu
router.get("/dashboard", dashboard);

// MANAGE TECH STACK
router.get("/managestack", manageStack);
// Multer untuk tech stack (masuk ke folder src/assets/tech)
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
// Route untuk edit stack
router.get("/editstack/:id", editStack);
router.post("/update-stack", upload.single("stack-icon"), updateStack);
router.post("/delete/:id", deleteStack);

// MANAGE EXPERIENCE
router.get("/manageexperience", manageExperience);
// Multer untuk tech stack (masuk ke folder uploads/experience)
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "uploads/stack");
    cb(null, "uploads/experience");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload2 = multer({ storage: storage2 });
router.get("/addexperience", addExperience);

// MANAGE PROJECT
router.get("/manageproject", manageProject);
router.get("/addproject", addProject);

export default router;
