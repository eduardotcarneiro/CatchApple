var canvas, ctx, velocidade = 6, dist = 0, record, img, frames = 0, startx = 0, vidas = 3, record, LARGURACANVAS, ALTURACANVAS, img, quant = 2, temp = 25,

    ALTURA = window.innerHeight - 15,
		LARGURA = window.innerWidth - 15;
		
		if (LARGURA > ALTURA) {
				LARGURA = 2 * ALTURA/3;
		}
		
		//ALTURACANVAS = window.innerHeight - 15,
		//LARGURACANVAS = window.innerWidth - 15,

    var estados = {
			jogar: 0,
			jogando: 1,
			perdeu: 2
		},
  
    obstaculos = {
		  _obs: [],
		  frutas: ["apple", "banana", "grapes", "pineapple", "orange", "berries", "pear", "lemon", "coconut", "strawberry", "blueberry", "papaya", "cherry", "melon"],
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
    	        
    	        if ( obs.x + obs.largura > bloco.x && obs.x < bloco.x + bloco.largura - 1 && obs.y >= bloco.y ) {
    	              
    	              if (obs.fruta == "apple") {
    	                  if (obs.y >= bloco.y) {
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
    		          apple.desenha(obs.x + obs.largura/10, obs.y + obs.altura/10, obs.largura - obs.largura/5, obs.altura - obs.altura/5);
    		      else if (obs.fruta == "banana")
    		          banana.desenha(obs.x + obs.largura/8, obs.y + obs.altura/8, obs.largura - obs.largura/4, obs.altura - obs.altura/4);
    		      else if (obs.fruta == "lemon")
    		          lemon.desenha(obs.x + obs.largura/8, obs.y + obs.altura/8, obs.largura - obs.largura/4, obs.altura - obs.altura/4);
    		      else if (obs.fruta == "grapes")
    		          grapes.desenha(obs.x + obs.largura/10, obs.y + obs.altura/10, obs.largura - obs.largura/5, obs.altura - obs.altura/5);
    		      else if (obs.fruta == "pineapple")
    		          pineapple.desenha(obs.x, obs.y, obs.largura, obs.altura);
    		      else if (obs.fruta == "pear")
    		          pear.desenha(obs.x + obs.largura/10, obs.y + obs.altura/10, obs.largura - obs.largura/5, obs.altura - obs.altura/5);
    		      else if (obs.fruta == "orange")
    		          orange.desenha(obs.x + obs.largura/10, obs.y + obs.altura/10, obs.largura - obs.largura/5, obs.altura - obs.altura/5);
    		      else if (obs.fruta == "berries")
    		          berries.desenha(obs.x + obs.largura/10, obs.y + obs.altura/10, obs.largura - obs.largura/5, obs.altura - obs.altura/5);
    		      else if (obs.fruta == "blueberries")
    		          blueberries.desenha(obs.x + obs.largura/8, obs.y + obs.altura/8, obs.largura - obs.largura/4, obs.altura - obs.altura/4);
    		      else if (obs.fruta == "coconut")
    		          coconut.desenha(obs.x + obs.largura/8, obs.y + obs.altura/8, obs.largura - obs.largura/4, obs.altura - obs.altura/4);
    		      else if (obs.fruta == "strawberry")
    		          strawberry.desenha(obs.x + obs.largura/10, obs.y + obs.altura/10, obs.largura - obs.largura/5, obs.altura - obs.altura/5);
    		      else if (obs.fruta == "papaya")
    		          papaya.desenha(obs.x + obs.largura/10, obs.y + obs.altura/10, obs.largura - obs.largura/5, obs.altura - obs.altura/5);
    		      else if (obs.fruta == "cherry")
    		          cherry.desenha(obs.x + obs.largura/10, obs.y + obs.altura/10, obs.largura - obs.largura/5, obs.altura - obs.altura/5);
    		      else if (obs.fruta == "melon")
    		          melon.desenha(obs.x + obs.largura/8, obs.y + obs.altura/8, obs.largura - obs.largura/4, obs.altura - obs.altura/4);
    		      
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
  				//ctx.fillStyle = this.cor;
  				//ctx.fillRect(this.x, this.y, this.largura, this.altura);
  				cesta.desenha(bloco.x - bloco.largura/6, bloco.y - bloco.altura/3, bloco.largura + bloco.largura/3, bloco.altura + bloco.altura/3);
			},
			
			reset: function() {
  			  this.x = LARGURA/2 - this.largura/2;
          
          if (this.score > record) {
              localStorage.setItem("record", this.score);
              record = this.score;
          }
          quant = 2;
          velocidade = 6;
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
	
	function touchHandler(event) {
  
      var coordx = event.touches[0].pageX;
      var coordy = event.touches[0].pageY;
    
      if (estadoAtual == estados.jogar && coordx >= 0 && coordy >=0) {
    	    estadoAtual = estados.jogando;
    	    frames = 0;
      } else if (estadoAtual == estados.perdeu && coordx >= 0 && coordy >=0) {
    	    estadoAtual = estados.jogar;
    	    obstaculos.limpa();
    	    bloco.reset();
      } else if (estadoAtual == estados.jogando && coordx >= LARGURA/2) {
    	    direita();
      } else if (estadoAtual == estados.jogando && coordx < LARGURA/2) {
    	    esquerda();
      }
      event.preventDefault()
}
	
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
			
      canvas = document.createElement("canvas");
			canvas.width = LARGURA;
			canvas.height = ALTURA;
			//canvas.style.border = "1px solid #000";

			ctx = canvas.getContext("2d");
			document.body.appendChild(canvas);
			
			document.addEventListener("mousedown", clique);
			
			document.addEventListener("touchstart", touchHandler, false);
			
			estadoAtual = estados.jogar;

      record = localStorage.getItem("record");
      
      document.onkeydown = checkKey;

			if (record === null)
				record = 0;
			
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
			ctx.font = LARGURA/20 + "px Arial";

			
			if (estadoAtual === estados.jogando) {
          obstaculos.desenha();
          bloco.desenha();
          ctx.fillStyle = "white";
          ctx.fillText("Pontos: " + bloco.score, LARGURA/20, LARGURA/20 + 15);
      }
      
      chao.desenha();
      
      
      if (estadoAtual === estados.jogar) {
          
          ctx.font = LARGURA/15 + "px Arial";
          ctx.fillStyle = "green";
          ctx.fillRect(LARGURA / 2 - LARGURA/4,  ALTURA / 2 - LARGURA/4, LARGURA/2, LARGURA/3);
          
          ctx.save();
          ctx.translate(LARGURA / 2, ALTURA / 2);
          ctx.fillStyle = "white";
          ctx.fillText("Começar!", - LARGURA/7, -LARGURA/15);
          ctx.restore();
      }
      
      if (estadoAtual === estados.perdeu) {
          ctx.font = LARGURA/15 + "px Arial";
          ctx.fillStyle = "red";
          ctx.fillRect(LARGURA / 2 - LARGURA/4,  ALTURA / 2 - LARGURA/4, LARGURA/2, LARGURA/3);
          
          ctx.save();
          ctx.translate(LARGURA / 2, ALTURA / 2);
          ctx.fillStyle = "white";
          
          if (bloco.score > record) {
              ctx.fillText("Novo Record!", -LARGURA/5, - LARGURA/8);
          } else if (record < 10){
              ctx.fillText("Record: " + record, -LARGURA/5, - LARGURA/8);
          } else if (record >=10 && record < 100 ){
              ctx.fillText("Record: " + record, -LARGURA/5, - LARGURA/8);
          } else {
              ctx.fillText("Record: " + record, -LARGURA/5, - LARGURA/8);
          }
          
          if (bloco.score < 10) {
              ctx.fillText("Pontos: " + bloco.score, -LARGURA/5, 0);
          } else if (bloco.score >=10 && bloco.score < 100) {
              ctx.fillText("Pontos: " + bloco.score, -LARGURA/5, 0);
          } else {
              ctx.fillText("Pontos: " + bloco.score, -LARGURA/5, 0);
          }
          
          ctx.restore();
          
          

      }
			
	}
	
	
	main();