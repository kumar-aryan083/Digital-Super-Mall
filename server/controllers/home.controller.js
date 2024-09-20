import homeModel from "../models/home.model.js"

export const editHome = async (req, res) => {
    try {
        const {homeRow} = req.body;
        const home = await homeModel.findOneAndUpdate({}, {$set: {homeRow}}, { new: true, upsert: true });
        if (home) {
            return res.json({
                success: true,
                message: "home array updated",
                home
            })
        } else {
            return res.json({
                success: false,
                message: "unable to create home array."
            })
        }
    } catch (error) {
        console.error(error);
    }
}

export const getHomeRow = async (req, res) => {
    try {
        const homeRow = await homeModel.find();
        if (homeRow) {
            return res.json({
                success: true,
                message: "All data fetched.",
                homeRow
            })
        } else {
            return res.json({
                success: true,
                message: 'unable to fetch data.'
            })
        }
    } catch (error) {
        console.error(error);
    }
}