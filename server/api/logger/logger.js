export const apiLogger = (req) => {
    const currentTime = new Date()
    return `${currentTime} - [${req.originalUrl}]`
}
