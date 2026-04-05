import { transporter } from "../config/mail.config";
import { otpTemplate } from "../templates/otp.template";

export const sendmail = async (code: string, email: string) => {
    try {
        await transporter.sendMail({
            from: `"ByteBurst Team" <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Verify Email",
            text: code,
            html: otpTemplate(code)
        })
    } catch (error: any) {
        console.error("Error while sending mail:", error);
        throw error
    }
}
