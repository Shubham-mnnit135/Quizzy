export const HtmlContentForRegistration= (username) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            padding: 20px;
            background-color: #f9f9f9;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-align: center;
        }
        .content {
            margin: 20px 0;
        }
        .footer {
            background-color: #f1f1f1;
            color: #333;
            padding: 10px 20px;
            text-align: center;
            font-size: 12px;
        }
        .signature {
            margin-top: 20px;
        }
        p {
          color: #000
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Our Platform! 🤩</h1>
        </div>
        <div class="content">
            <p>Dear ${username},</p>
            <p>Thank you for registering on our platform. Your registration was successful.</p>
            <p>We are excited to have you with us. Feel free to explore our services and let us know if you have any questions.</p>
            <div class="signature">
                <p>Thanks & Regards,</p>
                <p>Quizzy Team</p>
            </div>
        </div>
        <div class="footer">
            <p>&copy; 2024 Quizzy. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
