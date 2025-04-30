"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSurveySchema = exports.CreateSurveySchema = exports.QuestionResponseSchema = exports.QuestionNamesEnum = void 0;
const zod_1 = require("zod");
exports.QuestionNamesEnum = zod_1.z.enum([
    'trip_types',
    'planning_pain_points',
    'current_organization_method',
    'desired_solution',
    'willingness_to_pay'
]);
exports.QuestionResponseSchema = zod_1.z.object({
    question: zod_1.z.string().min(1),
    name: exports.QuestionNamesEnum,
    answer: zod_1.z.union([
        zod_1.z.string(),
        zod_1.z.array(zod_1.z.string())
    ]),
    otherText: zod_1.z.string().optional(),
});
exports.CreateSurveySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().optional(),
});
exports.UpdateSurveySchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    responses: zod_1.z.array(exports.QuestionResponseSchema),
    surveyVersion: zod_1.z.string().optional(),
});
