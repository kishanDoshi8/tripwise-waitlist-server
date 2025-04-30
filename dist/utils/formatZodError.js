"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatZodError = void 0;
const formatZodError = (error) => {
    return error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
    }));
};
exports.formatZodError = formatZodError;
