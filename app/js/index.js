import "./imports";

var longPress = false;

let isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {    
    isMobile = true;
}

if (isMobile) {

    document.addEventListener('DOMContentLoaded', () => {

        //apply mobile styles
        document.querySelector('.holder').classList.add('mobile-holder');  
        let containers = Array.from(document.querySelectorAll('.container'));
        for (const elem of containers) {
          elem.classList.add('mobile-container');
        }

        //make page invisible while loading
        let sliderElem = document.getElementById('slider');
        sliderElem.style.opacity = 0;

        //on spinner transition end, fade-in everything else
        setTimeout(() => {
          sliderElem.style.opacity = 1;
          sliderElem.style.visibility = 'visible';
          sliderElem.classList.add("fade-in");
          window.scrollTo(0, 0);
        }, 100);

        let ticketCounts = Array.from(document.querySelectorAll('.ticket-cnt'));
        for (const elem of ticketCounts) {
          elem.style.fontWeight = '900';
          elem.style.fontSize = '16px';
        }

        if (navigator.msMaxTouchPoints) {
          // document.body.classList.add("ms-touch");
      
          // document.body.addEventListener("scroll", event => {
          //     document.querySelector('.slide-image').style.transform = `translate3d(-${(100-$(this).scrollLeft()/6)}px,0,0)`;
          // });
      } else {

          let previousOrientation = window.orientation;
          let checkOrientation = function() {
              if(window.orientation !== previousOrientation){
                  previousOrientation = window.orientation;
                  window.scrollTo(0, 0);
                  setTimeout(() => {
                    slider.resetHeightValues();
                  }, 500);
              }
          };
        
          window.addEventListener("resize", checkOrientation, false);
          window.addEventListener("orientationchange", checkOrientation, false);
      
          let slider = {
        
            el: {
              slider: document.getElementById('slider'),
              holder: document.querySelector('.holder'),
              imgSlide: document.querySelector('.container')
            },
        
            slideHeight: document.querySelectorAll(".container")[0].offsetHeight,
            slideWidth: document.querySelectorAll(".container")[0].offsetWidth,
            touchstarty: 0,
            touchstartx: 0,
            touchmovex: 0,
            touchmovey: 0,
            xDelta: 0,
            yDelta: 0,
            sensitivity: 10,
            flickSensitivity: 3,
            index: 0,
            timer: undefined,
            lastTouch:0,
            
            init: function() {
              this.resetHeightValues();
              this.bindUIEvents();
              this.el.holder.classList.add('animate');
              this.el.holder.style.transform = `translate3d(0,0,0)`;
              document.getElementById('slider').style.height = `${Array.from(document.querySelectorAll(".container"))[0].offsetHeight}px`;
              document.getElementById('slider').style.overflow = 'hidden';
            },

            resetHeightValues: function() {
              this.slideHeight = document.querySelectorAll(".container")[0].offsetHeight;
              this.slideWidth = document.querySelectorAll(".container")[0].offsetWidth;
            },
        
            bindUIEvents: function() {
        
              this.el.holder.addEventListener("touchstart", function(event) {
                slider.start(event);
              });
      
              this.el.holder.addEventListener("touchmove", function(event) {
                  slider.move(event);
                });
        
              this.el.holder.addEventListener("touchend", function(event) {
                slider.end(event);
              });
        
            },
        
            start: function(event) {
              // Test for flick.
              longPress = false;
              this.timer = setTimeout(function() {
                longPress = true;
              }, 250);
        
              // Get the original touch position.
              this.touchstartx = event.changedTouches[0].pageX;
              this.touchstarty = event.changedTouches[0].pageY;
        
              // The movement gets all janky if there's a transition on the elements.
              if (document.querySelector('.animate') != null) {
                document.querySelector('.animate').classList.remove('animate');
              }
            },
      
            move: function(event) {
              // Continuously return touch position.
              this.touchmovex =  event.changedTouches[0].pageX;
              this.touchmovey = event.changedTouches[0].pageY;

              this.xDelta = this.touchstartx - this.touchmovex;
              this.yDelta = this.touchstarty - this.touchmovey;

              // Calculate distance to translate holder.
              this.movex = this.index*this.slideWidth + this.xDelta;
              if (this.index < document.querySelectorAll(".container").length && Math.abs(this.xDelta) > this.sensitivity) { // Makes the holder stop moving when there is no more content.
                this.el.holder.style.transform = `translate3d(-${this.movex+(this.xDelta < 0 ? this.sensitivity : -this.sensitivity)}px,0,0)`;
              }
            },
        
            end: function(event) {
      
              let touchEndx = event.changedTouches[0].pageX;
              let swipeX = touchEndx - this.touchstartx;

              var absMove = Math.abs(this.index*this.slideWidth - this.movex);

              // Calculate the index. All other calculations are based on the index.
              if (absMove > this.slideWidth/2 || (longPress === false && Math.abs(this.xDelta)/Math.abs(this.yDelta) > this.flickSensitivity)) { //|| longPress === false
                if (this.movex > this.index*this.slideWidth && this.index < document.querySelectorAll(".container").length-1) {
                  this.index++;
                } else if (this.movex < this.index*this.slideWidth && this.index > 0) {
                  this.index--;
                }
              }      
              this.el.holder.classList.add('animate');
              this.el.holder.style.transform = `translate3d(-${this.index*this.slideWidth}px,0,0)`;
              document.getElementById('slider').style.height = `${Array.from(document.querySelectorAll(".container"))[this.index].offsetHeight}px`;
              document.getElementById('slider').style.overflow = 'hidden';
            }
        
          };
        
          slider.init();
        }
    }, false); 
} else {
    document.getElementById('slider').style.visibility = 'visible';
    document.getElementById('slider').classList.add("fade-in");
}
