$(function() {
     var firstCard = null;
     var clicksDisabled = false;

     var cards = [
          'darth-vader', 'chewbacca', 'yoda', 'boba-fett', 'luke-skywalker', 'mace-windu', 'princess-leia', 'padme-amidala',
          'darth-vader', 'chewbacca', 'yoda', 'boba-fett', 'luke-skywalker', 'mace-windu', 'princess-leia', 'padme-amidala'
     ];
     
     function reset() {
         firstCard = null;
         clicksDisabled = false;
         $('#board').show();
         
          // shuffle the cards and reset all the attributes
          $('#board').empty();
          shuffle(cards);
          for (var i = 0; i < cards.length; i++) { 
               $('<div class="card ' + cards[i] + ' face-down" data-card="' + cards[i] + '"></div>')
                    .appendTo($('#board'));
          }
          
          $("#winning").hide()
     }
     
     function isGameOver() {
          if ($('.card.face-down').length < 1) {
               return true;
          } else {
               return false;
          }
     }
     
     
     
     function clickCard() {
         
        var $currentCard = $(this);
        
        if(clicksDisabled){
            return;
        }
        
        if (!$currentCard.hasClass('face-down')) {
            return;
        }
        
        $currentCard.removeClass('face-down');
        
        if (firstCard == null) {
            firstCard = $currentCard;
            return;
        } else { 
             
      if (firstCard.data('card') == $currentCard.data('card')) {
        
                var snd = new Audio("./soundeffects/lasercannon.mp3"); 
                snd.play();               
                firstCard = null
                
                
                if(isGameOver()){
                    $('#winning').show();
                    $('#board').hide();
               
               }
                
           } else {
               clicksDisabled = true;
               
               var snd = new Audio("./soundeffects/no.mp3"); 
                snd.play();
               
                setTimeout(function() {
                    firstCard.addClass('face-down');
                    $currentCard.addClass('face-down');
                    clicksDisabled = false
                    firstCard = null;
                }, 1000);
           }
        }
     }
    
     
     $('#reset').click( reset );
     $('#board').on('click', '.card', clickCard);
     
     reset()
});





     
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
  
}

