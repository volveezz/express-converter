import { Worker } from "worker_threads";
import { MAX_THREADS as cfg_MAX_THREADS } from "../config/config.js";
import { WorkerResponse, WorkerTask } from "../interfaces/Worker.js";

const MAX_THREADS = Math.max(1, Math.abs(Math.floor(cfg_MAX_THREADS)));

class WorkerManager {
	private workers: Worker[] = [];
	private taskQueue: WorkerTask[] = [];
	private busyWorkers: Set<Worker> = new Set();
	private callbacks: Map<string, (result: WorkerResponse) => void> = new Map();

	constructor() {
		if (process.env.NODE_ENV === "development") {
			return;
		}

		for (let i = 0; i < MAX_THREADS; i++) {
			const worker = new Worker("./dist/workers/converterWorker.js");

			worker.on("message", (response: WorkerResponse) => {
				this.busyWorkers.delete(worker);
				const callback = this.callbacks.get(response.taskId);
				if (callback) {
					callback(response);
					this.callbacks.delete(response.taskId);
				}
				this.processNextTask();
			});

			this.workers.push(worker);
		}
	}

	async processFile(movFile: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const taskId = Math.random().toString(36).substring(7);
			const task: WorkerTask = { movFile, taskId };

			this.callbacks.set(taskId, (response: WorkerResponse) => {
				if ("error" in response) {
					reject(new Error(typeof response?.error === "string" ? response.error : "Unknown error"));
				} else {
					resolve(response.mp4File);
				}
			});

			const availableWorker = this.workers.find((w) => !this.busyWorkers.has(w));

			if (availableWorker) {
				this.busyWorkers.add(availableWorker);
				availableWorker.postMessage(task);
			} else {
				this.taskQueue.push(task);
			}
		});
	}

	private processNextTask() {
		if (this.taskQueue.length === 0) return;

		const availableWorker = this.workers.find((w) => !this.busyWorkers.has(w));
		if (!availableWorker) return;

		const nextTask = this.taskQueue.shift()!;
		this.busyWorkers.add(availableWorker);
		availableWorker.postMessage(nextTask);
	}

	terminate() {
		this.workers.forEach((worker) => worker.terminate());
	}
}

export const workerManager = new WorkerManager();
