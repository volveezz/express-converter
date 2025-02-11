import express from "express";
import { uploadController } from "../controllers/uploadController.js";
import { handleFileUpload } from "../middleware/handleFileUpload.js";

const router = express.Router();

/**
 * @openapi
 * /upload:
 *   post:
 *     summary: Upload and convert MOV video to MP4
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: MOV video file to convert
 *     responses:
 *       '200':
 *         description: Successfully converted video
 *         content: # Example of successful response content (optional)
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 outputFileName:
 *                   type: string
 *       '400':
 *         description: Invalid file type or size
 *         content: # Example of error response content (optional)
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: Conversion error
 *         content: # Example of error response content (optional)
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/", handleFileUpload, uploadController);

export default router;
