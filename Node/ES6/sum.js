function work() {
  console.log("this is developer from app.js");
}
function sum(a, b) {
  let c = a + b;
  console.log(c);
}
let global = "my name is kebede";
function someFunction() {
  let AAvar = 2;
  console.log(AAvar);
}

export default sum;
export { someFunction, global };
