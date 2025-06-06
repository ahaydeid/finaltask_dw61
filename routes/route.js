import express from "express";
import { home } from "../controllers/homeController.js";
import { dashboard } from "../controllers/dashboardController.js";
import { logged } from "../auth/auth.js";
import { registerProfile, registerProfileHandler, upload4, profile, editProfile, submitEditProfile } from "../controllers/profileController.js";
import { login, logout, handleLogin } from "../controllers/loginController.js";
import { manageStack, stackHandler, editStack, updateStack, deleteStack, upload } from "../controllers/stackController.js";
import { manageExperience, addExperience, experienceHandler, deleteExperience, upload2, editExperience } from "../controllers/experienceController.js";
import { manageProject, addProject, deleteProject, projectHandler, upload3 } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", home);

// MANAGE LOGIN
router.get("/login", login);
router.post("/login", handleLogin);

router.get("/logout", logout);

// MANAGE PROFILE
router.get("/register", registerProfile);
router.post("/register", upload4.single("profile-photo"), registerProfileHandler);
router.get("/profile", logged, profile);
router.get("/editprofile", logged, editProfile);
router.post("/editprofile", submitEditProfile);

// TO DASHBOARD MUST BE LOGIN
router.get("/dashboard", logged, dashboard);

// MANAGE TECH STACK
router.get("/managestack", logged, manageStack);
router.post("/managestack", upload.single("stack-icon"), stackHandler);
router.get("/editstack/:id", logged, editStack);
router.post("/update-stack", upload.single("stack-icon"), updateStack);
router.post("/delete-stack/:id", deleteStack);

// MANAGE EXPERIENCE
router.get("/manageexperience", logged, manageExperience);
router.get("/addexperience", logged, addExperience);
router.post("/addexperience", upload2.single("comp-image"), experienceHandler);
router.get("/editexperience/:id", logged, editExperience);
// router.post("/update-stack", upload.single("stack-icon"), updateStack);
router.post("/delete-experience/:id", deleteExperience);

// MANAGE PROJECT
router.get("/manageproject", logged, manageProject);
router.get("/addproject", logged, addProject);
router.post("/addproject", upload3.single("project-image"), projectHandler);
router.post("/delete-project/:id", deleteProject);

export default router;
