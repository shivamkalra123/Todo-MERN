import React from 'react';

const Update = ({ onClose }) => {
  return (
    <div className='update-overlay'>
      <div className='update-content p-5'>
        <h3>Update Your Task</h3>
        {/* Your update form content goes here */}
        <input type="text" className='todo-inputs my-4 w-100 p-3'/>
        <textarea className='todos-inputs w-100 p-3'></textarea>
        <div>
        <button className='btn btn-dark my-4'  onClick={onClose}>UPDATE</button>
        <button className='btn btn-dark my-4 mx-3' onClick={onClose}>Close</button>
        </div>
       
      </div>
    </div>
  )
}

export default Update;
