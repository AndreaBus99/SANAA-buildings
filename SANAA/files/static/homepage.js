// Displaying three items on homepage

function display(buildings){

    $.each(buildings,function(index,ui){

        let rowAll=$("<div class='row toClick'></div>")
        let row1=$("<div class='row'></div>")
        let title=$("<div class='title-home'></div>")
        title.html(ui.title)
        let year=$("<div class='year-home'></div>")
        year.append(" ",ui.year)
        row1.append(title,year)
    
        rowAll.append(row1)

        $(".home").append(rowAll)
        

        let row2=$("<div class='row'></div>")
        let image=$("<div class='col-md-4'></div>")
        image.html("<img src='"+ui.image+"'alt='Image of "+ui.title+"'class='img-fluid'>")
        

        let info=$("<div class='col-md-6'></div>")
        info.html(ui.information)
        row2.append(image,info)

        rowAll.append(row2)
        rowAll.addClass("style-home")

        $(".home").append(rowAll)

        rowAll.click(function(){
            window.location.href= "/view/"+ui.id
        })
    })
}

$(document).ready(function(){
    display(buildings)
})