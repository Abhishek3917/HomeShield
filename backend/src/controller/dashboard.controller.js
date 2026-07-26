import { getDashboard } from "../services/dashboard.service.js"


export const dashboard = async (req,res,next) =>{

    try {
        const data = await getDashboard(req.user)
        return res.status(200).json(data);
        
    } catch (error) {
        next(error)
    }
}

export const dashActivity = async (req, res, next) => {
    try {

        const data = await getDashboardActivity(req.user);

        return res.status(200).json(data);

    } catch (error) {
        next(error);
    }
};

export const dashHealth = async (req, res, next) => {
    try {

        const data = await getDashboardHealth();

        return res.status(200).json(data);

    } catch (error) {
        next(error);
    }
};