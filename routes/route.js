import express from "express";
import { home } from "../controllers/homeController.js";
import { dashboard } from "../controllers/dashboardController.js";
import { ensureAuthenticated } from "../middleware/auth.js";
import { login, logout, handleLogin } from "../controllers/loginController.js";
import { register, registerHandler, upload4 } from "../controllers/registerController.js";
import { manageStack, stackHandler, editStack, updateStack, deleteStack, upload } from "../controllers/stackController.js";
import { manageExperience, addExperience, experienceHandler, deleteExperience, upload2 } from "../controllers/experienceController.js";
import { manageProject, addProject, deleteProject, projectHandler, upload3 } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", home);

// MANAGE LOGIN
router.get("/login", login);
router.post("/login", handleLogin);

router.get("/logout", logout);

// MANAGE REGISTER
router.get("/register", register);
router.post("/register", upload4.single("profile-photo"), registerHandler);

// Sementara untuk keperluan desain UI nya dulu
router.get("/dashboard", ensureAuthenticated, dashboard);

// MANAGE TECH STACK
router.get("/managestack", manageStack);
router.post("/managestack", upload.single("stack-icon"), stackHandler);
router.get("/editstack/:id", editStack);
router.post("/update-stack", upload.single("stack-icon"), updateStack);
router.post("/delete-stack/:id", deleteStack);

// MANAGE EXPERIENCE
router.get("/manageexperience", manageExperience);
router.get("/addexperience", addExperience);
router.post("/addexperience", upload2.single("comp-image"), experienceHandler);
router.post("/delete-experience/:id", deleteExperience);

// MANAGE PROJECT
router.get("/manageproject", manageProject);
router.get("/addproject", addProject);
router.post("/addproject", upload3.single("project-image"), projectHandler);
router.post("/delete-project/:id", deleteProject);

export default router;
