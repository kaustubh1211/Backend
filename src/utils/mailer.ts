import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    }
})

export const sendEmail = async (
    to: string,
    subject: string,
    html: string
  ): Promise<void> => {
    await transport.sendMail({
      from: `"Social App" <${process.env.EMAIL_USER}>`,
      to, 
      subject,
      html,
    });
  };