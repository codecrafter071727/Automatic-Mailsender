const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const logger = require("./logger");

const app = express();
app.use(express.json());

// Load email credentials from .env
const emailAccounts = JSON.parse(process.env.EMAILS);
const passwords = JSON.parse(process.env.PASSWORDS);
const maxEmailsPerAccount = 500;

let currentAccountIndex = 0;
let emailsSentFromCurrent = 0;

// Function to get the next available email account
const getNextAccount = () => {
    currentAccountIndex = (currentAccountIndex + 1) % emailAccounts.length;
    emailsSentFromCurrent = 0;
};

// Function to create a mail transporter
const createTransporter = (email, password) => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: password
        }
    });
};

// API Endpoint to send bulk emails
app.post("/send-emails", async (req, res) => {
    const { recipients, subject, content } = req.body;

    if (!recipients || recipients.length === 0) {
        return res.status(400).json({ error: "No recipients provided" });
    }

    let sentCount = 0;

    for (let i = 0; i < recipients.length; i++) {
        if (emailsSentFromCurrent >= maxEmailsPerAccount) {
            getNextAccount();
        }

        const email = emailAccounts[currentAccountIndex];
        const password = passwords[currentAccountIndex];
        const transporter = createTransporter(email, password);

        const mailOptions = {
            from: email,
            to: recipients[i],
            subject,
            text: content
        };

        try {
            await transporter.sendMail(mailOptions);
            emailsSentFromCurrent++;
            sentCount++;
            logger.info(`Email sent to ${recipients[i]} from ${email}`);
        } catch (error) {
            logger.error(`Failed to send email to ${recipients[i]}: ${error.message}`);
        }
    }

    res.json({ message: `Emails sent successfully: ${sentCount}` });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
