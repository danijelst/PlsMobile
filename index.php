<html manifest="manifest.php">
    <head>
        <title>ParkLeitSystem - Mobile</title>
        <link type="text/css" rel="stylesheet" media="screen" href="jqtouch/jqtouch.css">
        <link type="text/css" rel="stylesheet" media="screen" href="themes/jqt/theme.css">
        <script src="jqtouch/jquery.1.3.2.min.js" type="text/javascript" charset="utf-8"></script> 
        <script src="jqtouch/jqtouch.min.js" type="application/x-javascript" charset="utf-8"></script> 
        <script src="jqtouch/jqt.location.js" type="application/x-javascript" charset="utf-8"></script>
        <script type="text/javascript" src="pls.js"></script>
    </head>
    
    <body>
        <div id="home">
            <div class="toolbar">
                <h1>ParkLeitSystem - Mobile</h1>
            </div>
            <ul class="rounded">
                <li class="arrow"><a href="#country" id="search">Search</a></li>
                <li class="arrow"><a href="#about">About</a></li>
            </ul>
        </div>
        <div id="about">
            <div class="toolbar">
                <h1>About</h1>
                <a class="button back" href="#">Back</a>
            </div>
            <div>
                <p><img src="favicon.ico" /></p>

                <p><strong>PlsSystem Mobile</strong><br />Version 1.0 beta<br />
                    <a href="http://www.stojnic.com">By Danijel Stojnic</a></p>
                <p>ParkLeitSystem is a web based site for mobile phones to get fast access to free parkings nearby.</p>
                <p>
                    <a href="http://twitter.com/danijelst" target="_blank">@danijelst on Twitter</a>

                </p>
                <p><br /><br /><a href="#" class="grayButton goback">Close</a></p>
                
            </div>
        </div>
        <div id="country">
            <div class="toolbar">
                <h1>Select country</h1> 
                <a class="button back" href="#">Back</a>
                <a class="button flip" href="#" id="refresh">Refresh</a>
            </div>
            <ul class="rounded">
                <li id="entryCountry" class="arrow" style="display:none"><a id="COUNTRY" href="#city">Label</a></li>
            </ul>
        </div>
        <div id="city">
            <div class="toolbar">
                <h1>Select city</h1>
                <a class="button back" href="#">Back</a>
                <a class="button flip" href="" id="refresh">Refresh</a>
            </div>
            <ul class="rounded">
                <li id="entryCity" class="arrow" style="display:none"><a id="CITY" href="#parking">Label</a></li>
            </ul>
        </div>
        <div id="parking">
            <div class="toolbar">
                <h1>City</h1>
                <a class="button back" href="#">Back</a>
                <a class="button flip" href="" id="refresh">Refresh</a>
            </div>
            <ul class="rounded">
                <li id="entryParking" class="entry" style="display:none">
                    <a id="CITY" href="#parkingDetails">                      
                      <span class="parkingName">Label</span></a>
                      <span class="distance">000</span>
                      <small class="counter"><span class="free_open">000</span></small>
                </li>
            </ul>
        </div>
        <div id="parkingDetails">
            <div class="toolbar">
                <h1>City</h1>
                <a class="button back" href="#">Back</a>
                <a class="button flip" href="" id="refresh">Refresh</a>
            </div>
            <ul class="edgetoedge">
                <li id="entryParking" class="entry" style="display:none">
                    <a id="CITY" href="#parkingDetails">
                      <span class="parkingName">Label</span>
                      <span class="free_open">000</span>
                      <span class="distance">000</span>
                      <span class="map">Map</span>
                    </a>
                </li>
            </ul>
        </div>
    </body>
</html>
