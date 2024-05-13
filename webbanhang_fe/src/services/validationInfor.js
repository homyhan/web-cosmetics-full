export const validationInfor = (values) => {
    const errors = {};

    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phonePattern = /([0-9]){10}/;

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
    return errors;
};
