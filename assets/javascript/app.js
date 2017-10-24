$(document).ready(function() {
	console.log("hello");

	var tvshows = ["bones", "stargate SG-1", "walking dead", "serenity", "will & grace",
	  "conviction", "doctor who", "people of earth", "good place", "barefoot contessa",
	  "schitt's creek", "veep", "american gods", "game of thrones", "berlin station", 
	  "lucifer", "good wife", "12 monkeys"];

	// make the buttons

	function renderButtons() {

		$("#button-section").empty();

        // create loop to go through the array of shows
		for (var i = 0; i < tvshows.length; i++) {

			var holder = $("<button>");
			
			holder.addClass("show");
			holder.attr("data-name", tvshows[i]);
			holder.text(tvshows[i]);
			$("#button-section").append(holder);
		}
		
	}

	// add the click event to the input form, takes the user input and adds to buttons above

	$("#newAdd").on("click", function(event) {
        event.preventDefault();

        // Take the text provided by the user (value) and trim any white space
        var newShow = $("#tvshowInput").val().trim();

        // take that new addition, and put in the tvshows array with previous shows
        tvshows.push(newShow);

        // re-render the buttons from that newly added to array
        renderButtons();
        //clear out the input field
		$("#tvshowInput").val("");
    });

	// click event function to make the buttons get ratings and gifs from giphy 
	// and display static gifs
	// then add moving gifs, and toggle between them.

	function displayShowGifs() {

		$("#gifs-section").empty();

      // get the name of the show (from the button attribute) and make a 
      // variable to go into the query
		var nameofShow = $(this).attr("data-name");

      // Make the queryURL with that show name and my API key
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        nameofShow + "&api_key=IdcshApmp1dX1xCaUhUu6kqfMZ5091aa&limit=10";

        //console.log(queryURL);

      // do the AJAX request with the new queryURL
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {

          // storing the .data from the AJAX request in the results variable
		var results = response.data;
		//console.log(results);

          // Loop to go through each gif in response - had set limit to 10
			for (var i = 0; i < results.length; i++) {

            // make a new div to later put in our established div in html
				var showDiv = $("<div>");
				showDiv.addClass("combo");

            // Make a paragraph to put in the rating of the returned gif
				var p = $("<p>").text("Rating: " + results[i].rating);

            // make the image tag to put in attributes later (stills and animated and class)
				var showImages = $("<img>");
            // the src attribute becomes a still image
				showImages.attr("src", results[i].images.fixed_height_still.url);
				showImages.attr("data-still", results[i].images.fixed_height_still.url);
				showImages.attr("data-animate", results[i].images.fixed_height.url);
				showImages.attr("data-state", "still");
				showImages.addClass("gif");
				console.log(showImages);

            // put the p with ratings and the showImages with src and data 
            // into the temporary div
				showDiv.append(p);
				showDiv.append(showImages);

            // put the temp div into the div established in the html 
			$("#gifs-section").append(showDiv);
			}

		});
	}

	$(document).on("click", ".show", displayShowGifs);

		//make the function to animate and stop animating the gifs
		//the class .gif had been added to the showImages var above.

	$(document).on("click", ".gif", function() {
		
		//the variable state is assigned the current (when clicked) value of the
		// attribute data-state

		var state = $(this).attr("data-state");
		
		// compare what the current state of the gif is to "still".
		if (state === "still") {

			//if it is, then change the src to the value of the data-animate attribute
		$(this).attr("src", $(this).attr("data-animate"));

			//then we have to change the state value to animate
		$(this).attr("data-state", "animate");

		//but, if it's not still (already at animate)
		} else {

			//then the opposite actions occur. That's how the user toggles "still"
			//to "animate"
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
		}

	});

	renderButtons();

});