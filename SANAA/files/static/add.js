// Adds a new entry to the database

function add(buildings){
    let title=$("#title_input").val()
    let image=$("#image_input").val()
    let information=$("#info_input").val()
    let year=$("#year_input").val()
    let location=$("#location_input").val()
    let area=$("#area_input").val()

    let materials=$("#material_input").val()
    let materials_arr=materials.split(',')
    
    let data_to_save = {
        "title": title,
        "image": image,
        "information": information,
        "year":  year,
        "location": location,
        "area": area,
        "materials": materials_arr
    }

    clear_warnings()

    let space=materials.indexOf(" ")>-1;
    
    //First check if input is valid:
    if($.trim(title).length==0 || $.trim(image).length==0 || $.trim(information).length==0 
    || $.trim(year).length==0 ||$.trim(location).length==0 || $.trim(area).length==0 || $.trim(materials).length==0
    || !($.isNumeric(year))|| !($.isNumeric(area)) || space==true){
        
        if(title.length==0){
            $(".w_title").html("Error: Title cannot be empty")
    
        }
        if(image.length==0){
            $(".w_image").html("Error: Image cannot be empty")
    
        }
        if(information.length==0){
            $(".w_info").html("Error: Description cannot be empty")
        
        }
        if(year.length==0 || !($.isNumeric(year))){
            if(year.length==0){
                $(".w_year").html("Error: Year cannot be empty")
            }
            else{
                $(".w_year").html("Error: Year has to be a number")
            }
        }
        if(location.length==0){
            $(".w_location").html("Error: Location cannot be empty")
        
        }
        if(area.length==0 || !($.isNumeric(area))){
            if(area.length==0){
                $(".w_area").html("Error: Area cannot be empty")
            }
            else{
                $(".w_area").html("Error: Area has to be a number")
            }
        }
        if(materials.length==0 || space==true){
            if(materials.length==0){
                $(".w_mat").html("Error: Materials cannot be empty")
            }
            else{
                $(".w_mat").html("Error: Materials cannot contain spaces")
            }
        }
    }

    //If input is accepted continue:
    else{
        $.ajax({

            type: "POST",
            url: "add",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(data_to_save),
                
            success: function(result){
                $(".w_title").html("")
                $(".w_image").html("")
                $(".w_info").html("")
                $(".w_year").html("")
                $(".w_location").html("")
                $(".w_area").html("")
                $(".w_mat").html("")
                
                let all_data = result["buildings"]
                buildings = all_data 

                let success=$("<div class='success'></div>")
                success.html("New item successfully created")


                success.append("<button id='view_item' class='btn btn-outline-dark my-2 my-sm-0'>See it here</button>")

                $(".onSuccess").append(success)

                $("#view_item").click(function(){
                    let temp= buildings[(buildings.length)-1]
                    let last=(temp.id)
                    window.location.href= "/view/"+last
                })

                clear_fields()

                $(window).scrollTop(0)
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
    }

}

function clear_fields(){
    $("#title_input").val("")
    $("#image_input").val("")
    $("#info_input").val("")
    $("#year_input").val("")
    $("#location_input").val("")
    $("#area_input").val("")
    $("#material_input").val("")

    $("#title_input").focus() 
}

function clear_warnings(){
    $(".w_title").html("")
    $(".w_image").html("")
    $(".w_info").html("")
    $(".w_year").html("")
    $(".w_location").html("")
    $(".w_area").html("")
    $(".w_mat").html("")
}



$(document).ready(function(){

    $("#add_button").click(function(){
        $(".success").html("")
        add(buildings)
    })

})