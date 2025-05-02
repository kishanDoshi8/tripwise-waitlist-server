import { NextFunction, Request, Response } from "express";
import Survey from "../models/survey";
import { CreateSurveySchema, UpdateSurveySchema } from "../types/survey";
import { Queue } from "../config/config";
import { getWelcomeEmail } from "../utils/email-templates";

export const createSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateSurveySchema.parse(req.body);
        const { email, name } = validatedData

        const survey = new Survey({ email, name });
        const savedSurvey = await survey.save();

        if (!savedSurvey) throw new Error('Unexpected error trying to add user to the waitlist');

        Queue.addJob({
            data: {
                email,
                subject: `You're officially on the TripWise waitlist! 🎒✈️`,
                body: getWelcomeEmail(name),
            },
            name: `Added to queue. Welcome email to: ${email}`,
        });

        res.status(201).json(savedSurvey);
    } catch (error) {
        next(error);
    }
};

export const updateSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!id) throw Error('Missing Id.');

        const validatedData = UpdateSurveySchema.parse(req.body);

        const updatedSurvey = await Survey.findByIdAndUpdate(
            id,
            validatedData,
            { new: true, runValidators: true }
        );

        if (!updatedSurvey) {
            res.status(404).json({ message: 'Survey response not found' });
            return;
        }
        res.status(200).json(updatedSurvey);
    } catch (error) {
        next(error);
    }
};