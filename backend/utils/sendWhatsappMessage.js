const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = require('twilio')(accountSid, authToken, {
    lazyLoading: true
})

// Function to send message to whatsApp

const sendMessage = async (phoneNumber, verifyCode) => {
    try {
        await client.messages
            .create({
                body: verifyCode,
                from: `whatsapp:+212622920600`,
                to: `whatsapp:${phoneNumber}`
            })
    } catch (err) {
        console.log(`Error at sendMessage: ${err.message}`);
    }
}

module.exports = { sendMessage }

