import { Request } from "express";
import fs from "fs";
import multer, { FileFilterCallback, StorageEngine } from "multer";
import path from "path";
import { MAX_FILE_SIZE, UPLOAD_DIR } from "../config/config.js";

// Check the upload directory and create it if it doesn't exist
const uploadDir = path.join(path.resolve("."), UPLOAD_DIR);
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir);
}

// multer configuration
const storage: StorageEngine = multer.diskStorage({
	destination: `${UPLOAD_DIR}/`,
	filename: (req, file, callback) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		callback(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
	},
});

// File filter to allow only .mov files
// theorerically it can work with any video extensions if you tweak it
const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
	// Check the file extension and MIME type
	const isMov = path.extname(file.originalname).toLowerCase() === ".mov";
	const isQuickTime = file.mimetype === "video/quicktime";

	const isAllowed = isMov && isQuickTime;

	if (isAllowed) {
		callback(null, isAllowed);
	} else {
		callback(null, false);
	}
};

const upload = multer({
	storage: storage,
	fileFilter,

	// Comment the line below if the limit is unnecessary
	// but it is really slow to process large files
	limits: { fileSize: MAX_FILE_SIZE },
}).single("video");

export default upload;
