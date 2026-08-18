const email=document.getElementById("email");
const password=document.getElementById("password");
const buttonZone=document.getElementById("buttonZone");
const loginButton=document.getElementById("loginButton");
const togglePassword=document.getElementById("togglePassword");
const success=document.getElementById("success");

function isFormValid(){
  const validEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  return validEmail && password.value.length>=8;
}
function updateButton(){
  loginButton.classList.toggle("ready",isFormValid());
}
email.addEventListener("input",updateButton);
password.addEventListener("input",updateButton);

buttonZone.addEventListener("mousemove",(event)=>{
  if(isFormValid()) return;
  const zone=buttonZone.getBoundingClientRect();
  const button=loginButton.getBoundingClientRect();
  const mouseX=event.clientX-zone.left, mouseY=event.clientY-zone.top;
  const buttonX=button.left-zone.left+button.width/2;
  const buttonY=button.top-zone.top+button.height/2;
  const dx=mouseX-buttonX, dy=mouseY-buttonY;
  const distance=Math.hypot(dx,dy);
  const triggerDistance=145;

  if(distance<triggerDistance){
    let moveX=-dx, moveY=-dy;
    const length=Math.hypot(moveX,moveY);
    if(length>0){moveX/=length;moveY/=length}
    const escapeDistance=65+(triggerDistance-distance)*.9;
    let newX=buttonX+moveX*escapeDistance;
    let newY=buttonY+moveY*escapeDistance;
    const padding=10;
    const minX=button.width/2+padding;
    const maxX=zone.width-button.width/2-padding;
    const minY=button.height/2+padding;
    const maxY=zone.height-button.height/2-padding;
    newX=Math.max(minX,Math.min(maxX,newX));
    newY=Math.max(minY,Math.min(maxY,newY));
    loginButton.style.left=newX+"px";
    loginButton.style.top=newY+"px";
    loginButton.style.transform=`translate(-50%,-50%) rotate(${(newX-buttonX)*.08}deg)`;
  }
});

loginButton.addEventListener("touchstart",(event)=>{
  if(isFormValid()) return;
  event.preventDefault();
  const zone=buttonZone.getBoundingClientRect(), padding=15;
  const minX=loginButton.offsetWidth/2+padding;
  const maxX=zone.width-loginButton.offsetWidth/2-padding;
  const minY=loginButton.offsetHeight/2+padding;
  const maxY=zone.height-loginButton.offsetHeight/2-padding;
  const randomX=Math.random()*(maxX-minX)+minX;
  const randomY=Math.random()*(maxY-minY)+minY;
  loginButton.style.left=randomX+"px";
  loginButton.style.top=randomY+"px";
  loginButton.style.transform=`translate(-50%,-50%) rotate(${Math.random()*20-10}deg)`;
});

togglePassword.addEventListener("click",()=>{
  password.type=password.type==="password"?"text":"password";
});

loginButton.addEventListener("click",()=>{
  if(!isFormValid()) return;
  success.classList.add("show");
  loginButton.textContent="✓ Logged in";
});

document.addEventListener("keydown",(event)=>{
  if(event.key==="Enter" && isFormValid()) loginButton.click();
});
