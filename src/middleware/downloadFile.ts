import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { DOWNLOAD_DIR } from "../config/config.js";

export const downloadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const { filename } = req.params;
	const filePath = path.join(path.resolve("."), DOWNLOAD_DIR, filename);

	// Check if the file exists before downloading
	const isFileExists = fs.access(filePath, fs.constants.F_OK);

	isFileExists.catch((err) => {
		return res.status(404).json({ error: "File not found", message: err.message });
	});

	res.download(filePath, filename, (downloadErr) => {
		if (downloadErr) {
			return next(downloadErr);
		}

		// Delete the file after the user downloaded the file
		fs.unlink(filePath).catch((unlinkErr) => {
			if (unlinkErr) {
				console.error(`Failed to delete file ${filePath}:`, unlinkErr);
			}
		});
	});
};
