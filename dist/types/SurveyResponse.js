"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSurveySchema = exports.SurveyResponseSchema = void 0;
// src/schemas/updateSurvey.ts
const zod_1 = require("zod");
exports.SurveyResponseSchema = zod_1.z.object({
    question: zod_1.z.string().min(1),
    questionId: zod_1.z.enum([
        'trip_types',
        'planning_pain_points',
        'current_organization_method',
        'desired_solution',
        'willingness_to_pay'
    ]),
    answerText: zod_1.z.string().optional(),
    answerOptions: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.UpdateSurveySchema = zod_1.z.object({
    surveyResponses: zod_1.z.array(exports.SurveyResponseSchema).min(1),
});
