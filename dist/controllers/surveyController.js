"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSurvey = exports.createSurvey = void 0;
const survey_1 = __importDefault(require("../models/survey"));
const survey_2 = require("../types/survey");
const createSurvey = async (req, res, next) => {
    try {
        const validatedData = survey_2.CreateSurveySchema.parse(req.body);
        const survey = new survey_1.default({ email: validatedData.email, name: validatedData.name });
        const savedSurvey = await survey.save();
        res.status(201).json(savedSurvey);
    }
    catch (error) {
        next(error);
    }
};
exports.createSurvey = createSurvey;
const updateSurvey = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id)
            throw Error('Missing Id.');
        const validatedData = survey_2.UpdateSurveySchema.parse(req.body);
        const updatedSurvey = await survey_1.default.findByIdAndUpdate(id, validatedData, { new: true, runValidators: true });
        if (!updatedSurvey) {
            res.status(404).json({ message: 'Survey response not found' });
            return;
        }
        res.status(200).json(updatedSurvey);
    }
    catch (error) {
        next(error);
    }
};
exports.updateSurvey = updateSurvey;
