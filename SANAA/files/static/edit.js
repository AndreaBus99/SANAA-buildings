// Saves the edited entry

function save(){
    let title=$("#title_input").val()
    let image=$("#image_input").val()
    let information=$("#info_input").val()
    let year=$("#year_input").val()
    let location=$("#location_input").val()
    let area=$("#area_input").val()

    let materials=$("#material_input").val()
    let materials_arr=materials.split(',')

    let data_to_save = {
        "id": building.id,
        "title": title,
        "image": image,
        "information": information,
        "year":  year,
        "location": location,
        "area": area,
        "materials": materials_arr
    }

    let space=materials.indexOf(" ")>-1;

    clear_warnings()
    
    //First check if input is valid:
    if(!($.isNumeric(year))|| !($.isNumeric(area)) || $.trim(title).length==0 || $.trim(image).length==0 || $.trim(information).length==0 
    || $.trim(year).length==0 ||$.trim(location).length==0 || $.trim(area).length==0 || $.trim(materials).length==0 || space==true){
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
            url: "/edit/<id>",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(data_to_save),
                
            success: function(result){    
                console.log("success")
                let all_data = result["building"]
                building = all_data 
                window.location.href= "/view/"+building.id

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

    $("#title_input").append(building.title)

    $("#image_input").append(building.image)

    $("#info_input").append(building.information)

    $("#year_input").append(building.year)

    $("#location_input").append(building.location)

    $("#area_input").append(building.area)
    
    $("#material_input").append(building.materials)

    $("#submit_button").click(function(){
        save(building)
    })

    $("#discard_button").click(function(){

        $("#dialog").append("Are you sure you want to discard your changes?<br>")
        $("#dialog").append("<button id='no' class='btn btn-outline-dark my-2 my-sm-0'> No, keep editing </button>")
        $("#dialog").append("<button id='yes' class='btn btn-outline-dark my-2 my-sm-0'> Yes </button>")

        $("#dialog").dialog({ dialogClass: 'noTitle' })
        $("#yes").click(function(){
            window.location.href= "/view/"+building.id
        })
        $("#no").click(function(){
            $(".ui-dialog").html("")
            $("#dialog").html("")
        })

    })
    
    
})