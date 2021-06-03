  
  const $cadasterforms = document.querySelectorAll(".fset");
  const $nextbtn = document.querySelectorAll(".next-btn");
  const $returnbtn = document.querySelectorAll(".return-btn");
  const $confirmfile = document.querySelectorAll(".File");
  var $labelfile = document.querySelectorAll(".label-file-send");
  var $controller = 0;


  window.addEventListener("load",function(){
    const $body = document.getElementsByTagName("body");
    $body[0].classList.remove("preload");
  })



  

$nextbtn.forEach(element => {
  element.addEventListener('click',function(){

    for(var i =0;i<= $cadasterforms.length-1;i++){
      $cadasterforms[i].classList.remove("formshow");
    }
    $controller++;
    $controller = $controller % $cadasterforms.length;
    $cadasterforms[Math.abs($controller)].classList.add("formshow");
  
  })
});


$returnbtn.forEach(element => {
  element.addEventListener('click',function(){

    for(var i =0;i<= $cadasterforms.length-1;i++){
      $cadasterforms[i].classList.remove("formshow");
    }
    $controller--;
    $controller = $controller % $cadasterforms.length;
    $cadasterforms[$controller].classList.add("formshow");
  
  })
});


  for(var x = 0;x<= $confirmfile.length-1;x++){     
      $labelfile[x].firstElementChild.addEventListener('change',function(){
        this.parentNode.innerHTML = this.parentNode.innerHTML.replace("Enviar","Uploaded");
    })
  }

