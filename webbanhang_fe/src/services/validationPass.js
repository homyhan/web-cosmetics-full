export const validationPass = (values) => {
    const errors = {};
    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (!values.password?.trim()) {
        errors.password = "Password is required";
    } else if (!passPattern.test(values.password.trim())) {
        errors.password = "The password must be 8-16 characters long, including uppercase letters, lowercase letters, numbers, and special characters.";
    }

    return errors;
};
