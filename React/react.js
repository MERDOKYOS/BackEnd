// const { createElement } = require("react");

// const all = React.createElement(
//   "ul",
//   null,
//   React.createElement("li", null, "abebe"),
//   React.createElement("li", null, "keede"),
//   React.createElement("li", null, "demeku"),
// );
// console.log(all);
// ReactDOM.render(all, document.body);

let arr = ["abebe", "kebede", "su"];
const root = ReactDOM.createRoot(document.getElementById("com"));
let x = 0;
setInterval(() => {
  arr[0] =
    x % 2 == 0
      ? React.createElement("li", { class: "yellow" }, "abebe")
      : React.createElement("li", { class: "red" }, "KORI");

  let create = React.createElement(
    "ul",
    null,
    arr[0],
    React.createElement("li", null, "kebede"),
    React.createElement("li", null, "su"),
  );
  root.render(create);

  x++;
}, 3000);
