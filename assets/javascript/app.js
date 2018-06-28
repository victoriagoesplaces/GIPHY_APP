$(document).ready(function(){
    var randomGIPHY = ["dog","cat","rabbit","elephant","donkey","horse","giraffe","fish","dolphin","penguin"];

    // Function for displaying randomGIPHY data
    function renderButtons() {

        // Deleting the animals prior to adding new animals
        $("#animalbtn").empty();

        for (var i = 0; i < randomGIPHY.length; i++) {
            console.log(randomGIPHY[i]);

            var btnGIPHY = $("<button class='giphy'>");
            btnGIPHY.attr("animal", randomGIPHY[i]);
            btnGIPHY.text(randomGIPHY[i]);
            $("#animalbtn").append(btnGIPHY);
        };
    }

    //function that adds the user input as a new button for searching
    function addNewButtons(){
        $("#submit").on("click", function(){
        var input = $("#userChoice").val().trim();
        //prevents user from creating a blank button
        if (input == ""){
        return false;
        }
        //pushes user input to the topics array
        randomGIPHY.push(input);
        //display buttons function is run again to show the new button
        renderButtons();
        return false
        });
    }
//function to display Giphy items
    function showGiphy(){
        var animal = $(this).attr("animal");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=lygpbhcJDvXB6WtmAMphpmGaHl7ldAGB&limit=10";
            
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            $("#mainBox").empty();
            var results = response.data;
            console.log(response.data);

        for (var i = 0; i < results.length; i++){
            var GIPHY = $("<div class='GIPHY'>");
            var image = $("<img class='image'>");

            image.attr("src", results[i].images.fixed_height_small_still.url);
            image.attr("data-still", results[i].images.fixed_height_small_still.url);
            image.attr("data-animate", results[i].images.fixed_height_small.url);
            image.attr("data-state", "still");

            GIPHY.append(image);
            var rating = $("<p>").text("Rating: " + results[i].rating);
            GIPHY.append(rating);

            $("#mainBox").prepend(GIPHY)
        }
    })      
    }

    // Calling the function to display the intial buttons and what they user has entered
    renderButtons();
    addNewButtons();

    $(document).on("click", ".giphy", showGiphy );

    $(document).on("click", ".image", function(){
        var state = $(this).attr("data-state");
        if ( state == "still"){
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        }else{
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });
})