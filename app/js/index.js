import "./imports";

if (navigator.msMaxTouchPoints) {
    document.body.classList.add("ms-touch");

    document.body.addEventListener("scroll", event => {
        document.querySelector('.slide-image').style.transform = `translate3d(-${(100-$(this).scrollLeft()/6)}px,0,0)`;
    });
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
      moveDown:true,

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

    dw_getScrollOffsets: function() {
        var doc = document, w = window;
        var x, y, docEl;
        
        if ( typeof w.pageYOffset === 'number' ) {
            x = w.pageXOffset;
            y = w.pageYOffset;
        } else {
            docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat')?
                    doc.documentElement: doc.body;
            x = docEl.scrollLeft;
            y = docEl.scrollTop;
        }
        return {x:x, y:y};
    },
  
      start: function(event) {
        // Test for flick.
        this.longTouch = false;
        setTimeout(function() {
          window.slider.longTouch = true;
        }, 250);
  
        // Get the original touch position.
        this.touchstartx = event.changedTouches[0].pageX;
        this.touchstarty =  this.dw_getScrollOffsets().y; //event.changedTouches[0].pageY; //window.pageYOffset || document.documentElement.scrollTop;
        //this.slideHeight = document.querySelector(".container").offsetHeight;

       // console.log("START:"+this.touchstarty);

        console.log("STARTX :"+this.touchstartx);
  
        // The movement gets all janky if there's a transition on the elements.
        document.querySelector('.animate').classList.remove('animate');
      },

      move: function(event) {
        //console.log(this.dw_getScrollOffsets());
      },
  
      end: function(event) {
        // Calculate the distance swiped.
        // var absMove = Math.abs(this.index*this.slideHeight - this.movey);
        // // Calculate the index. All other calculations are based on the index.
        // if (absMove > this.slideHeight/2 || this.longTouch === false) {
        //   if (this.movey > this.index*this.slideHeight && this.index < 2) {
        //     this.index++;
        //   } else if (this.movey < this.index*this.slideHeight && this.index > 0) {
        //     this.index--;
        //   }
        // }  

        let touchEnd = this.dw_getScrollOffsets().y; //event.changedTouches[0].pageY; //window.pageYOffset || document.documentElement.scrollTop;
        let touchEndx = event.changedTouches[0].pageX;

        // if (touchEnd > this.touchstarty) {
        //     //down
        //     if (this.index < document.querySelectorAll(".container").length-1)
        //         this.index++;
        // } else {
        //     //up
        //     if (this.index > 0)
        //         this.index--;
        // } 

        //console.log("END:"+touchEnd);

        //console.log("ENDX "+touchEndx);

        //console.log(this.index);
        
        //this.slideHeight = //this.heightValues[this.index+1]; //this.getPosition(document.querySelectorAll(".container")[this.index]); //document.querySelectorAll(".container")[this.index].offsetHeight;

        let swipeX = touchEndx - this.touchstartx;

        if (swipeX < -50) {
            //left down
            if (this.index < document.querySelectorAll(".container").length-1)
                this.index++;
        } else if (swipeX > 50) {
            if (this.index > 0)
                 this.index--;
        }

        let diff = (window.pageYOffset || document.documentElement.scrollTop) - this.heightValues[this.index];

        //here's the issue, then it should work.
        console.log(this.heightValues[this.index]);

        console.log((window.pageYOffset || document.documentElement.scrollTop));        
        
        console.log("DIFF: "+diff);

        //remove ticket image on mobile
        //diff = 0;

        //console.log((window.pageYOffset || document.documentElement.scrollTop) - this.heightValues[this.index]);

        this.slideHeight = (document.querySelectorAll(".container")[this.index].offsetHeight - diff)*this.index;

        //console.log(this.slideHeight);
        //console.log(this.heightValues[this.index]);

        //this.index++; 
        // Move and animate the elements.
        //this.el.holder.addClass('animate').css('transform', 'translate3d(-' + this.index*this.slideHeight + 'px,0,0)');
        this.el.holder.classList.add('animate');
        this.el.holder.style.transform = `translate3d(0,-${this.slideHeight}px,0)`;

        //when animation ends, diff should be zero again..

        //console.log(this.index*this.slideHeight);
        //this.el.imgSlide.addClass('animate').css('transform', 'translate3d(-' + 100-this.index*50 + 'px,0,0)');
        //this.el.imgSlide.classList.add('animate');
        //this.el.imgSlide.style.transform = `translate3d(0,-${100-this.index*50}px,0)`;
  
      }
  
    };
  
    slider.init();
  }

