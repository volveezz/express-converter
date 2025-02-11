export interface WorkerTask {
	movFile: string;
	taskId: string;
}

export interface WorkerResponse {
	taskId: string;
	mp4File: string;
}
