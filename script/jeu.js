var score = 0;
var speed = 8000;
let speedAfficher =150; 
var life =3;
//Fonction pour bouger le vaisseau
$(document).keydown(function (e) {
    const spaceship = $("#spaceship");
    switch (e.key) {
        case 'ArrowRight':
            spaceship.css("left","+=30px");
            break;
        case 'ArrowLeft':
            spaceship.css("left","-=30px");
            break;
        case 'ArrowUp':
            spaceship.css("top","-=30px");
            break;
        case 'ArrowDown':
            spaceship.css("top","+=30px");
            break;
    }
    // console.log('Coordonnee spaceship');
    // console.log('y : '+spaceship.css("top"));
    // console.log('x : '+spaceship.css("left"));
    //Limitation de la carte (gauche, droite)
    switch (spaceship.css("left")) {
        case '520px':
            spaceship.css("left",'-=30px');
            break;
        case '-50px':
            spaceship.css("left",'+=30px');
            break;
    }
    //Limitation de la carte(haut, bas)
    switch (spaceship.css("top")) {
        case '-30px':
            spaceship.css("top",'+=30px');
            break;
        case '330px':
            spaceship.css("top",'-=30px');
            break;
    }
    checkLoot();
})

function randomLootPos() {
    $('#loot').css('top', 0);
    $('#loot').css("left", Math.random()* ($('#game').width()-$('#loot').width()));
}
//Verifie si le loot est rentré en colision avec le spatialship
function checkLoot() {
    //Position Loot
    let centerLoot = 15;
    let positionLootVertical = parseInt($('#loot').css('top'))+centerLoot;
    let positionLootHorizontal = parseInt($('#loot').css('left'))+centerLoot;
    //Position Ship
    let ship = $('#spaceship');
    let sizeShip = 100;
    let positionShipTop = parseInt(ship.css("top"));
    let positionShipBottom = positionShipTop+sizeShip;
    let positionShipLeft = parseInt(ship.css("Left"));
    let positionShipRight = positionShipLeft+sizeShip;

    if (((positionLootVertical >= positionShipTop && (positionLootVertical <= positionShipBottom)) && ((positionLootHorizontal <= positionShipRight) && (positionLootHorizontal >= positionShipLeft)))) {
        $('#loot').stop();
        updateScore();
        randomLootPos();
        moveLoot();
    }

}
function gameLoose() {
    if ($('#loot').css('top', 400)) {
        life-=1;
        if (life == 0) {
            $('#score').text('Game loose');
            $('#loot').remove();
        }
        $('#life').text('number of lives : '+life);
    }
    
}
function updateScore() {
    score+=10;
    if (speed <= 6000) {
        console.log(speed);
        score+=50
    }
    $('#score').text('Score : '+score);
}

function moveLoot() {
    speed -=150;
    $("#loot").animate({top: '+=370'}, speed, 'linear',function () {
        gameLoose();
        moveLoot();
        randomLootPos();
    });
    $('#speed').text('Speed : '+speedAfficher);
    speedAfficher +=150
    resetSpeed();
}

function resetSpeed() {
    if (speed<=0) {
        speed=8000;
    }
}
$(document).ready(function () {
    randomLootPos();
    moveLoot();
    $('#life').text('number of lives : '+life);
    $('#speed').text('Speed : '+0)
});
$('#restart').click(function () {
    if ($("#game").children().length == 1) {
        // <img src="img/loot.png" alt="loot" id="loot"> before().append("img").attr('id', 'loot').attr('src', 'img/loot.png').attr('alt', 'loot');
        $('#game').append('<img src="img/loot.png" alt="loot" id="loot">');
        location.reload();
    }
});
