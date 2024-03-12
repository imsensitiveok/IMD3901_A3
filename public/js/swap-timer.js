'use strict'

AFRAME.registerComponent('timer', {
    init: function() {
        
        const startButton = this;
        const timer = document.querySelector('#timer');

        //var timeInterval;
        
        startButton.el.addEventListener('click', (e) => {
          //console.log(document.querySelector('#camera').getAttribute("state"));

          if (document.querySelector('#camera').getAttribute("state") == "swapping"){
            timeInterval = setInterval(updateTime, 1000);
            console.log('oh fork');
          }

        })
        
        
        function updateTime() {
          
          var time = timer.getAttribute('time');
          timer.setAttribute('time', time - 1);
          timer.setAttribute('text', 'value', 'Timer: ' + time);

          if(time == 0) {
            //stop timer:
            clearInterval(timeInterval);

            //emit stuff:
            var cardCol = [
              document.querySelector('#first_card').getAttribute('material').color,
              document.querySelector('#second_card').getAttribute('material').color,
              document.querySelector('#third_card').getAttribute('material').color,
              document.querySelector('#fourth_card').getAttribute('material').color
            ]
            socket.emit('timer_over', cardCol);

            //switch state:
            player.state = "matching";

            //get cards:
            var cards = [
              document.querySelector('#first_card'),
              document.querySelector('#second_card'),
              document.querySelector('#third_card'),
              document.querySelector('#fourth_card')
            ];

            //set card values to defaults:
            for (var i = 0; i< cards.length; i++) {
              cards[i].setAttribute('isPickedUp', false);
              cards[i].setAttribute('scale', '1, 1, 1');
            }



            //ADD: things that end their turn? turn off ability to click? 

          }
        }
    }
});