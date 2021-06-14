
  
  const $cadasterforms = document.querySelectorAll(".fset");
  const $nextbtn = document.querySelectorAll(".next-btn");
  const $returnbtn = document.querySelectorAll(".return-btn");
  const $confirmfile = document.querySelectorAll(".File");
  var $labelfile = document.querySelectorAll(".label-file-send");
  var $controller = 0;
  const $photos = document.querySelectorAll(".Employee-Photo");

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
      $confirmfile[x].addEventListener('change',function(){
        const filereader = new FileReader();
        const file = this.files[0];
        $this = this.parentNode;
        filereader.onloadend = function(){
          $this.lastElementChild.src = filereader.result; 
        }
        filereader.readAsDataURL(file);
    })
  }
