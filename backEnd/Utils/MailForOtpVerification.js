
export const HtmlContentForVerification = (otp) => `
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
                <h1>OTP Verification</h1>
            </div>
            <div class="content">
                <p>Dear</p>
                <p>Thank you for registering with us. Please use the following One-Time Password (OTP) to verify your email address and complete the registration process.</p>
                <p><strong>OTP: ${otp}</strong></p>
                <p>This OTP is valid for 10 minutes and supersedes any previously issued OTPs. Please do not share this code with anyone.</p>
                <p>If you did not request this OTP, please ignore this email or contact our support team.</p>
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





        