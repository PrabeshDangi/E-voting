//For debugging using console.
const random = async (req, res, next) => {
  console.log("Hello I am from random.js");
  next();
};
export { random };
