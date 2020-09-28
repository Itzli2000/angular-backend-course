const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID);

googleVerify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;
    return { email, name, picture };
}

module.exports = {
    googleVerify
}
