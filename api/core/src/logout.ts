import { API, RegisterOptions } from "lambda-api";

module.exports = (api: API, opts: RegisterOptions) => {
    api.post("/", async (req, res) => {
        try {
            res.clearCookie('TOKEN', { secure: true }).send({ success: true });
        } catch (e) {
            console.error(e);
            res.error(e);
        }
    });
};