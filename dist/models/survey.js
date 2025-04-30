"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyResponse = void 0;
const mongoose_1 = require("mongoose");
class SurveyResponse extends mongoose_1.Document {
}
exports.SurveyResponse = SurveyResponse;
const QuestionResponseSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    name: { type: String, required: true },
    answer: { type: mongoose_1.Schema.Types.Mixed, required: true },
    otherText: { type: String },
}, { _id: false });
const SurveyResponseSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String, required: true },
    responses: { type: [QuestionResponseSchema], required: true },
    surveyVersion: { type: String, default: 'v1' },
}, { timestamps: true });
const Survey = (0, mongoose_1.model)('SurveyResponse', SurveyResponseSchema);
exports.default = Survey;
