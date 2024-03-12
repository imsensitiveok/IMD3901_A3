'use strict'

AFRAME.registerComponent('switchable', {
    init: function() {

        //declare variables:
        const card = this;
        card.el.isMatched = false;
        const player = document.querySelector('#camera');
        player.isHolding = false;
        const swapSound = document.querySelectorAll('.swap-sound');


        card.el.addEventListener('click', (e) => {

            //check state:
            if (player.state == "swapping" && card.el.isMatched == false) {

                //switch colours:
                if (player.isHolding === true) {

                    //get colors:
                    var cardOneCol = document.querySelector('[isPickedUp="' + true + '"]').getAttribute('material').color;
                    var cardTwoCol = card.el.getAttribute('material').color;

                    //set colors:
                    document.querySelector('[isPickedUp="' + true + '"]').setAttribute('material', 'color', cardTwoCol);
                    card.el.setAttribute('material', 'color', cardOneCol);

                    //set values back to default:
                    document.querySelector('[isPickedUp="' + true + '"]').setAttribute('scale', '1, 1, 1');
                    document.querySelector('[isPickedUp="' + true + '"]').setAttribute('isPickedUp', false);
                    player.isHolding = false;

                    //play sounds effect:
                    swapSound.forEach(function(soundEntity) {
                        soundEntity.components.sound.playSound();
                    });
                }

                //pick up card:
                else {
                    card.el.setAttribute('isPickedUp', true);
                    player.isHolding = true;

                    //set scale to 1.1:
                    card.el.setAttribute('scale', '1.1, 1.1, 1.1');
                }
            }
        });
    }
});