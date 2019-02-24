import * as createError from "http-errors";
import * as format from "string-template";

import { config } from '../config';

const sendGridClient = require("@sendgrid/client");

export interface ISendGridClientService {

    createCustomFields(name): Promise<any>;

    createContactList(name): Promise<any>;

    createRecipients(data): Promise<any>;

    addSingleRecipientToList(listId, recipientId): Promise<any>;

    addMultiRecipientsToList(listId, recipientIds): Promise<any>;

    listRecipientsInList(listId, page, pageSize): Promise<any>;
}

/**
 * Contact API
 * https://sendgrid.com/docs/API_Reference/Web_API_v3/Marketing_Campaigns/contactdb.html#Retrieve-a-List-GET
 */
export class SendGridClientService implements ISendGridClientService {

    constructor() {
        sendGridClient.setApiKey(config.email.sendgrid.apiKey);
    }

    createCustomFields = async (name) => {
        try {
            const result = await sendGridClient
                .request({
                    method: "POST",
                    url: "/v3/contactdb/custom_fields",
                    body: {
                        name: name,
                        type: "text",
                    },
                });

            return {
                data: {
                    code: 200,
                    result: result.body,
                },
            };
        } catch(error) {
            console.log(error);
            return { error: createError(500, error) };
        } 
    };

    createContactList = async (name) => {
        try {
            const result = await sendGridClient
                .request({
                    method: "POST",
                    url: "/v3/contactdb/lists",
                    body: {
                        name: name,
                    },
                });

            return {
                data: {
                    code: 200,
                    result: result ? result[1] : null,
                },
            };
        } catch(error) {
            console.log(error);
            return { error: createError(500, error) };
        } 
    };

    createRecipients = async (data) => {
        try {
            const result = await sendGridClient
                .request({
                    method: "POST",
                    url: "/v3/contactdb/recipients",
                    body: [
                        ...data,
                    ],
                });

            return {
                data: {
                    code: 200,
                    result: result ? result[1] : null,
                },
            };
        } catch(error) {
            console.log(error);
            return { error: createError(500, error) };
        }
    };

    addSingleRecipientToList = async (listId, recipientId) => {
        try {
            const result = await sendGridClient
                .request({
                    method: "POST",
                    url: format("/v3/contactdb/lists/{list_id}/recipients/{recipient_id}", {
                        list_id: listId,
                        recipient_id: recipientId,
                    }),
                });

            return {
                data: {
                    code: 200,
                    result: result ? result[1] : null,
                },
            };
        } catch(error) {
            console.log(error);
            return { error: createError(500, error) };
        }
    };

    addMultiRecipientsToList = async (listId, recipientIds) => {
        try {
            const result = await sendGridClient
                .request({
                    method: "POST",
                    url: format("/v3/contactdb/lists/{list_id}/recipients", {
                        list_id: listId,
                    }),
                    body: [
                        ...recipientIds
                    ],
                });

            return {
                data: {
                    code: 200,
                    result: result ? result[1] : null,
                },
            };
        } catch(error) {
            console.log(error);
            return { error: createError(500, error) };
        }
    };

    listRecipientsInList = async (listId, page, pageSize) => {
        try {
            const result = await sendGridClient
                .request({
                    method: "GET",
                    url: format("/v3/contactdb/lists/{list_id}/recipients?page={page}&page_size={page_size}", {
                        list_id: listId,
                        page: page,
                        page_size: pageSize,
                    }),
                });

            return {
                data: {
                    code: 200,
                    result: result ? result[1] : null,
                },
            };
        } catch(error) {
            console.log(error);
            return { error: createError(500, error) };
        }
    }
}
