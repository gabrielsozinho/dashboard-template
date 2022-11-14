import { APIGatewayEvent, Context } from 'aws-lambda';
import createAPI from 'lambda-api';

const api = createAPI();

api.register(require("./src/login"), { prefix: "/login" });
api.register(require("./src/logout"), { prefix: "/logout" });

api.use(async (req, res, next) => {
    try {
        if (req.cookies['TOKEN'] == 'bar') {
            next();
        } else {
            res.error(401, 'Not Authorized');
        }
    } catch(err) {
        res.error(401, 'Not Authorized');
    }
});

api.register(require("./src/user"), { prefix: "/user" });

export async function handler(event: APIGatewayEvent, context: Context, callback: any) {
    return await api.run(event, context);
}