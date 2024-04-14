import React, { useState } from 'react'; // Import React and useState
import './Signup.css'; // Import CSS file
import HeadingComp from './HeadingComp'; // Import HeadingComp component
import axios from 'axios'; // Import axios for HTTP requests 
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from React Router DOM

// Define the Signup component
const Signup = () => {
    const history = useNavigate(); // Get the history object from useNavigate hook

    // Define state variables for email, username, and password
    const [Inputs, setInputs] = useState({ email:"", username:"", password:"" });

    // Function to handle input changes
    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    }

    // Function to handle form submission
    const submit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1000/api/v1/register', Inputs);
            if (response.status === 200) {
                alert(response.data.message); // Display success message
                setInputs({ email:"", username:"", password:"" });
                history('/signin'); // Redirect to the sign-in page
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                alert(errorMessage); // Display error message from the server
            } else {
                console.error("Error occurred:", error); // Log other types of errors
                alert("An error occurred. Please try again later."); // Display generic error message
            }
        }
    }

    // Render the Signup component
    return (
        <div className="signup">
            <div className="container">
                <div className="row">
                    {/* Signup form */}
                    <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                        <div className='d-flex flex-column w-100 p-5'>
                            {/* Email input */}
                            <input className='p-2 my-3 input-signup' type="email" name='email' placeholder='Enter your Email' onChange={change} value={Inputs.email}/>
                            {/* Username input */}
                            <input className='p-2 my-3 input-signup' type="username" name='username' placeholder='Enter your User Name' onChange={change} value={Inputs.username} />
                            {/* Password input */}
                            <input className='p-2 my-3 input-signup' type="password" name='password' placeholder='Enter your Password' onChange={change} value={Inputs.password}/>
                            {/* Submit button */}
                            <button className='btn p-2' onClick={submit}>SignUp</button>
                        </div>
                    </div>
                    {/* HeadingComp component */}
                    <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center">
                        <HeadingComp first="Sign" second="Up" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup; // Export the Signup component
