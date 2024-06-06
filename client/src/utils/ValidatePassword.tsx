export const validatePassword = (password: string, confirmPassword: string) => {
  const pswValidation: string[] = [];

  if (password !== confirmPassword) {
    pswValidation.push("Provided passwords don't match!");
  } else {
    // Since provided passwords match only one of them needs to be tested
    if (!/[a-z]/.test(password)) {
      pswValidation.push(
        'Password needs to have at least one lowercase letter!',
      );
    }

    if (!/[A-Z]/.test(password)) {
      pswValidation.push(
        'Password needs to have at least one uppercase letter!',
      );
    }

    if (!/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(password)) {
      pswValidation.push(
        'Password needs to contain at least 1 special character!',
      );
    }

    if (!/[0-9]/.test(password)) {
      pswValidation.push('Password needs to contain at least one number!');
    }
  }

  return pswValidation;
};
