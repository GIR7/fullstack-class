import Fastify, {FastifyReply, FastifyRequest} from "fastify";
import {User} from "./db/entities/User.js";
import config from "./db/mikro-orm.config.js";
import {FastifyMikroOrmPlugin} from "./plugins/mikro.js";
import doggrRoutes from "./routes.js";



//starting up tha app, register(adds) plugins
const app = Fastify();
await app.register(FastifyMikroOrmPlugin, config);

//add the routes
await app.register(doggrRoutes);

export default app;
