var image = document.getElementById('object-image')
var imagePosition = image.getBoundingClientRect();
var card = document.getElementById('info-card');
var closeCard = document.getElementById('info-card-close');
var cardTitle = document.getElementById('info-card-title');
var cardContent = document.getElementById('info-card-content');
var title,content;
var imageMap = document.querySelector('map');


document.addEventListener("DOMContentLoaded", function(event) { 

    // This is to allow the area maps to 
    // resize according to window resizing.
    // imageMapResize();

    if(image.complete){
        setTimeout(function() {
            resizeMap()
        }, 1000);
    }
    else {
        image.addEventListener("load", function(){
            setTimeout(function() {
                resizeMap()
            }, 1000);
        });
    }
    
    document.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;  
        var classes = target.className.split(/\s+/);
        if(classes[0]=='pulse-ball'){
            var tnode = document.getElementsByClassName('poi '+classes[1])
            handleClick(tnode[0]);
        }
    }, false);
});


function handleClick(poi){
    var classNames = poi.className.split(/\s+/);
    if (classNames[2]=='heel'){
        title = 'Padded Heel.' 
        content = 'Extra padding provided to cushion your heels.'
    }
    else if (classNames[2]=='sole'){
        title = 'Improved treads.'
        content = 'Get more control with deeper treads. Never slip again.'
    }
    else if (classNames[2]=='front'){
        title = 'Greater aeration.'
        content = 'Perforated front net provides greater aeration and a lighter feeling.'
    }

    card.style.visibility="visible";
    card.style.opacity=1;
    cardTitle.innerHTML = title;
    cardContent.innerHTML = content;
}

function addPulses(){
    for (var i=1; i<=3;i++) {
        var points = document.getElementsByClassName('poi '+i)[0].attributes.coords.value.split(',')
        var x = parseInt(points[0]) + imagePosition.left;
        var y = parseInt(points[1]) + imagePosition.top;
        
        var holder = document.createElement("div");
        holder.className = "pulse-ball "+i;  
        holder.id = i;      
        holder.style.top = y; 
        holder.style.left = x;
        document.getElementById("container").appendChild(holder);
    }    
}

function removeCard(){
    var card = document.getElementById('info-card');
    setTimeout(function(){ 
        card.style.visibility = "hidden";
    },500);
    card.style.opacity = 0;
}

function resizeMap(){
    var originalWidth = 480;
    var areas = document.getElementsByTagName('area')
    var currentWidth = document.getElementById('object-image').scrollWidth;
    var ratio = currentWidth/originalWidth
    var coords = []

    for(var i=0; i<areas.length;i++){
        coords[i] = areas[i].coords.split(',')
        debugger
    }

    for(var i=0; i<coords.length;i++){
        var ccount = coords[i].length
        for(var j=0;j<ccount;j++){
            coords[i][j] *= ratio
        }
        areas[i].coords = coords[i].join(',')
    }
    addPulses()
}