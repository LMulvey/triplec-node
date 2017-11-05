<?php

// include the header partial view
include("views/partial_dashboard_header.php");

// show potential errors / feedback (from login object)
if (isset($login)) {
    if ($login->errors) {
        foreach ($login->errors as $error) {
            ?>
            <div class="alert alert-warning alert-dismissible" role="alert">
              <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <strong>Uh oh!</strong> <?php echo $error; ?>
            </div>
            <?php
        }
    }
    if ($login->messages) {
        foreach ($login->messages as $message) {
          ?>
          <div class="alert alert-warning alert-dismissible" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <strong>Hey, you!</strong> <?php echo $message; ?>
          </div>
          <?php
        }
    }
}


?>

<!-- login form box -->
<form method="post" action="dashboard.php" name="loginform">

    <label for="login_input_username">Username</label>
    <input id="login_input_username" class="login_input" type="text" name="user_name" required />

    <label for="login_input_password">Password</label>
    <input id="login_input_password" class="login_input" type="password" name="user_password" autocomplete="off" required />

    <input type="submit"  name="login" value="Log in" />

</form>

<a href="register.php">Register new account</a>

<?php

// include the header partial view
include("views/partial_dashboard_footer.php");

?>
