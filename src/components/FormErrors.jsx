export const FormErrors = ({ errors = {} }) => {
  return Object.values(errors).map((p) => p.message);
};
