import { Response } from "express";
import fs from "fs";
import path from "path";
import { DOWNLOAD_DIR } from "../config/config.js";

export const fileDownloadService = async (fileName: string, res: Response) => {
	const filePath = path.resolve(".", DOWNLOAD_DIR, fileName);

	// Check if the file exists before downloading
	try {
		await fs.promises.access(filePath, fs.constants.F_OK);
	} catch (err) {
		res.status(404).json({ error: "File not found", fileName });
		return;
	}

	// Get file stats to determine the size of the file
	const statsPromise = fs.promises.stat(filePath);

	statsPromise.catch((err) => {
		if (err) {
			console.error("Error getting file stats:", err);
			res.status(500).json({ error: "Error checking file stats", message: err.message });
			return;
		}
	});

	const stats = await statsPromise;

	res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
	res.setHeader("Content-Length", stats.size);

	// Create a read stream from the file
	const fileStream = fs.createReadStream(filePath);

	// Pipe the file stream to the response object
	fileStream.pipe(res);

	fileStream.on("error", (downloadErr) => {
		res.status(500).json({ error: "Error happened during downloading process", message: downloadErr.message });
	});

	// Delete the file after download completes
	res.on("finish", async () => {
		try {
			await fs.promises.unlink(filePath); // Delete the file once it's fully sent
		} catch (unlinkErr) {
			console.error(`Failed to delete file ${filePath}:`, unlinkErr);
		}
	});
};
