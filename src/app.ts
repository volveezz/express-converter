import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import downloadRouter from "./routes/downloadRouter.js";
import uploadRouter from "./routes/uploadRouter.js";

class VideoConverterServer {
	private app: express.Application;
	private isDevMode: boolean;
	private port: number;

	constructor() {
		this.isDevMode = process.env.NODE_ENV === "development";
		this.port = parseInt(process.env.PORT || "3000", 10);
		this.app = express();
		this.setupSwagger();
		this.setUpCors();
	}

	private setupSwagger() {
		const swaggerOptions = {
			definition: {
				openapi: "3.0.0",
				info: {
					title: "Video Converter API",
					version: "1.0.0",
					description: "API for converting video files from MOV to MP4",
				},
				servers: [
					{
						url: `http://localhost:${this.port}/api/v1`,
					},
				],
			},
			apis: this.isDevMode ? ["./src/routes/*.ts"] : ["./dist/routes/*.js"],
		};

		const swaggerSpec = swaggerJsdoc(swaggerOptions);

		this.app.use("/api/v1/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { customJs: "/swagger.js" }));
		this.app.get("/api/v1/swagger.json", (req, res) => {
			res.json(swaggerSpec);
		});
	}

	private setupRoutes() {
		this.app.use("/api/v1/download", downloadRouter);
		this.app.use("/api/v1/upload", uploadRouter);
	}

	private setUpCors() {
		this.app.use(
			cors({
				origin: "*",
				methods: ["GET", "POST"],
			})
		);
	}

	public start() {
		this.setupRoutes();
		const server = createServer(this.app);

		server.listen(this.port, () => {
			console.log(`Server started on port ${this.port} [${this.isDevMode ? "Dev Mode" : "Prod Mode"}]`);
			console.log(`\tAPI URL: http://localhost:${this.port}/api/v1`);
			console.log(
				`\tSwagger URL: http://localhost:${this.port}/api/v1/swagger\n` +
					`\tSwagger JSON: http://localhost:${this.port}/api/v1/swagger.json`
			);
		});

		const shutdown = () => {
			console.log("Shutting down...");
			server.close(() => {
				console.log("Server closed");
				process.exit(0);
			});
		};

		process.on("SIGINT", shutdown);
		process.on("SIGTERM", shutdown);
	}
}

const server = new VideoConverterServer();
server.start();

export default server;
