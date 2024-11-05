const nodemailer = require("nodemailer");

// Create a transporter using your email service configuration
const transporter = nodemailer.createTransport({
  service: "Gmail", // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // This will ignore self-signed certificate errors
  },
});

// Function to send registration success email for individual solutions
const sendRegSuccessMail1 = async (data) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    employmentStatus,
    jobTitle,
    selectedSolution,
  } = data;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Registration Confirmation",
    html: `
       <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Confirmation</title>
        </head>
        <body>
                <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Registration Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: white;">
              <tr>
                 <td style="background-color: #1e293b; padding: 20px; text-align: center;">
    <img src='https://res.cloudinary.com/dxmiz9idd/image/upload/v1730724855/CredulenLogo_n8wexs.png' 
         alt="Creculen Logo" 
         width="200" height="70"> <!-- Adjust the values as needed -->
</td>
              </tr>
              <tr>
                  <td style="padding: 40px 20px; text-align: center;">
                      <h1 style="color: #047481; margin: 0 0 20px 0; font-size: 28px;">Registration Confirmed!</h1>
                      <p style="color: #1e293b; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
                          Thank you for registering for our solutions at Creculen. We're excited to help you unlock intelligence and create value in your journey.
                      </p>
                  </td>
              </tr>
              <tr>
                  <td style="padding: 0 20px 30px;">
                   <div style="position: relative; border-radius: 8px; overflow: hidden; padding: 20px;">
   <div style="background-image: url(https://res.cloudinary.com/dxmiz9idd/image/upload/v1730725044/insight_gggtlk.jpg); background-size: cover; filter: blur(20px); position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 0;"></div>
    <div style="background-color: rgba(248, 249, 250, 0.8); border-radius: 8px; position: relative; z-index: 1; padding: 20px;">
        <h2 style="color: #047481; font-size: 20px; margin: 0 0 20px 0;">Registration Details</h2>
        <table cellpadding="0" cellspacing="0" width="100%" style="color: #666;">
          <tr>
                                  <td style="padding: 8px 0;"><strong>Name:</strong></td>
                                  <td style="padding: 8px 0;">${firstName} ${lastName}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 8px 0;"><strong>Email:</strong></td>
                                  <td style="padding: 8px 0;">${email}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 8px 0;"><strong>Phone:</strong></td>
                                  <td style="padding: 8px 0;">${phoneNumber}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 8px 0;"><strong>Employment Status:</strong></td>
                                  <td style="padding: 8px 0;">${employmentStatus}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 8px 0;"><strong>Selected Solution:</strong></td>
                                  <td style="padding: 8px 0;">${selectedSolution}</td>
                              </tr>
        </table>
    </div>
</div>

                  </td>
              </tr>
              <tr>
                  <td style="padding: 0 20px 40px;">
                      <p style="color: #1e293b; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                          Our team will review your registration and contact you within the next 24-48 hours to discuss the next steps and customize our solution to your specific needs.
                      </p>
                      <p style="color: #1e293b; font-size: 16px; line-height: 1.5;">
                          In the meantime, if you have any questions, please don't hesitate to reach out to our support team at <a href="mailto:support@creculen.com" style="color: #0066cc; text-decoration: none;">support@creculen.com</a>
                      </p>
                  </td>
              </tr>
              <tr>
                  <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
                      <p style="color: #1e293b; font-size: 14px; margin: 0;">
                          © 2024 Creculen. All rights reserved.
                      </p>
                  </td>
              </tr>
          </table>
      </body>
      </html>
        </body>
        </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

// Function to send registration success email for consulting services
const sendRegSuccessMail2 = async (data) => {
  const {
    fullName,
    phoneNumber,
    email,
    employmentStatus,
    jobTitle,
    selectedSolution,
    slug,
    solutionCategory,
    companyName,
    companyIndustry,
    companySize,
    country,
    firstName,
    lastName,
    solutionType,
  } = data;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Registration Confirmation",
    html: `
      
         <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Confirmation</title>
        </head>
        <body>
                <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Registration Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: white;">
              <tr>
                 <td style="background-color: #1e293b; padding: 20px; text-align: center;">
    <img src='https://res.cloudinary.com/dxmiz9idd/image/upload/v1730724855/CredulenLogo_n8wexs.png' 
         alt="Creculen Logo" 
         width="200" height="70"> <!-- Adjust the values as needed -->
</td>
              </tr>
              <tr>
                  <td style="padding: 40px 20px; text-align: center;">
                      <h1 style="color: #047481; margin: 0 0 20px 0; font-size: 28px;">Registration Confirmed!</h1>
                      <p style="color: #1e293b; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
                          Thank you for registering for our solutions at Creculen. We're excited to help you unlock intelligence and create value in your journey.
                      </p>
                  </td>
              </tr>
              <tr>
                  <td style="padding: 0 20px 30px;">
                   <div style="position: relative; border-radius: 8px; overflow: hidden; padding: 20px;">
   <div style="background-image: url(https://res.cloudinary.com/dxmiz9idd/image/upload/v1730725044/insight_gggtlk.jpg); background-size: cover; filter: blur(20px); position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 0;"></div>
    <div style="background-color: rgba(248, 249, 250, 0.8); border-radius: 8px; position: relative; z-index: 1; padding: 20px;">
        <h2 style="color: #047481; font-size: 20px; margin: 0 0 20px 0;">Registration Details</h2>
        <table cellpadding="0" cellspacing="0" width="100%" style="color: #666;">
        

  <tr>
                <td style="padding: 8px 0;"><strong>Name:</strong></td>
                <td style="padding: 8px 0;">${fullName}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;">${email}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0;">${phoneNumber}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0;"><strong>Employment Status:</strong></td>
                <td style="padding: 8px 0;">${employmentStatus}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0;"><strong>Job Title:</strong></td>
                <td style="padding: 8px 0;">${jobTitle}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0;"><strong>Selected Solution:</strong></td>
                <td style="padding: 8px 0;">${selectedSolution}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0;"><strong>Solution Type:</strong></td>
                <td style="padding: 8px 0;">${solutionCategory}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0;"><strong>Company Name:</strong></td>
                <td style="padding: 8px 0;">${companyName}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0;"><strong>Company Industry:</strong></td>
                <td style="padding: 8px 0;">${companyIndustry}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0;"><strong>Company Size:</strong></td>
                <td style="padding: 8px 0;">${companySize}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0;"><strong>Country:</strong></td>
                <td style="padding: 8px 0;">${country}</td>
            </tr>
        </table>
    </div>
</div>

                  </td>
              </tr>
              <tr>
                  <td style="padding: 0 20px 40px;">
                      <p style="color: #1e293b; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                          Our team will review your registration and contact you within the next 24-48 hours to discuss the next steps and customize our solution to your specific needs.
                      </p>
                      <p style="color: #1e293b; font-size: 16px; line-height: 1.5;">
                          In the meantime, if you have any questions, please don't hesitate to reach out to our support team at <a href="mailto:support@creculen.com" style="color: #0066cc; text-decoration: none;">support@creculen.com</a>
                      </p>
                  </td>
              </tr>
              <tr>
                  <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
                      <p style="color: #1e293b; font-size: 14px; margin: 0;">
                          © 2024 Creculen. All rights reserved.
                      </p>
                  </td>
              </tr>
          </table>
      </body>
      </html>
        </body>
        </html>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

// Export the email functions
module.exports = {
  sendRegSuccessMail1,
  sendRegSuccessMail2,
};
