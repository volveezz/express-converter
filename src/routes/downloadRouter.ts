import express from "express";
import { downloadController } from "../controllers/downloadController.js";

const router = express.Router();

/**
 * @openapi
 * /download/{filename}:
 *   get:
 *     summary: Download the processed video file and delete it after download.
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the file to download.
 *     responses:
 *       '200':
 *         description: File downloaded successfully.
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       '404':
 *         description: File not found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/:filename", downloadController);

export default router;
