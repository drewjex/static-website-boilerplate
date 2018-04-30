import "./imports";

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
    document.getElementById('slider').style.height = `${Array.from(document.querySelectorAll(".container"))[0].offsetHeight}px`;
    document.getElementById('slider').style.overflow = 'hidden';
  }, 500);
}, false);

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

        console.table(this.heightValues);
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

        console.log("HIT");

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

