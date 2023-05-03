import Fastify from "fastify";
import config from "./db/mikro-orm.config.js";
import {FastifySearchHttpMethodPlugin} from "./plugins/http_search.js";
import {FastifyMikroOrmPlugin} from "./plugins/mikro.js";
import doggrRoutes from "./routes.js";


//starting up tha app, register(adds) plugins
const app = Fastify();
//register order matters...
await app.register(FastifyMikroOrmPlugin, config);

//add the search method plugin
await app.register(FastifySearchHttpMethodPlugin);

//add the routes
await app.register(doggrRoutes);


export default app;
