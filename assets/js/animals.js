$(document).ready(function() {
  var animals = [
    "mouse",
    "dog",
    "dolphin",
    "sea lion",
    "snake",
    "bird",
    "cat",
    "whale",
    "fish"
  ];

  for (var i = 0; i < animals.length; i++) {
    $("#buttons").append(
      "<button data-animal='" + animals[i] + "'>" + animals[i] + "</button>"
    );
  }

  $("#addAnimal").on("click", function() {
    var animalName = $("#animalName").val();

    $("#buttons").append(
      "<button data-animal='" + animalName + "'>" + animalName + "</button>"
    );

    $("#animalName").val("");
  });

  $(document).on("click", "#buttons button", function() {
    var animal = $(this).attr("data-animal");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      animal +
      "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animalImage = $("<img>");

          animalImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.append(p);
          gifDiv.append(animalImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
  });
});
