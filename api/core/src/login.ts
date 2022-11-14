import { API, RegisterOptions } from "lambda-api";
import prisma from '../prisma/prisma';

module.exports = (api: API, opts: RegisterOptions) => {
    api.post("/", async (req, res) => {
        try {
            if (req.body.username == null || req.body.password == null) {
                res.status(200).json({ success: false });
                return;
            }
            const user = await prisma.user.findFirst({
                where: {
                    username: req.body.username,
                    password: req.body.password
                }
            });
            if (user != null) {
                res.cookie('TOKEN', 'bar', { secure: true }).send({ success: true });
            } else {
                res.status(200).json({ success: false });
            }
        } catch (e) {
            console.error(e);
            res.error(e);
        }
    });
};