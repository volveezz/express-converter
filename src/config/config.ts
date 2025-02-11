// Use only if you are ready to sacrifice CPU cores for the sake of the app
import os from "os";
export const MAX_THREADS = os.cpus().length - 1;

// export const MAX_THREADS = 2;

// 2 gb
export const MAX_FILE_SIZE = 99999999999; //2 * 1024 * 1024 * 1024;

export const UPLOAD_DIR = "uploads";

// export const DOWNLOAD_DIR = UPLOAD_DIR;
export const DOWNLOAD_DIR = "downloads";
