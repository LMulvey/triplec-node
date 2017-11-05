<?php
// include the header partial view
include("views/partial_dashboard_header.php");
?>

<!-- because people were asking: "index.php?logout" is just my simplified form of "index.php?logout=true" -->
<a href="dashboard.php?logout">Logout</a>

<?php
// include the header partial view
include("views/partial_dashboard_footer.php");
?>
