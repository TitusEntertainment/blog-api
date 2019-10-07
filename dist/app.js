"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const schema_1 = __importDefault(require("./graphql/schema"));
const init_1 = require("./utils/init");
const dotenv_1 = __importDefault(require("dotenv"));
const test_1 = __importDefault(require("./test"));
dotenv_1.default.config();
const app = express_1.default();
app.use('/', express_graphql_1.default({
    schema: schema_1.default,
    graphiql: true,
}));
init_1.init();
test_1.default.save();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${process.env.PORT || 3000}`));
