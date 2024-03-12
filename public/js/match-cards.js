'use strict'

AFRAME.registerComponent('matchable', {
    init: function() {

        const card = this;
        const player = document.querySelector('#camera');

        //player.state = "matching";
        player.isHolding = false;

        card.isMatched = false;

        card.el.addEventListener('click', (e) => {

            //check state:
            if (player.state == "matching") {

                //switch colours:
                if (player.isHolding === true) {

                    //get card IDs:
                    var cardOneID = document.querySelector('[isPickedUp="' + true + '"]').getAttribute('id');
                    var cardTwoID = card.el.getAttribute('id')


                    if (cardOneID != cardTwoID) {

                        //get colors:
                        var cardOne = document.querySelector('[isPickedUp="' + true + '"]');
                        var cardOneCol = cardOne.getAttribute('material').color;
                        var cardTwoCol = card.el.getAttribute('material').color;

                        //if colours match:
                        if (cardOneCol == cardTwoCol) {

                            //show card colour:
                            cardOne.querySelector('#cover').setAttribute('visible', false);
                            card.el.querySelector('#cover').setAttribute('visible', false);

                            //set cards to matched:
                            cardOne.setAttribute('isMatched', true);
                            card.el.setAttribute('isMatched', true);

                            //ADD: emit stuff:
                            var swappedCards = [cardOne.getAttribute('id'), card.el.getAttribute('id')]
                            socket.emit("card_matched", swappedCards);
                        } 
                        else {
                            //hide card:
                            cardOne.querySelector('#cover').setAttribute('visible', true);
                        }

                        //set pickup/hold values back to false:
                        document.querySelector('[isPickedUp="' + true + '"]').setAttribute('isPickedUp', false);
                        player.isHolding = false;

                        //check if won:
                        if (document.querySelector('[isMatched="' + false + '"]') == null) {
                            console.log("you won!");

                            //update state:
                            player.state == "won"
                            
                            //ADD: emit stuff
                            
                        }
                    }
                }
                
                //pick up card:
                else {
                    card.el.setAttribute('isPickedUp', true);
                    card.el.querySelector('#cover').setAttribute('visible', false);
                    player.isHolding = true;
                }
            }
            

            //ADD: hover effects


        });
    }
});