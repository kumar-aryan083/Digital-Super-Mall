import adminModel from "../models/admin.model.js";

export const handleLogout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax'
        }).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log(error);
    }
}
export const checkAdmin = async (req, res) => {
    try {
        const admin = await adminModel.findById(req.user.id);
        if (admin) {
            return res.json({
                success: true,
                message: 'admin found'
            })
        } else {
            return res.json({
                success: false,
                message: 'admin not found'
            })
        }
    } catch (error) {
        console.error(error);
    }

}