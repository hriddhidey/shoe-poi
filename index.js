var image = document.getElementById('object-image')
var pulsePosition = image.getBoundingClientRect();

if(image.complete){
    setTimeout(function() {addPulses()}, 1000);
}
else {
    image.addEventListener("load", function(){
        setTimeout(function() {addPulses()}, 1000);
    });
}

function addPulses(){
    for (var i=1; i<=3;i++) {
        var points = document.getElementsByClassName('poi '+i)[0].attributes.coords.value.split(',')

        var x = parseInt(points[0]) - pulsePosition.left;
        var y = parseInt(points[1]) + pulsePosition.top;
        
        var holder = document.createElement("div");
        holder.className = "pulse-ball "+i;  
        holder.id = i;      
        holder.style.top = y; 
        holder.style.left = x;
        document.getElementById("container").appendChild(holder);
    }    
}


var card = document.getElementById('info-card');
var closeCard = document.getElementById('info-card-close');
var cardTitle = document.getElementById('info-card-title');
var cardContent = document.getElementById('info-card-content');
var title,content;
var imageMap = document.querySelector('map');


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

document.addEventListener("DOMContentLoaded", function(event) { 
    
    imageMapResize();
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

function removeCard(){
    var card = document.getElementById('info-card');
    card.style.opacity = 0;
    setTimeout(function(){ card.style.visibility = "hidden"; },1000);
}
