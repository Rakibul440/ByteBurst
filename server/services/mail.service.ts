import { transporter } from "../config/mail.config.js";
import { otpTemplate } from "../templates/otp.template";
import { otpTemplate_2 } from "../templates/otp.template-2.js";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


// export const sendmail = async (code: string, email: string) => {
//     try {
//         await transporter.sendMail({
//             from: `"ByteBurst Team" <${process.env.MAIL_USER}>`,
//             to: email,
//             subject: "Verify Email",
//             text: code,
//             html: otpTemplate_2(code)
//         })
//     } catch (error: any) {
//         console.error("Error while sending mail:", error);
//         throw error
//     }
// }

// 

export const sendmail = async (code: string, email: string) => {
    try {
        await resend.emails.send({
            from: 'ByteBurst <noreply@byte-burst.in>',
            to: email,
            subject: 'OTP Verification',
            html: otpTemplate_2(code),
        });
    } catch (error: any) {
        console.error("Error while sending mail:", error);
        throw error
    }
}



