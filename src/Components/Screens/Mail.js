import "./Mail.css";
// import { AiOutlineDelete, AiOutlineStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Mail = (props) => {
  const regex = /(<([^>]+)>)/gi;
  const editorMessage = props.mail.message.replace(regex, "");
  return (
    <div className="inbox_mail">
      <span>1</span>
      {/* {!props.mail.isOpen && props.isSentBox === false && <span className="dot"></span>} */}
      {props.isSentBox === false && (
        <NavLink state={props.mail} to={`/inbox/${props.mail.key}`}>
          <p>{props.mail.subject}</p>
        </NavLink>
      )}
      {props.isSentBox === true && (
        <NavLink state={props.mail} to={`/sent/${props.mail.key}`}>
          <p>{props.mail.subject}</p>
        </NavLink>
      )}
      <span className="delete_handler">2</span>
    </div>
  );
};
export default Mail;
