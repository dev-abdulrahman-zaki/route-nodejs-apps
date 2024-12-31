export const emailTemplate = (token) => {
  return `
  <h1>Hello</h1>
  <p>Click <a href="http://localhost:4000/auth/verify/${token}">here</a> to verify your email</p>
  `;
};
