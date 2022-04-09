import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faComment } from "@fortawesome/free-solid-svg-icons";

export const BugModal = ({bug}) => {
  const { name, author, details, createdAt, priority, status, comments } = bug;
  const navigate = useNavigate();

  useEffect(() => {

  }, [bug])

  console.log(bug)

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/bugView', {
      state: {
        bug: bug
      }
    })
  }


  return (
    <div className="bug-container" onClick={handleClick}>
      <Link to="/edit" state={bug}>
        <FontAwesomeIcon icon={faPencil} className="edit" />
      </Link>
      <div className="bug-container-name-wrapper">
        <h1>{name}</h1>
        <div className="comments">
          <FontAwesomeIcon icon={faComment} className="comment-icon" />
          <div>{comments.length}</div>
        </div>
      </div>
      <div className="bug-container-date-wrapper">
        <div className="bug-date">{createdAt}</div>
      </div>
      <div className="bug-container-author-wrapper">
        <div className="bug-author">{author}</div>
      </div>
      <div className="bug-container-status-wrapper">
        <div style={status === "open" ? {backgroundColor: "green"} : {backgroundColor: "red"}} >{status}</div>
      </div>
    </div>
  );
};
