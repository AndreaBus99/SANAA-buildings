// Used to display the search term and all the matches
// Also redirect the page URL when clicking on an item <id>
function display_matches_title(){

    $.each(title_matching,function(index,ui){

        let div=$("<div class='divSearch'></div>")
        div.html("<hr>")
        let title=$("<div></div>")

        // highlight
        let term = query
        let pattern = new RegExp("("+term+")", "gi")
        ui.title = ui.title.replace(pattern, "<mark>$1</mark>")
        
        title.html(ui.title)
        div.append(title)

        
        let location=$("<div class='grey'></div>")
        location.html(ui.location)
        div.append(location)

        $.each(ui.materials, function(index, ui){
            let l=$("<li class='grey'></li>")
            l.html(ui)
            div.append(l)
        })
        
        $(".by_title").append(div)
    
        div.click(function(){
            window.location.href= "/view/"+ui.id
        })
        
    })
}

function display_matches_location(){

    $.each(location_matching,function(index,ui){
        let div=$("<div class='divSearch'></div>")
        div.html("<hr>")
        let title=$("<div class='grey'></div>")
        title.html(ui.title)
        div.append(title)
        
        let location=$("<div></div>")

        // highlight
        let term = query
        let pattern = new RegExp("("+term+")", "gi")
        ui.location = ui.location.replace(pattern, "<mark>$1</mark>")

        location.html(ui.location)
        div.append(location)

        $.each(ui.materials, function(index, ui){
            let l=$("<li class='grey'></li>")
            l.html(ui)
            div.append(l)
        })
        
        $(".by_location").append(div)

        div.click(function(){
            window.location.href= "/view/"+ui.id
        })

    })
}

function display_matches_material(){

    $.each(material_matching,function(index,ui){
        let div=$("<div class='divSearch'></div>")
        div.html("<hr>")
        let title=$("<div class='grey'></div>")
        title.html(ui.title)
        div.append(title)
        
        let location=$("<div class='grey'></div>")
        location.html(ui.location)
        div.append(location)

        $.each(ui.materials, function(index, ui){
            let l=$("<li></li>")

            //highlight
            let term = query
            let pattern = new RegExp("("+term+")", "gi")
            ui = ui.replace(pattern, "<mark>$1</mark>")

            l.html(ui)
            div.append(l)
        })

        $(".by_material").append(div)

        div.click(function(){
            window.location.href= "/view/"+ui.id
        })

    })
}



$(document).ready(function(){

    $(".search_term").append("\"")
    $(".search_term").append(query)
    $(".search_term").append("\"")

    let total=title_matching.length+location_matching.length+material_matching.length
    if(total==1){
        $(".total_results").append(total+" total result found")
    }
    else if(total==0){
        $(".total_results").append("No results found")
    }
    else{
        $(".total_results").append(total+" total results found")
    }

    if(title_matching.length==0){
        $(".no_title").append("No results found")
    }
    else{
        if(title_matching.length==1){
            $(".number_title").append(title_matching.length+" result found") 
        }
        else{
            $(".number_title").append(title_matching.length+" results found") 
        }
        display_matches_title(title_matching)
    }

    if(location_matching.length==0){
        $(".no_location").append("No results found")
    }
    else{    
        if(location_matching.length==1){
            $(".number_location").append(location_matching.length+" result found") 
        }
        else{
            $(".number_location").append(location_matching.length+" results found") 
        } 
        display_matches_location(location_matching)
        
    }

    if(material_matching.length==0){
        $(".no_material").append("No results found")
    }
    else{     
        if(material_matching.length==1){
            $(".number_material").append(material_matching.length+" result found") 
        }
        else{
            $(".number_material").append(material_matching.length+" results found") 
        } 
        display_matches_material(material_matching)
        
    }

    
})