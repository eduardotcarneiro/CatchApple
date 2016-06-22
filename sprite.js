function Sprite(x, y, largura, altura) {
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;

	this.desenha = function(xCanvas, yCanvas, larg, alt) {
		ctx.drawImage(img, this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, larg, alt);
	}
}



var apple = new Sprite(0, 0, 64, 64),
berries = new Sprite(192, 0, 64, 64),
blueberries = new Sprite(256, 0, 64, 64),
banana = new Sprite(128, 0, 64, 64),
coconut = new Sprite(384, 0, 64, 64),
grapes = new Sprite(448, 0, 64, 64),
lemon = new Sprite(576, 0, 64, 64),
pineapple = new Sprite(896, 0, 64, 64),
pear = new Sprite(832, 0, 64, 64),
strawberry = new Sprite(960, 0, 64, 64),
papaya = new Sprite(512, 0, 64, 64),
cherry = new Sprite(320, 0, 64, 64),
melon = new Sprite(640, 0, 64, 64),
orange = new Sprite(704, 0, 64, 64),
ch = new Sprite(0, 192, 1024, 128),
cesta = new Sprite(0, 65, 128, 125),
logo = new Sprite(128, 65, 516, 125);
/*
perdeu = new Sprite(603, 478, 397, 358),
jogar = new Sprite(603, 127, 397, 347),
novo = new Sprite(68, 721, 287, 93),
spriteRecord = new Sprite(28, 879, 441, 95);

    		      else if (obs.fruta == "melon")
    		          melon.desenha(obs.x + obs.largura/8, obs.y + obs.altura/8, obs.largura - obs.largura/4, obs.altura - obs.altura/4);
    		      
*/

