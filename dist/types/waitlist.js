"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWaitlist = void 0;
const zod_1 = require("zod");
exports.CreateWaitlist = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().optional(),
});
