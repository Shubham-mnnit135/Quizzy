const formatTime = (time) => String(time).padStart(2, '0');
export const HtmlContentForQuizSubmission = (username, quizID, marks, totalMarks, timeTaken, right, wrong, notAnswered) => `
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
            <h1>Quiz Submission Confirmation 👏</h1>
        </div>
        <div class="content">
            <p>Dear ${username},</p>
            <p>Thank you for submitting your quiz on our platform. Your submission has been received successfully.</p>
            <p><strong>Your Quiz ID: ${quizID}</strong></p>
            <p><strong>Marks: ${marks}/${totalMarks}</strong></p>
            <p><strong>Time Taken: ${formatTime(Math.round(timeTaken/3600))}:${formatTime(Math.round((timeTaken % 3600) / 60))}:${formatTime(timeTaken % 60)}</strong> ⏰</p>
            <p><strong>Right: ${right}</strong> 🫡</p>
            <p><strong>Wrong: ${wrong}</strong> 😭</p>
            <p><strong>Not Attempted: ${notAnswered}</strong> 🤐</p>
            <p>You can use this ID to review your submission or for any future references.</p>
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
