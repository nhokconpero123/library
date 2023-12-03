function login(event) {
    event.preventDefault(); // Prevent default form submission

    // Sample User
    const sampleUsername = "sampleuser";
    const samplePassword = "samplepassword";

    // Get entered username and password
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;

    console.log("Entered credentials:", enteredUsername, enteredPassword);

    // Check if entered credentials match the sample user
    if (enteredUsername === sampleUsername && enteredPassword === samplePassword) {
        // Successful login
        console.log("Login successful!");

        // Redirect to the dashboard page
        location= "pages/admin/dashboard.html";
    } else {
        // Invalid credentials
        console.log("Invalid username or password");
    }
}
