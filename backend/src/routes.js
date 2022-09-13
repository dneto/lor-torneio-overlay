import express from "express";
import overlays from "./controllers/overlay.js";

const router = express.Router();

router.post("/", overlays.create);
router.get("/:id", overlays.findOne);
router.put("/:id", overlays.update);

export default router;
