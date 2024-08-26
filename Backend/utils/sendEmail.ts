import nodemailer from "nodemailer";

const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const htmlContent = `
        <html>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #333;">Hello,</h2>
                    <p style="font-size: 16px; line-height: 1.5;">${text}</p>
                    <footer style="margin-top: 20px; border-top: 1px solid #eaeaea; padding-top: 10px;">
                        <p style="font-size: 14px; color: #888;">Thank you for using our service.</p>
                        <p style="font-size: 14px; color: #888;">This project is designed for a company assignment to assess candidates' technical skills as the next step following the shortlisting process.</p>
                        <p style="font-size: 14px; color: #888;">If you have any questions, feel free to <a href="samrastogi9454@gmail.com" style="color: #007bff; text-decoration: none;">contact us</a>.</p>
                    </footer>
                </div>
            </body>
        </html>
    `;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: htmlContent,
    });
};

export default sendEmail;
