export const emailTemplate = (token) => {
  return `
  <h1>Hello</h1>
  <p>Click <a href="http://localhost:4000/auth/verify/${token}">here</a> to verify your email</p>
  <div>
    <p>If you did not request this, please ignore this email.</p>
    <p>This email was sent to ${email} because you signed up for a Sticky Notes account.</p>
    <span>The link will expire in 1 hour.</span>
  </div>
  `;
};
