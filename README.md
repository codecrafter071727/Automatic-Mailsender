🚀 Bulk Email Sender API

An advanced bulk email sending API that allows you to send 2500+ emails per day by automatically switching between multiple Gmail accounts. Perfect for newsletters, event invitations, and bulk notifications! 📩

🌟 Features

✅ Send emails to thousands of recipients✅ Auto-switching between multiple sender accounts✅ Easy JSON-based API request✅ Error handling and validation✅ Secure & scalable

⚡ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/your-repo/email-sender-api.git


2️⃣ Install Dependencies

npm install

3️⃣ Configure Environment Variables

Create a .env file and add your Gmail credentials:

EMAILS=email1@gmail.com,email2@gmail.com,email3@gmail.com,email4@gmail.com,email5@gmail.com
PASSWORDS=password1,password2,password3,password4,password5

⚠ Note: App passwords are required. Enable 2-Step Verification and generate App Passwords.

🚀 API Usage

📩 Send Emails

Endpoint: POST /send-emails

Request Body: (JSON)

{
    "recipients": ["user1@example.com", "user2@example.com"],
    "subject": "Your Subject Here",
    "message": "Your Email Content Here"
}

Response: (Success ✅)

{
    "success": "Emails sent successfully!"
}

Response: (Error ❌)

{
    "error": "No recipients provided"
}

🛠 Tech Stack

Node.js (Backend API)

Express.js (Routing)

Nodemailer (Email handling)

Postman (Testing API)

📜 License

This project is open-source and free to use. Feel free to contribute! 🎉

💡 Contributions & feedback are welcome! 🚀

