const carousel2 = document.querySelector(".carousel2"),
    firstImg = carousel.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".wrapper2 i");

let isDraginStart = false,isDraggin = false, prevPageX, prevScrollLeft,positionDiff;



const showHideIcons = () => {
    let scrollWidth = carousel2.scrollWidth - carousel2.clientWidth;
    arrowIcons[0].style.display = carousel2.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel2.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        if (icon.id == "left") {
            carousel2.scrollLeft -= firstImgWidth;
        } else {
            carousel2.scrollLeft += firstImgWidth;
        }
        setTimeout(() => showHideIcons(), 60);
    })
});

const autoSlide = () =>{
    if(carousel2.scrollLeft == (carousel2.scrollWidth - carousel2.clientWidth)) return;
    
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDiffernce = firstImgWidth - positionDiff;

    if(carousel2.scrollLeft > prevScrollLeft){
       if(positionDiff > firstImgWidth / 3){
        carousel2.scrollLeft += valDiffernce;
       }else{
            carousel2.scrollLeft -= positionDiff
       }
   
}

}
const dragStart = (e) => {
    isDraginStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel2.scrollLeft;
    showHideIcons();
}

const draggin = (e) => {
    if (!isDraginStart) return;
    e.preventDefault();
    isDraggin = true, 
    carousel2.classList.add("draggin");
     positionDiff =( e.pageX ||e.touches[0].pageX) - prevPageX;
    carousel2.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDraginStart = false;
    carousel2.classList.remove("draggin");
    
    if(!isDraggin )return;
    isDraggin = false;
    autoSlide();

}
carousel2.addEventListener("mousedown", dragStart);
carousel2.addEventListener("touchstart", dragStart);

carousel2.addEventListener("mousemove", draggin);
carousel2.addEventListener("touchmove", draggin);

carousel2.addEventListener("mouseup", dragStop);
carousel2.addEventListener("mouseleave",dragStop)
carousel2.addEventListener("touchend",dragStop)