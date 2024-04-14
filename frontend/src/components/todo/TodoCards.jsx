import React, { useState } from 'react';
import { MdOutlineDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import Update from './Update'; // Import the Update component

const TodoCards = ({ title, body, id, delid }) => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const toggleUpdate = () => {
    setIsUpdateOpen(!isUpdateOpen);
  };

  return (
    <div className='p-3 todo-card d-flex flex-column justify-content-between'>
      {/* Displaying Todo item */}
      <div>
        <h5>{title}</h5>
        <p className='todo-card-p'>{body.substring(0, 77)}...</p>
      </div>
      <div className="d-flex justify-content-around">
        {/* Update button */}
        <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1' onClick={toggleUpdate}>
          <GrDocumentUpdate className='card-items' />Update
        </div>
        {/* Delete button */}
        <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger' onClick={() => { delid(id); }}>
          <MdOutlineDelete className='card-items del' />Delete
        </div>
      </div>
      {/* Conditionally render the Update component based on isUpdateOpen state */}
      {isUpdateOpen && <Update onClose={toggleUpdate} />}
    </div>
  );
}

export default TodoCards;
