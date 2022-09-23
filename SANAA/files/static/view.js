// Displays all the info for each building in the list

$(document).ready(function(){

    $(".title").append(building.title)

    $(".image").append("<img src='"+building.image+"'alt='Image of "+building.title+"'class='img-fluid'>")

    $(".info").append(building.information)

    $(".year").append(building.year)

    $(".location").append("<button id='location-button' class='btn btn-outline-dark my-2 my-sm-0'>"+building.location+"</button>")
    $("#location-button").click(function(){
        window.location.href= "/search_results/"+building.location
    })

    $(".area").append(building.area)

    $.each(building.materials, function(index, ui){
        $(".mat-button").append("<button id='button-"+ui+"' class='btn btn-outline-dark my-2 my-sm-0'>"+ui+"</button>")
        let noSpace=$.trim(ui)

        $("#button-"+noSpace+"").addClass("style-button")
        $("#button-"+noSpace+"").click(function(){
            window.location.href= "/search_results/"+($("#button-"+noSpace+"").text())
        })
    })

    $("#edit_button").click(function(){
        window.location.href= "/edit/"+building.id
    })



    
})