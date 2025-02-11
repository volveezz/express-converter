import { NextFunction, Request, Response } from "express";
import upload from "./fileUpload.js";

export const handleFileUpload = (req: Request, res: Response, next: NextFunction): void => {
	upload.single("video")(req, res, (err: any) => {
		if (err) {
			res.status(400).json({ error: err.message });
			// please do not ask why
			setTimeout(() => next(err), 15);
			return;
		}

		next();
	});
};
