
let sites_raw = new Map();
sites_raw.set(0, ['Aboriginal Dreamings Gallery', "19 O'Hanlon Pl, Gold Creek Village, Nicholls", '10%', '48%', 'installation', 'assets/dreaming_gal.jpg',
"Aboriginal Dreamings Gallery is a commercial gallery, established in the Canberra region of Australia in 1989. The Gallery has a comprehensive, ethically sourced collection of Australian Indigenous art and craft, with paintings sourced from the 1970s." +
" The art has been selected from numerous Indigenous Communities and Art Centres, and includes works by important artists, together with paintings and crafts by many emerging and collectable artists." + 
" Changing exhibitions are presented in the Gallery every 4 to 6 weeks, and other artworks from the Gallery's extensive art collection are available to art collectors world-wide. \n\nDescription from Aboriginal Dreamings Gallery", "https://visitcanberra.com.au/attractions/56b23b8eb042386245d4312e/aboriginal-dreamings-gallery"])
sites_raw.set(1, ['Birrigai Rock Shelter', 'Near Birrigai in Tidbinbilla Reserve',
'38%', '30%', 'heritage', 'assets/Birrigai_Rock.jpg','There is evidence that Aboriginal people have lived in the Canberra region for at least 26,000 years. Walk the Birrigai Time Trail to the Birrigai Rock Shelter considered one of the oldest rock shelters in the region. \n\nDescription from ACT Heritage Council',
'https://australianhiker.com.au/trails/birrigai-time-trail-act-3-4-km/']);
sites_raw.set(2, ['Black Mountain', 'Central Canberra, between Aranda and Acton',
'20%', '52%', 'heritage', 'assets/black_mountain.jpg', "Black Mountain - a sacred place to the local Aboriginal people. The Ngunawal people used the area as an important meeting and business site, predominantly for men's business. " +
"According to Tyronne Bell, Ngunawal man, Black Mountain was also used by the Ngunawal/Ngunnawal people as a site for initiation, with the mountain itself said to represent the growth of a boy into a man. \n\nDescription from ANU Heritage Council", 'https://www.flickr.com/photos/ozbandit/146060667/in/set-72057594140436342'])
sites_raw.set(3, ['Burrunju Art Gallery', '254 Lady Denman Drive, Canberra', '21%','48%', 'installation', 'assets/burrunju.jpg',
"Burrunju Art Centre is an Aboriginal owned and run not for profit charity located next to Lake Burley Griffin, Canberra. Burrunju was established in 2014 as a registered not for profit charity with ACNC, and is the only Aboriginal-owned art gallery in Canberra. " +
"The word Burrunju means ruined city of Arnhem Land and the resting place of our founding members' totem the saltwater catfish. Burrunju connects all of our kinship in Southern Arnhem Land. \n\nDescription from Burrunju Art Centre", "https://www.burrunju-aboriginal-arts.org.au/"], )
sites_raw.set(4, ['Hanging Rock', 'Tidbinbilla Nature Reserve', '43%', '32%', 'heritage', 'assets/hanging_rock.jpg',
"Over 400 years ago small family groups and male hunting parties of Ngunnawal and Wolgalu regularly camped beneath the rock. It is likely they sheltered there on their way to the surrounding mountains to gather food in spring and Bogong moths during the summer." +
" Hanging Rock also has the advantage of being close to fresh running water, as such, the Ngunnawl and Wolgalu were able to congregate here in larger numbers for celebrations, trade and intermarriages. \n\nDescription from Parks ACT", "https://australianhiker.com.au/trails/hanging-rock-trail-act-0-6-km/"])
sites_raw.set(5, ['Mount Majura', 'Northen Canberra, Between Suburbs Majura and Watson', '19%', '59%', 'heritage', 'assets/mt_majura.jpg',
"Aboriginals settled in this region around 21,000 years ago, with Mount Majora acting as a landmark to guide direction. Their presence indicates trading with both inland groups and coastal groups, extending their range of resources. Mt Majura is covered in a hard rock called 'chert'," +
" which protrudes from the soil surface. Chert forms sharp shards when broken and was often used by Aboriginal people to make tools. \n\nDescription from Conservation Council ACT"])
let sites_obj = [];

