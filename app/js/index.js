import "./imports";

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

if (isMobile) {

  document.getElementById('slider').style.opacity = 0;

  document.querySelector('.spinner').addEventListener("transitionend", () => {
    document.getElementById('slider').style.opacity = 1;
    document.getElementById('slider').style.visibility = 'visible';
    document.getElementById('slider').classList.add("fade-in");
  });

  document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
      window.scrollTo(0, 0);
      document.getElementById('slider').style.height = `${Array.from(document.querySelectorAll(".container"))[0].offsetHeight}px`;
      document.getElementById('slider').style.overflow = 'hidden';

      if (navigator.msMaxTouchPoints) {
        // document.body.classList.add("ms-touch");
    
        // document.body.addEventListener("scroll", event => {
        //     document.querySelector('.slide-image').style.transform = `translate3d(-${(100-$(this).scrollLeft()/6)}px,0,0)`;
        // });
    } else {
    
        let slider = {
      
          el: {
            slider: document.getElementById('slider'),
            holder: document.querySelector('.holder'),
            imgSlide: document.querySelector('.container')
          },
      
          slideHeight: document.querySelectorAll(".container")[0].offsetHeight,
          touchstarty: undefined,
          touchstartx: undefined,
          touchendy: undefined,
          movey: undefined,
          index: 0,
          longTouch: undefined,
          lastTouch:0,
          heightValues: [],
          
          init: function() {
            this.bindUIEvents();
    
            for (const elem of Array.from(document.querySelectorAll(".container"))) {
                this.heightValues.push(this.getPosition(elem));
            }
    
            document.querySelector('.spinner').classList.add('fade-out');
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
    
          getPosition: function(element) {
            var xPosition = 0;
            var yPosition = 0;
        
            while(element) {
                xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
                yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
                element = element.offsetParent;
            }
        
            return yPosition;
        },
      
          start: function(event) {
            // Test for flick.
            this.longTouch = false;
            setTimeout(function() {
              window.slider.longTouch = true;
            }, 250);
      
            // Get the original touch position.
            this.touchstartx = event.changedTouches[0].pageX;
      
            // The movement gets all janky if there's a transition on the elements.
            if (document.querySelector('.animate') != null) {
              document.querySelector('.animate').classList.remove('animate');
            }
          },
    
          move: function(event) {
            
          },
      
          end: function(event) {
    
            let touchEndx = event.changedTouches[0].pageX;
            let swipeX = touchEndx - this.touchstartx;
    
            if (swipeX < -50) {
                //left down
                if (this.index < document.querySelectorAll(".container").length-1) {
                  this.index++;
                  window.scrollTo(0, 0);
                }
            } else if (swipeX > 50) {
                if (this.index > 0) {
                  this.index--;
                  window.scrollTo(0, 0);
                }
            }
    
            this.el.holder.classList.add('animate');
            this.el.holder.style.transform = `translate3d(0,-${this.heightValues[this.index]}px,0)`;
            document.getElementById('slider').style.height = `${Array.from(document.querySelectorAll(".container"))[this.index].offsetHeight}px`;
            document.getElementById('slider').style.overflow = 'hidden';
          }
      
        };
      
        slider.init();
      }
    }, 500);
  }, false); 
} else {
  document.querySelector('.spinner').classList.add('fade-out');
  document.getElementById('slider').style.visibility = 'visible';
  document.getElementById('slider').classList.add("fade-in");
}
