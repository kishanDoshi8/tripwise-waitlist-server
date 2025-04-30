"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const formatZodError_1 = require("../utils/formatZodError");
const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            message: "Validation error",
            errors: (0, formatZodError_1.formatZodError)(err),
        });
        return;
    }
    res.status(err.status ?? 500).json({
        message: err.message ?? 'Internal Server Error',
    });
};
exports.errorHandler = errorHandler;