// This function dynamically creates a list item for each site.
// It assigns an ID and a click event listener to each list item.
for (i=0; i<sites_raw.size; i++){
    const site = new Object();
    site.name = sites_raw.get(i)[0]
    site.location = sites_raw.get(i)[1]
    site.top = sites_raw.get(i)[2]
    site.bottom = sites_raw.get(i)[3]
    site.type = sites_raw.get(i)[4]
    site.image = sites_raw.get(i)[5]
    site.desciption = sites_raw.get(i)[6]
    site.url = sites_raw.get(i)[7]
    sites_obj.push(site)
}

// This function maps the given key to a corresponding value in the dictionary.
// It is used to convert specific keys to more human-readable values.
function get_type(key) {
    const dict = new Map();
        dict.set("heritage", "Sacred Site");
        dict.set("installation", "Installation or Art collection");
    
    return dict.get(key)
}

function create_list(site, i){
    const parent = document.getElementById("all-sites");
    const div = document.createElement("div");
    div.className = "list-item";
    div.id = `list_${i}`;
    div.addEventListener('click', () => handleClick(event));

    const title = document.createElement("h3");
    title.id = `list_${i}`;
    title.innerText = site.name;

    div.appendChild(title);
    parent.appendChild(div)
}

// This function handles the click event on each list item or map dot.
// It adjusts the visibility and color of the selected and unselected items,
// and dynamically generates and inserts detailed information about the selected site.
function handleClick(event){
    let current = 0;
    // This loop finds the selected site, then adjust the other dots/sites styling to ensure the user knows which site is active.
    for (i in sites_obj){
        const dot = document.getElementById(i);
        const title = document.getElementById(`list_${i}`)
        if (!(i == event.target.id)){
            if (!(i == event.target.id.substr(-1))){
                dot.style.opacity = 0.3;
                title.style.color = "#71717a";
            }
            else {
                dot.style.opacity = 1;
                title.style.color = 'white';
                current = i;
            }
        }
        else {
            title.style.color = 'white';
            dot.style.opacity = 1;
            current = i;
        }
    }

    const id = event.target.id;
    const site = sites_obj[current];
    const old_element = document.getElementsByClassName('info-container');
    if (old_element.length > 0) {
        old_element[0].remove()
    }
    const info = document.createElement("div");
    info.className = 'info-container';

    const heading = document.createElement("h2");
    heading.innerText = site.name + " - " + get_type(site.type);
    info.appendChild(heading);

    const location = document.createElement("h3");
    location.innerText = site.location;
    info.appendChild(location);

    const content_parent = document.createElement("div"); 
    content_parent.className = 'content-parent';

    const desciption = document.createElement("p");
    desciption.innerText = site.desciption;

    const wrapper = document.createElement("div");
    const image = document.createElement("img");
    image.src = site.image;
    image.className = 'content-image';

    const image_src = document.createElement("a");
    image_src.innerText = 'Click here for image source!'
    image_src.href = site.url;

    wrapper.appendChild(image)
    wrapper.appendChild(image_src)
    content_parent.appendChild(desciption);
    content_parent.appendChild(wrapper);
    info.appendChild(content_parent);

    const parent = document.getElementById('content');
    const after_element = document.getElementById('all-sites');
    parent.insertBefore(info, after_element)
}

document.addEventListener('DOMContentLoaded', function() {

    // This loop iterates over each item in the sites_obj array, creating a dot element for each site
    // and appending it to the map container. It also calls the create_list function to create list items.
    let container = document.getElementById("map-container");
    for (i in sites_obj){
        let site = sites_obj[i]
        let dotElement = document.createElement('div');
        dotElement.className = `dot ${site.type}`;
        dotElement.id = i;
        dotElement.style.top = site.top;
        dotElement.style.left = site.bottom;
        dotElement.addEventListener('click', () => handleClick(event))
        container.append(dotElement);
        create_list(site, i);
    }

});
