var canvas, ctx, velocidade = 9, dist = 0, record, img, frames = 0, startx = 0, vidas = 3, record, LARGURACANVAS, ALTURACANVAS, img, quant = 2, temp = 25,

    ALTURA = window.innerHeight - 15,
		LARGURA = window.innerWidth - 15,
		
		//ALTURACANVAS = window.innerHeight - 15,
		//LARGURACANVAS = window.innerWidth - 15,

    estados = {
			jogar: 0,
			jogando: 1,
			perdeu: 2
		},
  
    obstaculos = {
		  _obs: [],
		  frutas: ["apple", "banana", "grapes", "pineapple", "orange", "berries", "lemon", "coconut", "strawberry", "papaya", "cherry", "melon"],
		  tempoInsere: 0,
		  
		  insere: function() {
  		    this._obs.push({
  		        x: LARGURA/20 + LARGURA/10 * Math.floor(Math.random() * 9),
    		      y: - LARGURA/10,
    		      largura: LARGURA/10,
    		      //largura: 30 + Math.floor(Math.random() * 21),
    		      altura:  LARGURA/10,
    		      fruta: this.frutas[Math.floor(Math.random() * quant)]
  		    });
  		    
  		    this.tempoInsere = temp + Math.floor(Math.random() * 5);
		  },
		  
		  atualiza: function() {
  		    if(this.tempoInsere == 0) {
  		        this.insere();
  		        
  		    }
  		    else
  		        this.tempoInsere--;
  		    
  	      for (var i = 0, tam = this._obs.length; i < tam; i++) {
    	        var obs = this._obs[i];
    	        obs.y += velocidade;
    	        
    	        if ( obs.x + obs.largura > bloco.x && obs.x < bloco.x + bloco.largura - 1 && obs.y + obs.altura >= bloco.y) {
    	              
    	              if (obs.fruta == "apple") {
    	                  if (obs.y >= bloco.y)
    	                  {
    	                      this._obs.splice(i, 1);
                            tam--;
                            i--;
    	                      bloco.score = bloco.score + 1;
    	                      
    	                      if (bloco.score % 8 === 0)
                              quant++;
                            if (bloco.score % 5 === 0) {
                              velocidade += 1;
                              if (temp <= 2)
                                  temp = 1;
                              else
                                  temp -= 1;
                            }
                            
                              
    	                      console.log(bloco.score);
    	                  }
    	              } else {
    	                 estadoAtual = estados.perdeu;
    	              }
          	  }
          	        
    	        else if(obs.y >= chao.y) {
                  this._obs.splice(i, 1);
                  tam--;
                  i--;
              }
        	}
      	
		  },
		  
		  limpa: function() {
		      this._obs = [];
		  },
		  
		  desenha: function() {
		      for (var i = 0, tam = this._obs.length; i < tam;  i++) {
    		      var obs = this._obs[i];
    		      
    		      if (obs.fruta == "apple")
    		          apple.desenha(obs.x, obs.y, obs.largura, obs.altura);
    		      else if (obs.fruta == "banana")
    		          banana.desenha(obs.x, obs.y, obs.largura, obs.altura);
    		      else if (obs.fruta == "lemon")
    		          lemon.desenha(obs.x, obs.y, obs.largura, obs.altura);
    		      else if (obs.fruta == "grapes")
    		          grapes.desenha(obs.x, obs.y, obs.largura, obs.altura);
    		      else if (obs.fruta == "pineapple")
    		          pineapple.desenha(obs.x, obs.y, obs.largura, obs.altura);
    		      else if (obs.fruta == "orange")
    		          orange.desenha(obs.x, obs.y, obs.largura, obs.altura);
    		      else if (obs.fruta == "berries")
    		          berries.desenha(obs.x, obs.y, obs.largura, obs.altura);
    		      else if (obs.fruta == "coconut")
    		          coconut.desenha(obs.x, obs.y, obs.largura, obs.altura);
    		      else if (obs.fruta == "strawberry")
    		          strawberry.desenha(obs.x, obs.y, obs.largura, obs.altura);
    		      else if (obs.fruta == "papaya")
    		          papaya.desenha(obs.x, obs.y, obs.largura, obs.altura);
    		      else if (obs.fruta == "cherry")
    		          cherry.desenha(obs.x, obs.y, obs.largura, obs.altura);
    		      else if (obs.fruta == "melon")
    		          melon.desenha(obs.x, obs.y, obs.largura, obs.altura);
    		      
    		      //ctx.fillStyle = obs.cor;
    		      //ctx.fillRect(obs.x, obs.y, obs.largura, obs.altura);
		    }
		  }
    },
    
    chao = {
      altura: ALTURA/11,
			y: ALTURA - ALTURA/11,
			x: 0,
			
			cor: "#e8da78",

			desenha: function() {
				ctx.fillStyle = this.cor;
				ctx.fillRect(0, this.y, LARGURA, this.altura);
			}
	},
		  
		bloco = {
		  altura: LARGURA/10,
			largura: LARGURA/10,
			x: LARGURA/2 - LARGURA/20,
			y: chao.y - LARGURA/10,
			
			cor: "#ff9239",
			score: 0,
			
			desenha: function() {
  				ctx.fillStyle = this.cor;
  				ctx.fillRect(this.x, this.y, this.largura, this.altura);
			},
			
			reset: function() {
  			  this.x = LARGURA/2 - this.largura/2;
          
          if (this.score > record) {
              localStorage.setItem("record", this.score);
              record = this.score;
          }
          quant = 2;
          velocidade = 9;
          temp = 25;
          this.score = 0;
			}
		};

  
	
	function atualiza() {
      frames++;
      
      if(estadoAtual == estados.jogando) {
          obstaculos.atualiza();
      } else if (estadoAtual == estados.perdeu) {
  	    obstaculos.limpa();
  	  }
	}
	
	function clique(event) {
			if (estadoAtual == estados.jogar) {
				estadoAtual = estados.jogando;
				frames = 0;
			}

			else if (estadoAtual == estados.perdeu) {
				estadoAtual = estados.jogar;
				obstaculos.limpa();
				bloco.reset();
			}
	};
	
	  function esquerda () {
	    bloco.x -= LARGURA/10;
      if (bloco.x < LARGURA/20)
          bloco.x = LARGURA/20;
	  }
	  
	  function direita() {
	    bloco.x += LARGURA/10;
      if (bloco.x > LARGURA - LARGURA/10 - LARGURA/20)
        bloco.x = LARGURA - LARGURA/10 - LARGURA/20;
	  }

    function checkKey(e) {
    
        e = e || window.event;
    
        e = e || window.event;
    
        if (e.keyCode == '37') {
          esquerda();
          
        } else if (e.keyCode == '39') {
           direita();
        }
    
    }
	
	
	function main() {
			
      /*if (LARGURA >= 500) {
				LARGURA = 360;
				ALTURA = 640;
			}*/

			canvas = document.createElement("canvas");
			canvas.width = LARGURA;
			canvas.height = ALTURA;
			//canvas.style.border = "1px solid #000";

			ctx = canvas.getContext("2d");
			document.body.appendChild(canvas);
			
			document.addEventListener("mousedown", clique);
			
			estadoAtual = estados.jogar;

      record = localStorage.getItem("record");

			if (record === null)
				record = 0;
				
			document.onkeydown = checkKey;
			
			document.addEventListener('touchstart', function(e) {
    	    var touchobj = e.changedTouches[0];
          startx = parseInt(touchobj.clientX);
    	}, false);
    	
    	document.addEventListener('touchmove', function(e) {
    	    var touchobj = e.changedTouches[0];
          var dist = parseInt(touchobj.clientX) - startx;
          bloco.x += bloco.largura * dist / 1000;
          
          if (bloco.x < bloco.largura/2)
              bloco.x = bloco.largura/2;
          else if (bloco.x > LARGURA - bloco.largura)
              bloco.x = LARGURA - bloco.largura - bloco.largura/2;
              
          e.preventDefault();
  }, false);
  
      img = new Image();
			img.src = "images/fruit.png";
		
		  roda();
	}
	
	function roda() {
			desenha();
			atualiza();

			window.requestAnimationFrame(roda);
	}
	
	function desenha() {
			ctx.fillStyle = "#80daff";
      ctx.fillRect(0, 0, LARGURA, ALTURA);

			ctx.fillStyle = "#fff";
			ctx.font = "50px Arial";

			
			if (estadoAtual == estados.jogando) {
          obstaculos.desenha();
      }
      
      chao.desenha();
      bloco.desenha();
      
      if (estadoAtual == estados.jogar) {
        
          ctx.fillStyle = "green";
          ctx.fillRect(LARGURA / 2 - 50, ALTURA / 2 - 50, 100, 100);
      }
      
      if (estadoAtual == estados.perdeu) {
          ctx.fillStyle = "red";
          ctx.fillRect(LARGURA / 2 - 50, ALTURA / 2 - 50, 100, 100);
          
          ctx.save();
          ctx.translate(LARGURA / 2, ALTURA / 2);
          ctx.fillStyle = "white";
          
          if (bloco.score > record) {
              ctx.fillText("Novo Record!", -150, -65);
          } else if (record < 10){
              ctx.fillText("Record " + record, -99, -65);
          } else if (record >=10 && record < 100 ){
              ctx.fillText("Record " + record, -112, -65);
          } else {
              ctx.fillText("Record " + record, -125, -65);
          }
          
          if (bloco.score < 10) {
              ctx.fillText(bloco.score, -13, 19);
          } else if (bloco.score >=10 && bloco.score < 100) {
              ctx.fillText(bloco.score, -26, 19);
          } else {
              ctx.fillText(bloco.score, -40, 19);
          }
          
          ctx.restore();
          
          

      }
			
	}
	
	
	main();
