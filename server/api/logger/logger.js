export const apiLogger = (req) => {
    const currentTime = new Date()
    let username
    if (req.user) {
        username = req.user.username
    }
    return `${currentTime} - [${req.method}][${req.originalUrl}]${username ? ' - [' + username + ']' : ''}`
}
