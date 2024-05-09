export const validation = (values) => {
    const errors = {};

    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phonePattern = /([0-9]){10}/;
    const fullNamePattern = /^[a-zA-Z ]+$/;
    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (!values.fullName?.trim()) {
        errors.fullName = "Full Name is required";
    } else if (!fullNamePattern.test(values.fullName.trim())) {
        errors.fullName = "Full Name must consist only of alphabetic characters";
    }

    if (!values.email?.trim()) {
        errors.email = "Email is required";
    } else if (!emailPattern.test(values.email.trim())) {
        errors.email = "Invalid email";
    }

    if (!values.address?.trim()) {
        errors.address = "Address is required";
    }

    if (!values.phone?.trim()) {
        errors.phone = "Phone is required";
    } else if (!phonePattern.test(values.phone.trim())) {
        errors.phone = "The phone number consists of 10 numeric characters";
    }

    if (!values.password?.trim()) {
        errors.password = "Password is required";
    } else if (!passPattern.test(values.password.trim())) {
        errors.password = "The password must be 8-16 characters long, including uppercase letters, lowercase letters, numbers, and special characters.";
    }

    return errors;
};
