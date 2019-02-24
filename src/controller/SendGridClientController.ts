import { Request, Response, NextFunction } from "express";
import * as createError from "http-errors";

import { BaseController } from "./BaseController";
import { ISendGridClientService } from "../service/SendGridClientService";

export class SendGridClientController extends BaseController {

    private _sendGridClientService: ISendGridClientService;

    constructor(dIContainer) {
        super();

        this._sendGridClientService = dIContainer.get("sendGridClientService");
    }

    /**
     * @swagger
     * /api/sendgrid/create-contact-list:
     *   post:
     *     tags:
     *       - SendGrid
     *     summary: Create contact list
     *     description: Create contact list
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: data
     *         description: Auth data
     *         schema:
     *           type: object
     *           properties:
     *             name:
     *               type: string
     *               example: "subscribed_user"
     *           required:
     *             - email
     *     responses:
     *       200:
     *         description: Ok
     */
    createContactList = async (req: Request, res: Response, next: NextFunction) => {
        const name = req.body.name;

        if (!name) {
            return next(createError(400));
        }

        const { error, data} = await this._sendGridClientService.createContactList(name);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({...data});
    };

    /**
     * @swagger
     * /api/sendgrid/create-recipients:
     *   post:
     *     tags:
     *       - SendGrid
     *     summary: Create recipients
     *     description: Create recipients
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
     *               example: "exampleuser@gmail.com"
     *             last_name:
     *               type: string
     *               example: TestUser
     *           required:
     *             - email
     *     responses:
     *       200:
     *         description: Ok
     */
    createRecipients = async (req: Request, res: Response, next: NextFunction) => {
        const email = req.body.email;
        const lastName = req.body.last_name;

        if (!email || !lastName) {
            return next(createError(400));
        }

        const { error, data } = await this._sendGridClientService.createRecipients([
            {
                email,
                last_name: lastName,
            }
        ]);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({...data});
    };

    /**
     * @swagger
     * /api/sendgrid/add-recipients-to-list/{listId}:
     *   post:
     *     tags:
     *       - SendGrid
     *     summary: Add recipients to list
     *     description: Add recipients to list
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: listId
     *         description: list id
     *         schema:
     *           type: string
     *       - in: body
     *         name: data
     *         description: Auth data
     *         schema:
     *           type: object
     *           properties:
     *             recipientIds:
     *               type: array
     *               items:
     *                 type: string
     *     responses:
     *       200:
     *         description: Ok
     */
    addRecipientsToList = async (req: Request, res: Response, next: NextFunction) => {
        const listId = req.params.listId;
        const recipientIds = req.body.recipientIds || [];

        if (!listId || !recipientIds) {
            return next(createError(400));
        }

        const { error, data} = await this._sendGridClientService.addMultiRecipientsToList(listId, recipientIds);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({...data});
    };

    /**
     * @swagger
     * /api/sendgrid/list-recipients-on-list/{listId}:
     *   get:
     *     tags:
     *       - SendGrid
     *     summary: List recipients on list
     *     description: List recipients on list
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: listId
     *         description: list id
     *         schema:
     *           type: string
     *       - in: query
     *         name: page
     *         description: page
     *         schema:
     *           type: string
     *       - in: query
     *         name: size
     *         description: size   
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Ok
     */
    listRecipientsOnList = async (req: Request, res: Response, next: NextFunction) => {
        const listId = req.params.listId;
        const page = req.query.page || 1;
        const size = req.query.size || 100;

        if (!listId) {
            return next(createError(400));
        }

        const { error, data} = await this._sendGridClientService.listRecipientsInList(listId, page, size);

        if (error) return next(error);
        res.status(data.code || 200)
            .json({...data});
    };
}
