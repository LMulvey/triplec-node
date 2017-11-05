
    <!-- Footer -->
<footer>
    <div class="container">
        <div class="row">
            <div class="col-sm-3">
               <i class="fa fa-facebook-square fa-3x" aria-hidden="true"></i>
               <i class="fa fa-instagram fa-3x" aria-hidden="true"></i>
               <i class="fa fa-twitter fa-3x" aria-hidden="true"></i>
            </div>
            <div class="col-sm-3">
              All designs, photos, and assets are Copyright &copy; Marc Bünder.
            </div>
            <div class="col-sm-2 designer">
              Designed by<br/>
              <span class="amlm-wordmark">AMLM</span>
            </div>
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->
</footer>


    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

        <!-- setup for rotating image -->
        <script src="js/main.js"></script>

    <?php if($gallery) { ?>
    <!-- Choclat.js -- jquery gallery plugin -->
    <script type="text/javascript" src="js/jquery.chocolat.js"></script>


    <script>
      $(document).ready(function(){
        $('.chocolat-parent').Chocolat({
          loop: true
        });
      });
    </script>
<?php } ?>
</body>

</html>
