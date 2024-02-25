const sidebar = document.querySelector('.mj-sidebar');
const mjImageCol = document.querySelectorAll('.mj-col-img');
const mjFooterContent = document.querySelector('.mj-footer-content')
const hiddenFooterContent = document.querySelector('.mj-hidden-footer-content');

let intervalIds = [];

function showSidebar() {
    sidebar.style.display = 'flex';
    document.addEventListener('click', closeSidebarOutside);
}

function hideSidebar() {
    sidebar.classList.add('animate__fadeOut', 'animate__fast'); 
    setTimeout(() => {
        sidebar.classList.remove('animate__fadeOut');
        sidebar.style.display = 'none';
    }, 300);
}

function closeSidebarOutside(event) {
    const sidebarCloseToggle = document.querySelector('.fa-bars');
    
    if (!sidebar.contains(event.target) && event.target !== sidebarCloseToggle) {
        hideSidebar();
    }
}

window.addEventListener('scroll', function() {
    let navbar = document.querySelector('nav');
    let scrollPosition = this.window.scrollY;
    console.log('Scroll Position:', scrollPosition);
    let triggerHeight = 50

    if (scrollPosition > triggerHeight){
        navbar.style.backgroundColor = '#F7F6F0';
    } else{
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function addAnimationClass() {
    mjImageCol.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('animate__animated', 'animate__fadeInUp', 'animate__fast');
        }
    });
}

// Initial check when page loads
addAnimationClass();

window.addEventListener('scroll', addAnimationClass);

mjImageCol.forEach(function(collection) {
    let imgIndex = 0;
    let x = collection.querySelectorAll('.mj-img');

    imgSlide(collection);

    function imgSlide(collection) {
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = 'none';
        }
        imgIndex++;
        if (imgIndex > x.length) {
            imgIndex = 1;
        }
        x[imgIndex - 1].style.display = 'flex';
    }

    collection.addEventListener('mouseleave', function() {
        clearTimeout(intervalIds.pop());
    });

    x.forEach(function(img){
        img.addEventListener('mouseenter', () =>{
            clearTimeout(intervalIds.pop()); 
            imgIndex = Array.from(x).indexOf(img); 
            intervalIds.push(setTimeout(() => imgSlide(collection), 1000)); 
            imgSlide(collection)
        })
    })
});

function showInfo(){
    hiddenFooterContent.classList.contains('mj-hidden-footer-content-open') ? 
        hiddenFooterContent.classList.remove('mj-hidden-footer-content-open') : 
        hiddenFooterContent.classList.add('mj-hidden-footer-content-open');
}