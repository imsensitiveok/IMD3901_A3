'use strict'

AFRAME.registerComponent('timer', {
    init: function() {
        
        const timer = document.querySelector('#timer');

        var timeInterval;
        
        function updateTime() {

          var time = timer.getAttribute('time');

          timer.setAttribute('time', time - 1);

          timer.setAttribute('text', 'value', 'Timer: ' + time);

          if(time == 0) {
            //stop timer:
            clearInterval(timeInterval);

            //switch state:
            player.state = "swapping";
            //ADD: set all atributes to default again (isPickedUp)

            //ADD: things that end their turn? turn off ability to click? 

          }
        }
    }
});