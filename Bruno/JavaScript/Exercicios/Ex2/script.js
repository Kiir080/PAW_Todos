

(function starUp(){
    let box = document.getElementsByClassName("box");
    for(let i=0;i<box.length;i++){
        box[i].addEventListener("click", function(e){
            var rndCol = 'rgb(' + Math.floor(1 + Math.random() * 255) + ',' + Math.floor(1 + Math.random() * 255) + ',' + Math.floor(1 + Math.random() * 255) + ')';
        e.target.style.backgroundColor = rndCol;
        });      
    }
})()



