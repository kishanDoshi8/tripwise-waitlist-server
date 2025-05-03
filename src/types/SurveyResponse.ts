// src/schemas/updateSurvey.ts
import { z } from 'zod';

export const SurveyResponseSchema = z.object({
    question: z.string().min(1),
    questionId: z.enum([
        'trip_types',
        'planning_pain_points',
        'current_organization_method',
        'desired_solution',
        'willingness_to_pay'
    ]),
    answerText: z.string().optional(),
    answerOptions: z.array(z.string()).optional(),
});

export const UpdateSurveySchema = z.object({
    surveyResponses: z.array(SurveyResponseSchema).min(1),
});

export type UpdateSurveyInput = z.infer<typeof UpdateSurveySchema>;
