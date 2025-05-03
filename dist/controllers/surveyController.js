"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSurvey = exports.createSurvey = void 0;
const config_1 = require("../config/config");
const email_templates_1 = require("../utils/email-templates");
const client_1 = require("../db/client");
const SurveyResponse_1 = require("../types/SurveyResponse");
const Waitlist_1 = require("../types/Waitlist");
const createSurvey = async (req, res, next) => {
    try {
        const validatedData = Waitlist_1.CreateWaitlist.parse(req.body);
        const { email, name } = validatedData;
        let userName = name;
        if (name === '')
            userName = undefined;
        const waitlist = await client_1.prisma.waitlist.create({
            data: {
                name: userName,
                email,
            }
        });
        if (!waitlist)
            throw new Error('Unexpected error trying to add you to the waitlist');
        config_1.Queue.addJob({
            data: {
                email,
                subject: `You're officially on the TripWise waitlist! 🎒✈️`,
                body: (0, email_templates_1.getWelcomeEmail)(name),
            },
            name: `Added to queue. Welcome email to: ${email}`,
        });
        res.status(201).json(waitlist);
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
        const validatedData = SurveyResponse_1.UpdateSurveySchema.parse(req.body);
        const updatedSurvey = await client_1.prisma.waitlist.update({
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
        });
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
