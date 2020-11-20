var score = 0;
var speed = 8000;
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
        case '-20px':
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
function checkLoot() {
    //Position Loot
    let centerLoot = 15;
    let positionLootVertical = parseInt($('#loot').css('top'))+centerLoot;
    let positionLootHorizontal = parseInt($('#loot').css('left'))+centerLoot;
    //Position Ship
    let ship = $('#spaceship');
    let sizeShip = 70;
    let positionShipTop = parseInt(ship.css("top"));
    let positionShipBottom = positionShipTop+sizeShip;
    let positionShipLeft = parseInt(ship.css("Left"));
    let positionShipRight = positionShipLeft+sizeShip;

    if (((positionLootVertical >= positionShipTop && (positionLootVertical <= positionShipBottom)) && ((positionLootHorizontal <= positionShipRight) && (positionLootHorizontal <= positionShipLeft)))) {
        console.log('dans le if');
        $('#loot').stop();
        randomLootPos();
        moveLoot();
    }

}
function updateScore() {
    
}

function moveLoot() {
    speed -=150;
    $("#loot").animate({top: '+=370'}, speed, 'linear',function () {
        moveLoot();
        randomLootPos();
    });
}
$(document).ready(function () {
    randomLootPos();
    moveLoot();
});