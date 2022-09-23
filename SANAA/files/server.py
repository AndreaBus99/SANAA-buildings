from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

current_id = 10

buildings = [
    {
        "id": 1,
        "title": "New Museum",
        "image": "https://archello.com/thumbs/images/2013/08/08/KAUFMAN2007110980943-0.1506070994.0727.jpg?fit=crop&w=414&h=518",
        "information": "The New Museum of Contemporary Art is a destination for new ideas and new art. It is a seven-story structure"
        " located at 235 Bowery between Stanton and Rivington Street. SANAA received the commission in 2002 and finished the building"
        " in 2007. They decided to stack these seven boxes thinking through the needs of the user and the circulation. Then they shifted"
        " slightly the boxes in different directions which yielded fluid and light-filled spaces.",
        "year": "2007",
        "location": "New York City, United States",
        "area": 58700,
        "materials": [
            "concrete", 
            "steel", 
            "glass", 
            "aluminum-mesh"]
    },
    {
        "id": 2,
        "title": "Serpentine Gallery Pavellion",
        "image": "https://www.metalocus.es/sites/default/files/styles/mopis_news_carousel_item_desktop/public/metalocus_sanaa_serpentine-gallery_16.jpg?itok=EFReolxm",
        "information": "The 2009 Serpentine Gallery Pavilion was located in Kensington Gardens, UK. In 2009, the Serpentine Gallery invited the internationally known SANAA studio, which had never built anything in the UK before, to design a temporary pavilion for public activities in the UK between June and October of that year. The pavilion is composed of a very thin corrugated aluminium roof, which rests on a system of columns of a very small diameter, also made of aluminium, in this way a series of connected spaces is provided that in addition the park is reflected in the aluminium which creates a continuity between pavilion and environment.",
        "year": "2009",
        "location": "Kensington Gardens, United Kingdom",
        "area": 5995,
        "materials": [
            "aluminium", 
            "concrete", 
            "stainless-steel"]
    },

    {
        "id": 3,
        "title": "Meandering River Building at Grace Farms",
        "image": "https://www.metalocus.es/sites/default/files/styles/mopis_news_carousel_item_desktop/public/file-images/metalocus_kaufman_sanaa_015.jpg?itok=9-eluly3",
        "information": "The River is a winding building, as its name indicates: it has the shape of 'River', is located in Grace Farms, New Canaan in the United States and was designed by the studio SANAA. This building, like most SANAA projects, aims to blend in with the surroundings without drawing attention to the architecture. This building houses different functions thanks to a series of interior and exterior spaces lower that large sinuous roof. This occupies 32 hectares by the rural area of New Canaan and has an organic shape, the roof supported by fine pillars for the outdoor area and for the interior, glazed areas.",
        "year": "2015",
        "location": "New Canaan, United States",
        "area": 83000,
        "materials": [
            "glass", 
            "concrete", 
            "steel",
            "wood"]
    },

    {
        "id": 4,
        "title": "Shibaura House",
        "image": "https://architecturetokyo.files.wordpress.com/2017/07/img_9580.jpg",
        "information": "Shibaura House is located in the Shibaura district, an area in which office buildings are very numerous. SANAA studio located this building on a corner plot, this building is designed to unite office programs (business area) and cultural center, offering flexible spaces to develop parallel activities such as workshops, artistic and leisure activities. This building offers 1,000 sqm divided into 7 floors, from the first mezzanine there is access to a patio that has a staircase that connects with the upper floors, being serpenteante is creating a visual tour throughout the building. As for the structure, there is a concrete inner core dedicated to elevators, and on the perimeter you can see a metal network of pillars, The facade is a glass curtain wall.",
        "year": "2011",
        "location": "Tokyo, Japan",
        "area": 10763,
        "materials": [
            "glass", 
            "steel", 
            "concrete"]
    },

    {
        "id": 5,
        "title": "The New Tsuruoka Cultural Hall",
        "image": "https://www.metalocus.es/sites/default/files/styles/mopis_news_carousel_item_desktop/public/metalocus_sanaa_tsuruoka-cultural-hall_03.jpg?itok=55hP_7eA",
        "information": "The Cultural Center is located in the city of Tsuruoka in Japan designed by the Japanese studio SANAA. The studio sought to enhance local cultural and artistic activities through a multi-purpose room. The building is in harmony with the adjacent historic building and the landscape. The exterior of the building is a set of several decks of a small size. Each deck becomes lower the closer it is to the perimeter until it reaches a height of a one-storey building, thus controlling its volume.",
        "year": "2018",
        "location": "Tsuruoka, Japan",
        "area": 84455,
        "materials": [
            "steel", 
            "conrete", 
            "wood",
            "glass"]
    },

    {
        "id": 6,
        "title": "The Sumida Hokusai Museum",
        "image": "https://www.metalocus.es/sites/default/files/styles/mopis_news_carousel_item_desktop/public/metalocus_kazuyo-sejima_sumida-hokusai-museum_vincent-hecht_21_0.jpg?itok=jFE-P5zR",
        "information": "The Sumida Kokusai Museum is located in a small park in the homonymous district of the Japanese capital, Tokyo. This building designed by SANAA harmonizes perfectly in terms of the urban aspect in the district and adapts to the scale of the environment. The SANAA’s programme for the museum is strategically organized in this volume, ranging from fixed exhibition spaces to a library or shop. The material used for its coating is polished aluminium. The characteristics of this material allow the urban landscape that surrounds it to be reflected in it.",
        "year": "2016",
        "location": "Tokyo, Japan",
        "area":35293 ,
        "materials": [
            "polished-aluminium", 
            "glass"]
    },

    {
        "id": 7,
        "title": "The Zollverein School of Management and Design",
        "image": "https://www.metalocus.es/sites/default/files/styles/mopis_news_carousel_item_desktop/public/file-images/metalocus_sanaa_essen_26_1180.jpg?itok=vmRVbLog",
        "information": "On the main access road to the former Zeche Zollverein mine in Essen, Germany is located the Zollverein School of Administration and Design which was designed by the architecture firm SANAA. This studio won a competition to build the new school in 2002. The volume of this building is an almost perfect cube, it has 3 unique fixed cores of different sizes and 2 metal pillars that cross the slab. It is transparent and with lots of windows that make this building almost transparent. The program of the school is spread over the 4 floors that make up this building.",
        "year": "2005",
        "location": "Essen, Germany",
        "area": 53819 ,
        "materials": [
            "concrete", 
            "glass", 
            "metaal"]
    },

    {
        "id": 8,
        "title": "Musée Louvre-Lens",
        "image": "https://www.metalocus.es/sites/default/files/styles/mopis_news_carousel_item_desktop/public/metalocus_sanaa_louvre_lens_16_0.jpg?itok=uPgPhhLL",
        "information": "The Louvre Lens Museum is located in the city of Lens in the Pas de Calais region of northern France and was a work designed by the SANAA studio with the help of landscapers to create a relationship and dialogue between the museum and the surrounding landscape environment. SANAA did not want to project a large dominant wall in the environment, but a low and easily accessible structure integrating into the environment. The museum is composed of five steel and glass buildings joined together. The facades are made of polished aluminium to reflect the park, creating a continuity between museum and park, and the roofs are made of glass for the entrance of light.",
        "year": "2012",
        "location": "Lens, France",
        "area": 301389 ,
        "materials": [
            "steel", 
            "glass", 
            "concrete"]
    },

    {
        "id": 9,
        "title": "Los Vilos House",
        "image": "https://www.metalocus.es/sites/default/files/styles/mopis_news_carousel_item_desktop/public/metalocus_ryue-nishizawa_house-in-los-vilos_chile_17.jpg?itok=R97hQwCa",
        "information": "Los Vilos House designed by the Japanese studio SANAA is located on the shores of the Pacific Ocean in Los Vilos, Chile. The configuration of this house agrees with the natural forms formed by the landscape. In this project of SANAA, the most outstanding architectural element, and to which it is given more importance is the roof. The undulations of the same do not need to incorporate walls in the project, therefore different spaces are created dedicated to each area of the home. With respect to the materials, the concrete is used for the roof, which is supported by steel pillars and glass for the vertical enclosure.",
        "year": "1998",
        "location": "Los Vilos, Chile",
        "area": 5356.66002,
        "materials": [
            "concrete", 
            "wood", 
            "glass"]
    },

    {
        "id": 10,
        "title": "The Rolex Learning Center",
        "image": "https://www.researchgate.net/profile/Merve-Oener/publication/319016861/figure/fig5/AS:631676514349080@1527614825850/External-view-of-the-Rolex-Learning-Center-Source-Zumtobel-2011.png",
        "information": "The Rolex Learning Center will function as a laboratory for learning, a library with 500,000 volumes and an international cultural hub for EPFL, open to both students and the public. Spread over one single fluid space of 20,000 sq metres, it provides a seamless network of services, libraries, information gathering, social spaces, spaces to study, restaurants, cafes and beautiful outdoor spaces. It is a highly innovative building, with gentle slopes and terraces, undulating around a series of internal 'patios', with almost invisible supports for its complex curving roof, which required completely new methods of construction.",
        "year": "2010",
        "location": "Lausanne, Switzerland",
        "area": 398264,
        "materials": [
            "steel", 
            "wood", 
            "concrete",
            "glass"]
    }
];

