<?php

// include the header partial view
include("views/partial_dashboard_header.php");
?>
<form action="upload.php" method="POST" enctype="multipart/form-data" class="form-horizontal">
<fieldset>

<!-- Form Name -->
<legend>Upload & Crop a New Image!</legend>

<!-- File Button -->
<div class="form-group">
  <label class="col-md-4 control-label" for="file">Image: </label>
  <div class="col-md-4">
    <input id="file" name="file" class="input-file" type="file">
  </div>
</div>

<!-- Select Drop Down -->
<div class="form-group">
  <label class="col-md-4 control-label" for="category">Category</label>
  <div class="col-md-4">
    <div class="input-group">
      <select name="category" id="category">
        <?php
        if(isset($categories)) {
          foreach ($categories as $category) {
            ?><option value="<?php echo $category['category_id'];?>"><?php echo $category['title'] . (strlen($category['desc']) > 15) ? substr($category['desc'],0,10). '...' : $category['desc'];?></option>
        <?php
          }
        }
         ?>
         <option value="new"> - Create New Category -</option>
       </select>
    </div>
  </div>
</div>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="img_title">Image Title</label>
  <div class="col-md-4">
  <input id="img_title" name="img_title" type="text" placeholder="Pick a title for your image" class="form-control input-md">

  </div>
</div>

<!-- Textarea -->
<div class="form-group">
  <label class="col-md-4 control-label" for="img_desc">Image Description</label>
  <div class="col-md-4">
    <textarea class="form-control" id="img_desc" name="img_desc">Input image description here!</textarea>
  </div>
</div>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="img_tags">Image Tags (separate by commas)</label>
  <div class="col-md-4">
  <input id="img_tags" name="img_tags" type="text" placeholder="tag1, tag2, tag3, tag4" class="form-control input-md">
  <span class="help-block">This helps categorize your images. Use tags like "cabinet", "door", etc.</span>
  </div>
</div>

<!-- Button -->
<div class="form-group">
  <label class="col-md-4 control-label" for="submit"></label>
  <div class="col-md-4">
    <button id="submit" name="submit" class="btn btn-primary">Upload &amp; Crop!</button>
  </div>
</div>

</fieldset>
</form>

<?php

//include the footer partial view
include("views/partial_dashboard_footer.php");
 ?>
