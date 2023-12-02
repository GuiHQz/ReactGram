import "./Message.css";

interface Message {
  msg: string;
  type: string;
}

export const Message = ({msg, type}: Message) => {
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  );
};
