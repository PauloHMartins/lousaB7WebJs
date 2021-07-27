// initial data

let currentColor = 'blue'; // crio a variavel que vai salvar a cor escolhida
let canDraw = false; //cria variavel para verificar de pode ou nao desenhar
let mouseX = 0;// cria variavel que vai salvar a posição anterior do mouse no eixo X
let mouseY = 0; //cria variavel que vai salvar a posição anterior do mouse no eixo Y
let screen = document.querySelector('#tela');//pega o evento na tela e salva em screen
let ctx = screen.getContext('2d');//pega o contexto da tela em 2d

//events
document.querySelectorAll('.menu .point ').forEach(item => { /*utilizo o selector All 
  para encontrar todas as divs que tem a class .color e rodo o lopp forEach nela para ativar
  a funcao de click  */
  item.addEventListener('click', colorClickEvent);
});


/* LOGICA PARA DESENHAR NO CANVAS:
PASSO A PASSO:
- Quando o click do mouse "ABAIXAR", ative o"modo desenho".
-Quando o mouse se MOVER ,"SE" o "MODO DESENHO" estiver ativado ,desenhe.
-Quando o click do mouse LEVANTAR ,desative o modo desenho 
*/
screen.addEventListener('mousedown', mouseDownEvent); //Monitora o evento de mouse clicado
screen.addEventListener('mousemove', mouseMoveEvent);//monitora o evento de mouse movimentando
screen.addEventListener('mouseup', mouseUpEvent);//monitora o evento de mouse livre

//CLEAR
document.querySelector('.clear').addEventListener('click', clearScreen);
 //functions

function colorClickEvent(e) { //crio a função de clique nas cores
  let color = e.target.getAttribute('data-color'); /*salvo em color o atributo 
  salvo na class data-color correspondente a cor que cliquei */
  currentColor = color; //salvo dentro da variavel da cor escolhida a color do evento target

  document.querySelector('.color.active').classList.remove('active'); /*Removo 
  a classe active da color para adicionar em outra */
  e.target.classList.add('active'); //adiciono a class active na color clicada no evento target
};

function mouseDownEvent(e){
  canDraw = true;// mouse clicado variavel desenhar == true;
  mouseX = e.pageX - screen.offsetLeft; //salva a posição do mouse clicado no eixo X
  mouseY = e.pageY - screen.offsetTop;//salva a posição do mouse clicado no eixo Y

};

function mouseMoveEvent(e){
  if(canDraw){ //Se variavel que verifica posicao do mouse for true executa funcao desenhar
     draw(e.pageX, e.pageY); // executa a funcao desenhar passando os parametro de posição do evento
  } 
};

function mouseUpEvent() {
  canDraw = false ; //mouse livre variavel que verifica se pode desenhar == false;

};
function draw(x, y) {
  let pointX = x - screen.offsetLeft; /*cria o ponto onde esta o mouse no canvas
  diminuindo a posicçao do evento com a distancia para o inicio da pagina */
  let pointY = y - screen.offsetTop; /*cria o ponto onde esta o mouse 
  em relação a altura diminuiundo a posicao Y do ponto do evento com o inicio do topo */
  
  ctx.beginPath(); // inicia o processo de desenhar
  if( currentColor == 'white'){
    ctx.lineWidth = 60;
  } else{
    ctx.lineWidth = 5; //define o tamanho do risco
  };
  ctx.lineJoin = 'round'; //define o formato do desenho "redondo"
  ctx.moveTo(mouseX, mouseY); // MOVA PARAdefine que o desenho vai continuar quando mover de acordo com as posicoes do parametro
  ctx.lineTo(pointX, pointY);//FAÇA UMA LINHA ATE O POINT X E POINT Y
  ctx.closePath(); //FECHAR O PROCESSO DE DESENHO
  ctx.strokeStyle = currentColor;// DEFINI A COR DO DESENHO CONFORME A VARIAVEL DE COR
  ctx.stroke();//FECHA O PROCESSO .


  //desenhar
  mouseX = pointX;
  mouseY = pointY;

};

function clearScreen (){ //limpa a tela toda
 ctx.setTransform(1, 0, 0, 1, 0, 0);
 ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

};