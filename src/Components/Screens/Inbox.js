import { useEffect, useState } from "react";

const Inbox = () => {
  let mails = [];
  const [inboxMail, setInboxMail] = useState([]);
  let username = localStorage.getItem("email") || " ";
  let t = "";
  for (let i = 0; i < username.length; i++) {
    if (username[i] === "." || username[i] === "@") {
      continue;
    } else {
      t += username[i];
    }
  }
  username = t;

  useEffect(() => {
    
  })

  return <div>Inbox</div>;
};

export default Inbox;
