"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionString = process.env.MONGODB_URI;
if (connectionString) {
    mongoose_1.default.connect(connectionString)
        .then(() => console.log('Database connected...'))
        .catch(err => console.log('Database connection error \n', err));
}
else {
    console.error('Missing database connection string');
}
// start job-queue
config_1.default.startWorker();
const PORT = process.env.PORT ?? 3000;
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
