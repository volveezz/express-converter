import { Request, Response } from "express";
import { fileDownloadService } from "../services/fileDownloadService.js";

export const downloadController = async (req: Request, res: Response) => {
	const { filename } = req.params;

	try {
		await fileDownloadService(filename, res);
	} catch (error: any) {
		res.status(error.message === "File not found" ? 404 : 500).json({ error: error.message });
	}
};
