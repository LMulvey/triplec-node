<?php

// include the header partial view
include("views/partial_dashboard_header.php");

// show potential errors / feedback (from login object)
if ($uploadErrors) {
    foreach ($uploadErrors as $error) {
        ?>
<div class="alert alert-warning alert-dismissible" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  <strong>Uh oh!</strong> <?php echo $error; ?>
</div>

<?php
  }
}
if ($uploadMessages) {
  foreach ($uploadMessages as $message) {
    ?>
    <div class="alert alert-warning alert-dismissible" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <strong>Hey, you!</strong> <?php echo $message; ?>
    </div>
    <?php
  }
}

//parse category_id if new
if($category_id == 'new') {
  $category_id = '"new"';
}

?>
  <link href="css/imgareaselect-default.css" rel="stylesheet">
 <script type="text/javascript" src="js/jquery.imgareaselect.pack.js"></script>
 <script type="text/javascript">
$(document).ready(function () {
   var selection = $("#photo").imgAreaSelect({
       handles: true,
       instance:true
   });
   $("#crop").click(function () {
       var width = selection.getSelection().width;
       var height = selection.getSelection().height;
       var x = selection.getSelection().x1;
       var y = selection.getSelection().y1;
       var image = $("#photo");
       var loader = $("#ajax-loader");
       var category_name = $("#category_name").val();
       var category_desc = $("#category_desc").val();
       var request = $.ajax({
           url: "crop.php",
           type: "GET",
           data: {
               x: x,
               y: y,
               height: height,
               width: width,
               image: image.attr("src"),
               category_id: <?php echo $category_id; ?>,
               category_name: category_name,
               category_desc: category_desc,
               image_title: "<?php echo $image_title; ?>",
               image_desc: "<?php echo $image_desc; ?>",
               image_tags: "<?php echo $image_tags; ?>"
           },
           beforeSend: function () {
               loader.show();
           }
       }).done(function (msg) {
           image.attr("src", msg);
           loader.hide();
           selection.cancelSelection();
       });
   });
});
 </script>

<?php
if($category_id == '"new"') {
  ?>
  <input type="hidden" name="method" value="validateForm">
  <input type="hidden" id="serverValidationFields" name="serverValidationFields" value="">
  <div class="form-group category_name " data-fid="category_name">
    <label class="control-label" for="category_name">Category Name:</label>
  <input type="text" class="form-control" id="category_name" name="category_name" value="" maxlength="15" aria-describedby="category_name-help-block"
      data-rule-minlength="5"
      data-rule-maxlength="15"   />
    <p id="category_name-help-block" class="description">Choose your new category name here.</p>
  </div>
  <div class="form-group category_desc " data-fid="category_desc">
    <label class="control-label" for="category_desc">Description</label>
  <input type="text" class="form-control" id="category_desc" name="category_desc" value="" maxlength="255" aria-describedby="category_desc-help-block"
      data-rule-minlength="5"
      data-rule-maxlength="255"   />
    <p id="category_desc-help-block" class="description">Describe your category. This will be shown at the top of Gallery pages.</p>

  </div>

  <?php
}

?>

 <img src="img/upload/<?php echo $fileName; ?>" id="photo">
 <input type="button" id="crop" value="Crop & Save">
 <img src="img/ajax-loader.gif" id="ajax-loader" style="display:none">

<!--


 <script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.1/jquery.validate.min.js"></script>
 <script src="js/jqueryform.com.min.js?ver=v1.2.5&id=jqueryform-47825c" ></script> -->
<?php

//include the footer partial view
include("views/partial_dashboard_footer.php");
 ?>
