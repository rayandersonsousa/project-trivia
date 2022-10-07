const TYPE_EMAIL_USER = 'TYPE_EMAIL_USER';

const actionEmail = (email, user) => ({
  type: TYPE_EMAIL_USER,
  payload: { email, user },
});

export { actionEmail, TYPE_EMAIL_USER };
