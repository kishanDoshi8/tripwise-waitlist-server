import { z } from 'zod';

export const QuestionNamesEnum = z.enum([
    'trip_types',
    'planning_pain_points',
    'current_organization_method',
    'desired_solution',
    'willingness_to_pay'
]);

export const QuestionResponseSchema = z.object({
    question: z.string().min(1),
    name: QuestionNamesEnum,
    answer: z.union([
        z.string(),
        z.array(z.string())
    ]),
    otherText: z.string().optional(),
});

export const CreateSurveySchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
});

export const UpdateSurveySchema = z.object({
    name: z.string().optional(),
    responses: z.array(QuestionResponseSchema),
    surveyVersion: z.string().optional(),
});

type Update = z.infer<typeof UpdateSurveySchema>;