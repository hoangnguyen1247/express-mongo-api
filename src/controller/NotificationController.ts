import { Request, Response, NextFunction } from "express";
import * as createError from "http-errors";

import { BaseController } from "./BaseController";
import { INotificationService } from "../service/NotificationService";

export class NotificationController extends BaseController {

    private _notificationService: INotificationService;

    constructor(dIContainer) {
        super();

        this._notificationService = dIContainer.get("notificationService");
    }

    /**
     * @swagger
     * /api/notifications/verify-email:
     *   post:
     *     tags:
     *       - Notifications
     *     summary: Sign Up
     *     description: Sign Up
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: data
     *         description: Auth data
     *         schema:
     *           type: object
     *           properties:
     *             email:
     *               type: string
     *               example: "user@domain.com"
     *           required:
     *             - email
     *     responses:
     *       200:
     *         description: Ok
     */
    verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
        const toEmail = req.body.email;

        if (!toEmail) {
            return next(createError(400));
        }

        const channels = ["email"];
        const dataObjs = [
        ];
        const { error, data} = await this._notificationService.verifyEmail(channels, dataObjs);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({...data});
    };
}
