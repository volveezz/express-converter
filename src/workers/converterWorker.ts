import { parentPort } from "worker_threads";
import { WorkerResponse, WorkerTask } from "../interfaces/Worker.js";
import { processFile } from "../services/convertService.js";

if (parentPort) {
	parentPort.on("message", async (task: WorkerTask) => {
		try {
			const mp4File = await processFile(task.movFile);
			const response: WorkerResponse = {
				taskId: task.taskId,
				mp4File,
			};
			parentPort!.postMessage(response);
		} catch (error: any) {
			parentPort!.postMessage({
				taskId: task.taskId,
				error: error.message,
			});
		}
	});
}
