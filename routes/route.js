import express from "express";
import { home } from "../controllers/homeController.js";
import { dashboard } from "../controllers/dashboardController.js";
import { login } from "../controllers/loginController.js";
import { register, handleRegister } from "../controllers/registerController.js";
import { manageStack, stackHandler, editStack, updateStack, deleteStack, upload } from "../controllers/stackController.js";
import { manageExperience, addExperience, experienceHandler, deleteExperience, upload2 } from "../controllers/experienceController.js";
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
router.post("/managestack", upload.single("stack-icon"), stackHandler);
router.get("/editstack/:id", editStack);
router.post("/update-stack", upload.single("stack-icon"), updateStack);
router.post("/delete-stack/:id", deleteStack);

// MANAGE EXPERIENCE
router.get("/manageexperience", manageExperience);
router.get("/addexperience", addExperience);
router.post("/submit-experience", upload2.single("comp-image"), experienceHandler);
router.post("/delete-experience/:id", deleteExperience);

// MANAGE PROJECT
router.get("/manageproject", manageProject);
router.get("/addproject", addProject);

export default router;