# ROUTES
@app.route('/')
def homepage():
    popular_buildings=list(buildings)[:3]
    return render_template('homepage.html', buildings=popular_buildings)   

@app.route('/search_results/<query>')
def search(query=None):

    title_matching=[]
    location_matching=[]
    for i in buildings:
        if query.lower() in i["title"].lower():
            title_matching.append(i)
        if query.lower() in i["location"].lower():
            location_matching.append(i)

    material_matching=[]
    for i in buildings:
        for j in i["materials"]:
            if query.lower() in j.lower():
                material_matching.append(i)
          
    return render_template('search.html', buildings=buildings, material_matching=material_matching, location_matching=location_matching, title_matching=title_matching, query=query) 

@app.route('/view/<id>')
def view(id=0):
    global buildings

    for building in buildings:
        if building["id"] == int(id):
            return render_template('view.html', building=building) 

@app.route('/edit/<id>')
def render_edit(id=0):
    global buildings

    for building in buildings:
        if building["id"] == int(id):
            temp=building.copy()
            temp["materials"]=",".join(temp["materials"])
            return render_template('edit.html', building=temp)

@app.route('/add')
def render_add():
    return render_template('add.html', buildings=buildings) 


# AJAX FUNCTIONS
@app.route('/add', methods=['GET', 'POST'])
def add():
    global buildings
    global current_id

    json_data = request.get_json()

    title = json_data["title"] 
    image = json_data["image"]
    information = json_data["information"]  
    year = json_data["year"]
    location = json_data["location"]
    area= json_data["area"]
    materials=json_data["materials"]

    current_id +=1

    new_entry = {
        "id": current_id,
        "title": title,
        "image": image,
        "information": information,
        "year":  year,
        "location": location,
        "area": area,
        "materials": materials
    }

    buildings.append(new_entry)

    return jsonify(buildings = buildings)

@app.route('/edit/<id>', methods=['GET', 'POST'])
def edit(id):
    global buildings

    json_data = request.get_json()

    thisId= json_data["id"]
    title = json_data["title"] 
    image = json_data["image"]
    information = json_data["information"]  
    year = json_data["year"]
    location = json_data["location"]
    area= json_data["area"]
    materials=json_data["materials"]

    edit_entry = {
        "id": thisId,
        "title": title,
        "image": image,
        "information": information,
        "year":  year,
        "location": location,
        "area": area,
        "materials": materials
    }
    for building in buildings:
        if building["id"] == thisId:
            temp=building.copy()
            temp=edit_entry
            buildings[building["id"]-1]=temp
            return jsonify(building = temp)


if __name__ == '__main__':
   app.run(debug = True)




