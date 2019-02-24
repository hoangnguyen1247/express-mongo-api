import FB from "fb";

export interface IFacebookService {

    getUserProfile(facebookId, accessToken): Promise<any>;
}

export class FacebookService implements IFacebookService {

    getUserProfile = async(facebook_id, access_token) => {
        try {
            const fbRes = await FB.api("/" + facebook_id, {
                access_token: access_token,
                fields: ['id', 'name', 'email', 'first_name', 'last_name']
            });

            return fbRes;
        }
        catch (error) {
            return [error];
        }
    }
}
