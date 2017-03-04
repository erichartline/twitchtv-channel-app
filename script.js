$(document).ready(function() {
  // array of Twitch users to test
  var users = ["ESL_SC2", "SonySanDiegoStudio", "ThatSportsGamer", "freecodecamp", "carldude", "cardinalbird5", "pSporer24", "RocketLeagueCentral", "brunofin", "Pastapadre", "RocketLeague", "OOTPDevelopments", "Clutchsilver", "manny7788gaming", "bobross"]
  // loop to cycle through users
  for (var i = 0; i < users.length; i++) {
    // variable to use Twitch API
    var streamURL = "https://api.twitch.tv/kraken/streams/" + users[i] + "?callback=?";

    $.getJSON(streamURL, function(data) {
      var logo = data.logo;
      var name = data.display_name;
      // if logo is missing, display "no logo" image
      if (logo === null || logo === undefined) {
        logo = "http://thebosniaguy.com/site/wp-content/uploads/2013/04/no_logo.png.png";
      }
      // IF/ELSE IF/ELSE statements to determine if streamers are offline, closed or currently streaming
      if (data.stream === null) {
        $.getJSON(data._links.channel, function(data2) {
          $("#offline").append("<a href='https://www.twitch.tv/" + data2.display_name + "' target='_blank'><div class='row well' id='offline'><div class='col-sm-4'><img class='logo' src='" + data2.logo + "'></div><div class='col-sm-4'><h3>" + data2.display_name + "</h3></div><div class='col-sm-4'><h3>Offline</h3></div></div></a>");
        });
      } else if (data.stream === undefined) {
        $("#closed").append("<div class='row well' id='closed'><div class='col-sm-4'><img class='logo' src='" + logo + "'></div><div class='col-sm-4'><h3>" + data.message + "</h3></div><div class='col-sm-4'><h3>Account closed</h3></div></div>");
      } else {
        $("#online").append("<a href='https://www.twitch.tv/" + data.stream.channel.display_name + "' target='_blank'><div class='row well' id='online'><div class='col-sm-4'><img class='logo' src='" + data.stream.channel.logo + "'></div><div class='col-sm-4'><h3>" + data.stream.channel.display_name + "</h3><h4><em>" + data.stream.channel.status + "</em></h4></div><div class='col-sm-4'><h3>Online</h3></div></div></a>");
      }
    });

  }
  // click functions for buttons
  $("#all-button").click(function() {
    $("#online").show(1000)
    $("#offline").show(1000)
    $("#closed").show(1000);
    $("#all-button").addClass("active");
    $("#online-button").removeClass("active");
    $("#offline-button").removeClass("active");
  });
  $("#online-button").click(function() {
    $("#online").slideDown(1000);
    $("#offline").hide(1000);
    $("#closed").hide(1000);
    $("#online-button").addClass("active");
    $("#all-button").removeClass("active");
    $("#offline-button").removeClass("active");
  });
  $("#offline-button").click(function() {
    $("#online").slideUp(1000);
    $("#offline").show(1000);
    $("#closed").show(1000);
    $("#offline-button").addClass("active");
    $("#all-button").removeClass("active");
    $("#online-button").removeClass("active");
  });

});
