var APIKey = "IqXvMXEGaQBB0Bf4DrXz6U293H5JbnLL";
var i = 0;

var attractions = ["Paris", "Rome", "Niagara Falls", "Amazon River", "Smoky Mountains"]

function renderButtons(){
$("#main2").empty();
    for (i = 0; i<attractions.length; i++){
        var b = $("<button>");
        b.text(attractions[i]);
        b.addClass("attractions-button");
        b.attr("data-value", attractions[i]);
        $("#main2").append(b);
    
        
}};

//AJAX call to the GIPHY API 
function insertGif() {   
    var attraction = $(this).attr("data-value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" +attraction+"&limit=10&offset=0&rating=G&lang=en";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
//Store the retrieved data 
    .then(function(response) {
        console.log(response);

        $("#gifCol").empty();
        for (var i=0; i<response.data.length; i++){
            var p = $("<p>").text("Rating: "+response.data[i].rating);
            var stillGif = response.data[i].images.fixed_height_still.url;
            var animatedGif = response.data[i].images.fixed_height.url;
            var gifDiv = $("<div>");
            
            gifDiv.prepend('<img src="' + stillGif + '"' +'class="gifthe"'+'data-still="'+stillGif+'"'+'data-animate="'+animatedGif+'"'+'data-state="still"' + 'height="200" width="300"/>');
            gifDiv.prepend(p);
            $("#gifCol").append(gifDiv);
            console.log(response.data[i].embed_url);
        }
            $(".gifthe").on("click", function(){
               var state = $(this).attr("data-state");
                
               if(state==="still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
               }
                else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
             
            });
        
        });
    };

$("#createButton").on("click", function(event){
    event.preventDefault();
    var newAttraction = $("#addButton").val().trim();
    attractions.push(newAttraction);
    renderButtons();
});
renderButtons();
$(document).on("click", ".attractions-button", insertGif);
