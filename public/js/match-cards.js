'use strict'

AFRAME.registerComponent('matchable', {
    init: function() {

        //declare constants:
        const card = this;
        const player = document.querySelector('#camera');

        card.el.addEventListener('click', (e) => {

            //check state:
            if (player.state == "matching") {

                //match cards:
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

                            //emit event and send ids of swapped cards:
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

                            //display end screen:
                            document.querySelector('#restart_button').setAttribute('position', '0 -2 0');
                            document.querySelector('#end_screen').setAttribute('visible', true);
                            
                            //emit stuff:
                            socket.emit("won");
                        }
                    }
                }
                
                //pick up card:
                else {
                    //set pickup/hold values to true:
                    card.el.setAttribute('isPickedUp', true);
                    player.isHolding = true;

                    //uncover the card:
                    card.el.querySelector('#cover').setAttribute('visible', false);
                }
            }
        });
    }
});