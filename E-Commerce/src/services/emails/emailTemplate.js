export const emailTemplate = (token) => {
  return `
  <h1>Hello</h1>
  <p>Click <a href="${process.env.BASE_URL}/api/v1/auth/verify/${token}">here</a> to verify your email</p>
  <div>
    <p>If you did not request this, please ignore this email.</p>
    <p>This email was sent to you, because you signed up for a FreshCart account.</p>
    <span>The link will expire in 1 hour.</span>
  </div>
  `;
};
