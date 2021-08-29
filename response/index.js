module.exports = {
    success: (response, message) => {
        response.status(200).json({
            status: "success",
            message,
        });
    },
    fail: (response, message) => {
        response.status(200).json({
            status: "error",
            message,
        });
    },
    redirect: (response, message) => {
        response.status(300).json({
            status: "server redirected",
            message,
        });
    },
    clientError: (response, message) => {
        response.status(400).json({
            status: "client error",
            message,
        });
    },
    serverError: (response, message) => {
        response.status(500).json({
            status: "server error",
            message,
        });
    },
};
