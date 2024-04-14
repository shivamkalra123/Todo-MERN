const mongoose = require("mongoose");

async function connectToDatabaseAndStartServer() {
    try {
        await mongoose.connect("mongodb+srv://Somil:Somil123@cluster0.e5dlrmq.mongodb.net/");
        console.log("Connection to the database is successful");

        // If you want to start the server here, you can import app.js and start it
        // const app = require("../app");
        // app.listen(1000, () => {
        //     console.log("Server started on port 1000");
        // });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        // Handle the error accordingly
    }
}

// Call the function to connect to the database and start the server
connectToDatabaseAndStartServer();

module.exports = connectToDatabaseAndStartServer; // Export the function for use in other files if needed
