
document.getElementById("dottedword").innerHTML = " ";
var guessallowed = 15;
var bandarr = ["mokhov","caspian","avicii","ifthesetrees","tiesto","armin","oakenfold","davidguetta","calvinharris","mogwai","eminem","daftpunk","linkinpark","astro",
				"xxintro","daysofstatic","maserati","redsparowes","russiancircles","explosionsinsky"];
var bandimages = {
					mokhov:"./assets/images/mokhov.jpg",
					caspian:"./assets/images/caspian.jpg",
					avicii:"./assets/images/avicii.jpg",
					ifthesetrees:"./assets/images/ifthesetrees.jpg",
					tiesto:"./assets/images/tiesto.jpg",
					armin:"./assets/images/armin.jpg",
					oakenfold:"./assets/images/oakenfold.jpg",
					davidguetta:"./assets/images/mos.jpg",
					calvinharris:"./assets/images/calvinharris.jpg",
					mogwai:"./assets/images/mogwai.jpg",
					eminem:"./assets/images/eminem.jpg",
					daftpunk:"./assets/images/daftpunk.jpg",
					linkinpark:"./assets/images/linkinpark.jpg",
					astro:"./assets/images/astro.jpg",
					xxintro:"./assets/images/xxintro.jpg",
					daysofstatic:"./assets/images/daysofstatic.jpg",
					maserati:"./assets/images/maserati.jpg",
					redsparowes:"./assets/images/redsparrowes.jpg",
					russiancircles:"./assets/images/russiancircles.jpg",
					explosionsinsky:"./assets/images/explosionsinsky.jpg"
};

var gameOb = {
	    arr:bandarr,
	    imgmap:bandimages,
	    wins:0,
	    curbanddocstring:"",
	    currentband:"empty",
	    matchband:[],
	    gamestarted:false,
	    wordguessed:false,
	    guessremaining:15,
	    guessedletters:[],
	    matchlen:0,
	    resetGame:function(){
	    	console.log("game reset");
	    	this.matchlen = 0;
	    	this.wordguessed = false;
	    	this.guessremaining = 15;
	    	var arrindex = Math.floor((Math.random() * 20) + 1);
          	this.currentband = this.arr[arrindex-1];
          	this.curbanddocstring ="";
          	console.log(arrindex);
          	console.log(this.currentband);
          	this.matchband  = [];
        	this.guessedletters = [];
       
        	console.log(this.currentband);
	    	for(var i =0;i < this.currentband.length;i++)
          		{
          			this.matchband.push('_');
          			this.matchband.push(' ');
          			this.curbanddocstring = this.curbanddocstring + "_ ";
          		}
          	console.log(this.matchband.length);
          	console.log(this.matchband);
          	document.getElementById("remguess").innerHTML = this.guessremaining;
          	document.getElementById("guessedletters").innerHTML = "";
    		document.getElementById("dottedword").innerHTML = this.curbanddocstring;
    		document.getElementById("bandimg").src = this.imgmap[this.currentband];
	    },
	    gameControl:function(keyhit){
	    	if(this.guessremaining === guessallowed && this.gamestarted == false){
	    		this.gamestarted = true;
	    		this.matchlen = 0;
          		var arrindex = Math.floor((Math.random() * 12) + 1);
          		this.currentband = this.arr[arrindex];
          		for(var i =0;i < this.currentband.length;i++)
          		{
          			this.matchband.push('_');
          			this.matchband.push(' ');
          			this.curbanddocstring = this.curbanddocstring + "_ ";
          		}
          		console.log(this.currentband);
          		console.log(this.matchband.length);
          		console.log(this.matchband);
          		document.getElementById("guessedletters").innerHTML = "";
          		document.getElementById("dottedword").innerHTML = this.curbanddocstring;
          		document.getElementById("remguess").innerHTML = this.guessremaining;
          		document.getElementById("bandimg").src = this.imgmap[this.currentband];
			}
			else {
					if(this.guessedletters.indexOf(keyhit) == -1){
						this.guessedletters.push(keyhit);
						this.guessremaining = this.guessremaining -1;
						this.displayguessedLetter(keyhit);				
					
					var text="";
					if( this.currentband.indexOf(keyhit) != -1){
						console.log("key match found:  " + keyhit);
						console.log(text);
						for(var i=0;i < this.currentband.length ;i++){
							if(this.currentband[i] == keyhit){
								//store the indexes for update 
								console.log(this.currentband[i] + "  :"  + i + keyhit)
							    this.matchband[i*2] = keyhit;
							    this.matchlen = this.matchlen + 1;
							}
						}
						for (var i=0;i < this.matchband.length;i++){
							text = text + this.matchband[i]
						}
						console.log(this.matchband);
						document.getElementById("dottedword").innerHTML = text;
						if (this.currentband.length == this.matchlen){
							this.wins = this.wins +1;
							this.wordguessed = true;
							document.getElementById("wins").innerHTML = "Wins: " + this.wins;
							var apl = document.getElementById("aplay");
							apl.addEventListener('seeked',function(){
								apl.play();
							},true);
							apl.currentTime = 1.0;
							apl.addEventListener('timeupdate',function(){
								if (apl.currentTime > 6){
									apl.pause();
								}
							});

						}
					}
				}
					if(this.guessremaining == 0 || this.wordguessed == true){
						console.log("noguessremaningreset");
						this.resetGame();
					}

				}

	 	},
	    displayguessedLetter:function(keyhit) {
	    	console.log(this.guessedletters);
	    	var gstring=" ";
	    	for(var i=0;i < this.guessedletters.length;i++){
               gstring = gstring + this.guessedletters[i] + " ";
	    	}
	    	console.log(gstring);
	    	document.getElementById("guessedletters").innerHTML = gstring;
			document.getElementById("remguess").innerHTML = this.guessremaining;

	    }
};

console.log(gameOb);

document.onkeyup = function(event) {
    var keyhit = event.key;
   gameOb.gameControl(keyhit);
};
