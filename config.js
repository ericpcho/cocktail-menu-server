exports.DATABASE_URL =
global.DATABASE_URL ||
process.env.DATABASE_URL ||
'mongodb://localhost/jwt-auth-demo';
exports.PORT = process.env.PORT || 8080;