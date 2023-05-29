export const getUsername = (user) => {
  let username = user || " ";
  let t = "";
  for (let i = 0; i < username.length; i++) {
    if (username[i] === "." || username[i] === "@") {
      continue;
    } else {
      t += username[i];
    }
  }
  return t;
};
