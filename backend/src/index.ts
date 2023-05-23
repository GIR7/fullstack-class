import dotenv from "dotenv";
import app from "./app.js";
dotenv.config();

app.listen({ port: Number(process.env.PORT), host: process.env.HOST},
	(err, address) => {
		if (err) {
			app.log.error(err);
			process.exit(1);
		}
		// level: error> warning>info>debug>trace
		app.log.info(`Started server at ${address}`);
		console.log(`This is console log in index.ts after "app.log.info()": Started server at ${address} \n which means somehow app.log.info() didn't work?`)
		app.log.debug("Debug level");
		app.log.trace("Trace level");
	}
);
