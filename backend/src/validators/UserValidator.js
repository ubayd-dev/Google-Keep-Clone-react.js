export class UserValidator{

    static validateCreateUser(req, res, next) {
        const { name, email } = req.body
        if (!name || typeof name !== "string") {
            return
            res.status(400).json({error: "Name is required and must be a string"})
        }

        if (!email || typeof email !== "string") {
            return
                res.status(400).json({error: "Email is required and must be a string"})
        }
        next()
    }
}