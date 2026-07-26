export const getDashboard = async (user) =>{
        return {
        user: {
            email: user.email
        },

        vpn: {
            status: "offline",
            connectedClients: 0
        },

        dns: {
            status: "offline",
            blockedToday: 0,
            queriesToday: 0
        },

        devices: {
            total: 0,
            online: 0
        },

        system: {
            status: "healthy"
        }
    }
}

export const getDashboardActivity = async ()=>{
    return {
    activities: []
    };
}

export const getDashboardHealth = async () => {

    return {
        backend: "healthy",
        mongodb: "healthy",
        adguard: "offline",
        wireguard: "offline"
    };

};