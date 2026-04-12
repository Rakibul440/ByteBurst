import { transporter } from "../config/mail.config.js";
import { otpTemplate } from "../templates/otp.template";
import { otpTemplate_2 } from "../templates/otp.template-2.js";

export const sendmail = async (code: string, email: string) => {
    try {
        await transporter.sendMail({
            from: `"ByteBurst Team" <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Verify Email",
            text: code,
            html: otpTemplate_2(code)
        })
    } catch (error: any) {
        console.error("Error while sending mail:", error);
        throw error
    }
}
