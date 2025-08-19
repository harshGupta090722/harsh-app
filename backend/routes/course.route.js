import express from "express";
import {
  buyCourses,
  courseDetails,
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../controllers/course.controller.js";
import userMiddleware from "../middlewares/user.mid.js";
import adminMiddleware from "../middlewares/admin.mid.js";

const router = express.Router();

router.post("/create", adminMiddleware, createCourse); //adding admin middleware will ensure that only admin is applicable to modify course.
router.put("/update/:courseId", adminMiddleware, updateCourse);//Jab bhi humlog params me id likhte hai ,we need to write it in colons.
router.delete("/delete/:courseId", adminMiddleware, deleteCourse);

router.get("/courses", getCourses);
router.get("/:courseId", courseDetails);

router.post("/buy/:courseId", userMiddleware, buyCourses);

export default router;