import { Schema, Document, model } from 'mongoose';

export class SurveyResponse extends Document {
    name?: string;
    email!: string;
    responses?: QuestionResponse[];
    surveyVersion?: string;
    createdAt!: Date;
    updatedAt!: Date;
}

type QuestionNames = 'trip_types' | 'planning_pain_point' | 'current_organization_method' | 'desired_solution' | 'willingness_to_pay';

interface QuestionResponse {
    question: string;
    name: QuestionNames;
    answer: string | string[];
    otherText?: string;
}

const QuestionResponseSchema = new Schema<QuestionResponse>({
    question: { type: String, required: true },
    name: { type: String, required: true },
    answer: { type: Schema.Types.Mixed, required: true },
    otherText: { type: String },
}, { _id: false });

const SurveyResponseSchema = new Schema<SurveyResponse>({
    name: { type: String },
    email: { type: String, required: true },
    responses: { type: [QuestionResponseSchema], required: true },
    surveyVersion: { type: String, default: 'v1' },
}, { timestamps: true });

const Survey = model('SurveyResponse', SurveyResponseSchema);
export default Survey;