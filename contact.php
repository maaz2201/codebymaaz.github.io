<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // --- IMPORTANT: CONFIGURE YOUR EMAIL RECIPIENT ---
    $to = "your-email@example.com"; // <<<<<<< CHANGE THIS TO YOUR EMAIL ADDRESS

    // --- Sanitize and Validate Input ---
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);

    // Basic validation
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo "Please fill out all fields.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email format.";
        exit;
    }

    // --- Email Content ---
    $subject = "New Contact Form Submission from $name";
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // --- Email Headers ---
    $headers = "From: $name <$email>";

    // --- Send Email ---
    // Note: The mail() function requires a properly configured server to work.
    // On a local XAMPP/WAMP setup, you might need to configure sendmail.
    if (mail($to, $subject, $email_content, $headers)) {
        http_response_code(200);
        // Redirect to a 'thank you' page or display a success message.
        // For simplicity, we'll just echo a message.
        // A better approach would be to redirect.
        // header("Location: thank_you.html");
        echo "Thank you! Your message has been sent.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }

} else {
    // Not a POST request
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>