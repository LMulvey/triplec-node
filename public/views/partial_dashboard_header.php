<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Triple C Woodworx: At Triple C Woodworx, we made it our priority to find the perfect balance between these key components for every project.<br /><br />
      Let us help you get the most out of your home renovation.
      We will be happy to hear from you!">
    <meta name="author" content="Marc Bünder">

    <title>Triple C Woodworx - Admin Dashboard</title>

    <!-- CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
    <link href="css/main.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script src="https://use.typekit.net/hyt7gmr.js"></script>
    <script>try{Typekit.load({ async: true });}catch(e){}</script>
</head>

<body>
    <!-- Nav -->
    <nav class="navbar navbar-inverse" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <a href="index.php"><img src="./img/triplec-logo.png"></a>
                <span class="tagline">CUSTOM CREATIONS & CABINETRY</span>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <!-- <div class="collapse navbar-collapse" id="addr-collapse"> -->
                <ul class="nav navbar-nav">
                  <div class="navbar-contact">
                    <div class="navbar-left">
                      <div class="navbar-email">
                        <div class="navbar-icon"><i class="fa fa-envelope" aria-hidden="true"></i></div>
                        <a href="tel:17807001665">1-780-700-1665</a>
                      </div>
                      <div class="navbar-phone">
                        <div class="navbar-icon"><i class="fa fa-phone" aria-hidden="true"></i></div>
                        <a href="mailto:marc@triplec.ca">Marc@TripleC.ca</a>
                      </div>
                    </div>
                    <div class="navbar-address">
                      <div class="navbar-icon"><i class="fa fa-map-marker fa-3x" aria-hidden="true"></i></div> 15431 110 Avenue<br/>Edmonton, AB
                    </div>
                  </div>
                </ul>
            <!-- </div> -->
            <!-- /.navbar -->
        </div>
        <!-- /.container -->
    </nav>

                <div class="container">
                    <!-- Page Heading -->
                    <div class="row">
                        <div class="col-lg-12">
                            <h1 class="page-header">
                                TripleC Woodworx <small>Dashboard</small>
                            </h1>
                          </div>
                            <!-- CHECK LOGIN STATUS AND ONLY SHOW THIS WHEN LOGGED IN! -->
                            <?php
                            if ($login->isUserLoggedIn() == true) {
                              ?>
                              <div class="col-lg-12">
                            <ol class="breadcrumb">
                                <li class="active">
                                    <i class="fa fa-dashboard"></i> Use the links below to manage your PHOTOS or TEXT on website.
                                </li>
                            </ol>
                        </div>
                        <ul class="">
                            <li class="active">
                                <a href="dashboard.php"><i class="fa fa-fw fa-dashboard"></i> Dashboard</a>
                            </li>
                            <li>
                                <a href="dashboard.php?gallery"><i class="fa fa-fw fa-table"></i> Photos</a>
                            </li>
                            <li>
                                <a href="dashboard.php?pages"><i class="fa fa-fw fa-edit"></i> Pages</a>
                            </li>
                        </ul>

                        <?php } ?>
                        <!-- END LOGIN ONLY AREA -->

                    </div>
                    <!-- /.row -->


                                </div>
                                <!-- /.container -->
