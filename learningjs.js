//creating bolock
const grid = document.querySelector('.grid')//telling im luking for class of grid
const scoredisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const bordWidth = 560
const balldia = 20
const ballhe = 20
const boardHeight = 300
let xDirection = -2
let yDirection = 2
//user  wala block will bi jaha sabse middle block rhga usi
// usi ke  just neeche to y axis same rhga
const userStsrt = [230, 10]
let currpos = userStsrt
const ballStart = [270, 30]
let pos = ballStart //changes isme krnge isi lie alag
//se assing krre hai;
let timerid
let score = 0
class Block {
  constructor(xAxis, yAxis){
    this.bottomLeft = [xAxis,yAxis]// col
    this.bottomRight = [xAxis + blockWidth, yAxis]//row
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis+ blockWidth, yAxis + blockHeight]
}}
const blocks = [
   new Block(10, 270),
   new Block(120, 270),
   new Block(230, 270),
   new Block(340, 270),
   new Block(450, 270),
   new Block(10, 240),
   new Block(120, 240),
   new Block(230, 240),
   new Block(340, 240),
   new Block(450, 240),
   new Block(10, 210),
   new Block(120, 210),
   new Block(230, 210),
   new Block(340, 210),
   new Block(450, 210),
 ]
 function addblocks(){
   for(let i = 0; i < blocks.length; i++)
   {
 const block = document.createElement('div')
 block.classList.add('block')
 block.style.left = blocks[i].bottomLeft[0] + 'px'
 block.style.bottom = blocks[i].bottomLeft[1] + 'px'
 grid.appendChild(block)
  console.log(blocks[i].bottomLeft)
 }
 }
 addblocks()
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()


//  move
function drawUser()
{
  user.style.left = currpos[0] + 'px'
  user.style.bottom = currpos[1] + 'px'
}
function drawball()
{
  ball.style.left = pos[0] + 'px'
  ball.style.bottom = pos[1] + 'px'
  //checkcollisions()
}
function moveUser (e)
{
  switch(e.key)
  {
    case 'ArrowLeft':
      if (currpos[0]>0)
    {currpos[0]-= 10
    drawUser()
  }
    break;
    case 'ArrowRight':
    if (currpos[0]<(bordWidth - blockWidth))
    {
      currpos[0]+= 10
    drawUser()
  }
    break;

  }
}
document.addEventListener('keydown' , moveUser)
// add balls
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawball()

//mobh bolll
function moveball()
{
  pos[0] += xDirection
  pos[1] += yDirection
  drawball()//isse uppr position me draw hora
  checkcollisions()
}
timerid=setInterval(moveball, 30)//speed of ball utne
//instance of tym me func wiilll be cllegd
//now changing direction when hit a gird
function checkcollisions()
{
  for (let i = 0; i < blocks.length; i++){
    //agar ball block ke neeche prtion yani
    //bottom left aur bottom right ke beech me
    // rehga and height ke andar rhga
    //to collision hua
    //aur ye har block ke lie repeat
    // so for loop;
    if
    ((pos[0] > blocks[i].bottomLeft[0] && pos[0] < blocks[i].bottomRight[0]) &&
     ((pos[1] + balldia) > blocks[i].bottomLeft[1] && pos[1] < blocks[i].topLeft[1])
)
    {
      const allbocks = Array.from(document.querySelectorAll('.block'))
    allbocks[i].classList.remove('block')
    blocks.splice(i,1)//remov
    changedir()
    score++
    scoredisplay.innerHtml = score
    if (blocks.length == 0) {
    scoredisplay.innerHTML = 'You Win!'
    clearInterval(timerId)
    document.removeEventListener('keydown', moveUser)
  }
    }
  }
  if (pos[0]>=(bordWidth-balldia) ||
  pos[1] >= (boardHeight - balldia) ||
pos[0]<=0)
  {
    //hit kr dia mtlb chnge console.dir();
changedir()
}
//user checkcollisions
if((pos[0]>currpos[0] && pos[0]<currpos[0]+blockWidth) &&
(pos[1]> currpos[1] && pos[1]<currpos[1]+blockHeight)
)
{
changedir()
}
if (pos[1]<=0)
{
  clearInterval(timerid)
  scoredisplay.innerHtml = 'You such a looser'
  document.removeEventListener('keydown',moveUser)
}
//}
}
function changedir()
{
  if(xDirection === 2 && yDirection === 2)
  {
    yDirection = -2
    return
  }
  if(xDirection === 2 && yDirection === -2)
  {
    xDirection = -2
    return
  }
  if (xDirection === -2 && yDirection === -2)
  {
    yDirection = 2
    return
  }
  if(xDirection === - 2 && yDirection === 2)
  {
    xDirection = 2
    return
  }
}
