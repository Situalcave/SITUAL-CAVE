  const firebaseConfig = {
    apiKey: "AIzaSyArVvieB_aSHPNgLqRbnlFMKbKOyE8qsXk",
    authDomain: "situal-cave01.firebaseapp.com",
    databaseURL: "https://situal-cave01-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "situal-cave01",
    storageBucket: "situal-cave01.appspot.com",
    messagingSenderId: "389618814322",
    appId: "1:389618814322:web:1c0081e0447c51ef95e1eb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var database = firebase.database();
  var storage = firebase.storage();
  var picture="";
  console.log(database);
  console.log(storage);

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        aos_init();
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfokio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

})();
event_getter=()=>
{
  document.getElementById('events').innerHTML="";
  //var DID="";
  var accessed = database.ref("/events/");
    accessed.off();
    accessed.on("child_added",function(data)
    {
      var newdata=data.val();
      var key=data.key;
      var count=data.numChildren();
      console.log(newdata);
      DID="id-"+key;
      document.getElementById('events').innerHTML+='<div class="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">'+
            '<div class="member">'+
              '<div class="member-img">'+
                '<img src="'+newdata.image[0]+'" class="img-fluid" alt="">'+
              '</div>'+
              '<div class="member-info">'+
                '<h4>'+newdata.title[0]+'</h4>'+
                '<span>'+newdata.location[0]+'</span>'+
                '<p>'+newdata.body[0]+'<br><b>Price : '+newdata.price[0]+' GBP</b></p>'+
                '<a class="getstarted scrollto" href="'+newdata.url[0]+'" style="padding: 1.5vh;background:#027D61;color:#fff;border-radius: 1vh;">Book Now</a>'+/*<a class="getstarted scrollto" id='+key+' onclick=buynow(this.id,"'+newdata.price[0]+'")>Book now</a>*/
              '</div>'+
            '</div>'+
          '</div>';

      

  },function(error)
  {
    Alert("No Event");
    
  });
    
}
buynow=(event,price)=>
{
  var email = prompt("Please enter your name", "");
  var mobile_number = prompt("Please confirm your mobile number", "");
  /*var btnclick=document.getElementById('1')
    btnclick.addEventListener("click", function()
        {
          console.log("clicked!");
          //bookticket("124535",key,"hello@mail.com","080378257382",price);
        });*/
        console.log("clicked!");
        bookticket("payid1111",event,email,mobile_number,price)
}

blog_getter=()=>
{
  document.getElementById('blogs').innerHTML="";
  var accessed = database.ref("/blogs/");
    accessed.off();
    accessed.on("child_added",function(data)
    {
      var newdata=data.val();
      var key=data.key;
      var count=data.numChildren();
      console.log(newdata);
      document.getElementById('blogs').innerHTML+='<article class="entry">'+

              '<div class="entry-img">'+
                '<img src="'+newdata.image[0]+'" alt="" class="img-fluid">'+
              '</div>'+

              '<h2 class="entry-title">'+
                '<a href="#">'+newdata.title[0]+'</a>'+
              '</h2>'+

              '<div class="entry-meta">'+
                '<ul>'+
                  '<li class="d-flex align-items-center"><i class="bi bi-person"></i> <a href="#">Admin</a></li>'+
                  '<li class="d-flex align-items-center"><i class="bi bi-clock"></i> <a href="#"><time datetime="'+newdata.published[0]+'">'+newdata.published[0]+'</time></a></li>'+
                '</ul>'+
              '</div>'+

              '<div class="entry-content">'+
                '<p>'+newdata.body[0]+'</p>'+
                
              '</div>'+

            '</article>';
      

  },function(error)
  {
    Alert("No Event");
    
  });
}
bookticket=(payid,event,email,mobile_number,price)=>
{
    var d = new Date();
    var hrs=d.getHours();
    var mins=d.getMinutes();
    var sec=d.getSeconds();
    var date=d.getDate();
    var month=d.getMonth();
    var year=d.getYear();
    var t_date=date+""+month+""+year+""+hrs+""+mins+""+sec;
    var user=database.ref("/tickets_booking/"+t_date);
    if(payid=="" || event=="" || email=="")
    {
        alert("Erro occured!");
    }
    else
    {
            /*user.update*/
        user.update({
            payID:[payid],
            eventID:[event],
            cost:[price],
            email:[email],
            mobile:[mobile_number]

        });
        alert("Event Booked");
        //admin_ability();
    }
}

