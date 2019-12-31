module.exports = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    useUnifiedTopology: process.env.USE_UNIFIED_TOPOLOGY,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE
}
