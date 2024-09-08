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