export const requiredField = value => {
    if (value) return undefined;

    return "Это обязательное поле";
};