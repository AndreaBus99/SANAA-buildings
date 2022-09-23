// Checks if the search term is valid (not only blankspace)
// Redirects the URL when searching

$(document).ready(function(){
    $( "#search_button" ).click(function(event) {
        let query=$("#search_input").val()

        if($.trim(query)==0){
            $("#search_input").val("")
            $("#search_input").focus()
            event.preventDefault()
        }
        else{
            window.location.href= "/search_results/"+query
            event.preventDefault()
        }
    });  
})