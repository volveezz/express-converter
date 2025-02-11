import { Request, Response } from "express";
import path from "path";
import { MAX_FILE_SIZE } from "src/config/config.js";
import { processFile } from "../services/convertService.js";
import { workerManager } from "../workers/workerManager.js";

export const uploadController = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.file || !req.file.path) {
			res.status(400).json({
				error: `Files only up to ${Math.floor(MAX_FILE_SIZE / 1024 / 1024)} MB are supported with .mov extension`,
			});
			return;
		}

		let convertedFilePath;

		if (process.env.NODE_ENV === "production") {
			convertedFilePath = await workerManager.processFile(req.file.path);
		} else {
			convertedFilePath = await processFile(req.file.path);
		}

		res.json({
			message: "Video converted successfully",
			downloadName: `${path.basename(convertedFilePath)}`,
		});
		return;
	} catch (error: any) {
		res.status(500).json({
			error: "Conversion failed",
			details: error.message,
		});
		return;
	}
};
