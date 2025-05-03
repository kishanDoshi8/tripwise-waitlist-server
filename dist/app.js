"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middlewares/errorHandler");
const surveyRoutes_1 = __importDefault(require("./routes/surveyRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
let corsOrigin;
if (process.env.NODE_ENV === 'development') {
    corsOrigin = 'http://localhost:5173';
}
else {
    corsOrigin = 'https://tripwise.group'; // production
}
app.use((0, cors_1.default)({
    origin: corsOrigin,
}));
app.use(express_1.default.json());
// Routes
app.use('/api/surveys', surveyRoutes_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
