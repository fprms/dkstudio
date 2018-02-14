window.addEventListener("load", init,false);
var cH, vidH, vpH, vpW, holder, deltaH, deltaW, header, hW, hh, sheets;

function init() {

	/*****************/
	/***   Video   ***/
	/*****************/

	// Hauteur et largeur de la fenêtre
	vpH = document.documentElement.clientHeight;
	vpW = document.documentElement.clientWidth;

	// <header>
	holder = document.getElementsByTagName('header')[0];

	// dimensions <header> = dimensions Viewport
	holder.style.height=vpH+"px";
	holder.style.width=vpW+"px";

	// <video>
	vidH = document.getElementsByTagName('video')[0];

	if (vpW/vpH<1.7) { 
		// Récupère la LARGEUR du header et la soustrait à la LARGEUR de la vidéo
		deltaW = vidH.offsetWidth - holder.offsetWidth;
		vidH.style.marginLeft="-"+deltaW/2+"px";
	}
	else{
		// Récupère la HAUTEUR du header et la soustrait à la HAUTEUR de la vidéo
		deltaH = vidH.offsetHeight - holder.offsetHeight;
		vidH.style.marginTop="-"+deltaH/2+"px";
	}

	// écoute du redimensionnement de la fenêtre
	window.addEventListener("resize",redi,false);


	/*************************/
	/***   Smooth Scroll   ***/
	/*************************/

	// smooth-scroll vers la partie motion design
	$("#toContent").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#videos").offset().top-40
	    }, 500);
	});
	$("#toVideos").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#videos").offset().top-40
	    }, 500);
	});
	$("#toPhotos").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#photos").offset().top-40
	    }, 500);
	});

	/**********************/
	/***   Thumbnails   ***/
	/**********************/

	// Récupérer le click sur tous les thumbnails vidéos.
	// renvoyer vers la fonction switchVideo
	var yThumb = document.getElementsByClassName("grid-item");
	for (var i = 0; i < yThumb.length; i++) {
		yThumb[i].addEventListener("click", switchVideo,false);
	}

	/******************/
	/***   Header   ***/
	/******************/

	// div#header
	hW=document.getElementById("header").offsetWidth;
	// largeur du div#header

	header=document.getElementById("header");
	hW=header.offsetWidth;
	header.style.left=((vpW-hW)/2)+"px";

} 

function redi() {

	header.style.left=((vpW-hW)/2)+"px";
	
	vpH = document.documentElement.clientHeight;
	vpW = document.documentElement.clientWidth;

	holder = document.getElementsByTagName('header')[0];
	holder.style.height=vpH+"px";
	holder.style.width=vpW+"px";

	pH = document.getElementsByTagName('video')[0];
	vH = document.getElementsByTagName('video')[0].offsetHeight;

	delta = vidH.offsetHeight - holder.offsetHeight;
	vidH.style.marginTop="-"+delta/2+"px";

	// Récupère la hauteur du header et la soustrait à la hauteur de la vidéo
	deltaH = vidH.offsetHeight - holder.offsetHeight;

	// Récupère la hauteur du header et la soustrait à la hauteur de la vidéo
	deltaW = vidH.offsetWidth - holder.offsetWidth;
	vidH.style.marginLeft="-"+deltaW/2+"px";


}

function switchVideo(e){
	// var holder = e.target.parentNode;
	var idPlayer = this.dataset.id;
	var iframe = document.getElementsByClassName("frame")[0];
	
	iframe.setAttribute("src", "https://www.youtube.com/embed/" + idPlayer + "?rel=0&amp;showinfo=0");
}

	// sheets = document.styleSheets;
	// sheets[0].insertRule("body{margin-top:1000px;}",2);