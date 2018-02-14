window.addEventListener("load", init,false);
var cH, vidH, vpH, vpW, holder, deltaH, deltaW, header, hW, hh;

function init() {

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
	
	/*
		Pour aligner le bloc par son coin supérieur gauche il faut :
			- Définir la largeur du conteneur
			- Définir la largeur du bloc
			- Soustraire la largeur du conteneur au bloc
			- appliquer cette valeur  

	*/

	// largeur du header
	header=document.getElementById("header");
	hW=header.offsetWidth;
	header.style.left=((vpW-hW)/2)+"px";

	// alert(hW+" largeur hW"+vpW+" largeur vpH"+" = "+((vpW-hW)/2));

	// ajout d'un ligne de style car impossible de cibler les pseudos-éléments
	// via la propriété .style
	document.styleSheets[0].addRule('header:before','height:'+vpH+'px');
	
	// écoute du redimensionnement de la fenêtre
	window.addEventListener("resize",redi,false);

	/*
		Si le viewport est PLUS large que la vidéo
			donc ratio +1,8
			donc vidéo rognée verticalement 
			donc @media width:100%
			donc décalage VERTICAL uniquement en JS
		
		Si le viewport est MOINS large que la vidéo
			donc ratio -1,8
			donc vidéo rognée horizontalement
			donc @media height:100%
			donc décalage HORIZONTAL uniquement en JS
	*/

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

	// smooth-scroll vers la partie motion design
	$("#toContent").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#videos").offset().top
	    }, 500);
	});
	$("#toVideos").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#videos").offset().top
	    }, 500);
	});
	$("#toPhotos").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#photos").offset().top
	    }, 500);
	});

	// Récupérer le click sur tous les thumbnails vidéos.
	// renvoyer vers la fonction switchVideo
	var yThumb = document.getElementsByClassName("grid-item");
	for (var i = 0; i < yThumb.length; i++) {
		yThumb[i].addEventListener("click", switchVideo,false);
	}
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
	document.styleSheets[0].addRule('header:before','height:'+vpH+'px');

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


/*

	* ------------------------------------------------------- *

	Dans tous les cas, je dois : 
	- récupérer la hauteur du viewport -> hauteur header
	- récupérer la largeur du viewport -> largeur header
	- appliquer ces dimensions au header

	* ------------------------------------------------------- *

	* Cas 1 :

	Le viewport est plus large qu'un 16/9 (ratio > 1.77) (la vidéo) :
	- La vidéo est rognée verticalement
	- width : 100% ;
	- Il faut donc décaller la vidéo verticalment avec un margin négatif
	- récupérer la hauteur du header et la soustraire à la hauteur de la vidéo
	-> videoH - viewportH = delta/2 pour le décalage 


	* Cas 2 :

	Le viewport est moins large qu'un 16/9 (ratio < 1.77) (la vidéo) :
	- La vidéo est rognée verticalement
	- width : 100% ;



*/