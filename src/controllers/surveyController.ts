import { NextFunction, Request, Response } from "express";
import { Queue } from "../config/config";
import { getWelcomeEmail } from "../utils/email-templates";
import { prisma } from "../db/client";
import { UpdateSurveySchema } from "../types/SurveyResponse";
import { CreateWaitlist } from "../types/Waitlist";

export const createSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateWaitlist.parse(req.body);
        const { email, name } = validatedData;

        let userName = name;
        if (name === '') userName = undefined;

        const waitlist = await prisma.waitlist.create({
            data: {
                name: userName,
                email,
            }
        })

        if (!waitlist) throw new Error('Unexpected error trying to add you to the waitlist');

        Queue.addJob({
            data: {
                email,
                subject: `You're officially on the TripWise waitlist! 🎒✈️`,
                body: getWelcomeEmail(name),
            },
            name: `Added to queue. Welcome email to: ${email}`,
        });

        res.status(201).json(waitlist);
    } catch (error) {
        next(error);
    }
};

export const updateSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!id) throw Error('Missing Id.');

        const validatedData = UpdateSurveySchema.parse(req.body);

        const updatedSurvey = await prisma.waitlist.update({
            where: {
                id,
            },
            data: {
                surveyResponses: {
                    createMany: {
                        data: validatedData.surveyResponses,
                    }
                }
            },
            include: {
                surveyResponses: true,
            }
        })

        if (!updatedSurvey) {
            res.status(404).json({ message: 'Survey response not found' });
            return;
        }
        res.status(200).json(updatedSurvey);
    } catch (error) {
        next(error);
    }
};