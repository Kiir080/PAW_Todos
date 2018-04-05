(function setDOB() {
 
   
    for (let i = 1; i < 32; i++) {
        let txt = document.createTextNode(i);
        let temp = document.createElement("option");
        temp.appendChild(txt);
        document.getElementById("day").appendChild(temp).setAttribute("value",i);
    }

    for (let i = 1; i < 13; i++) {
        let txt = document.createTextNode(i);
        let temp = document.createElement("option");
        temp.appendChild(txt);
        document.getElementById("month").appendChild(temp).setAttribute("value",i);
    }

    for (let i = 1950; i < ((new Date()).getFullYear() +1 ); i++) {
        let txt = document.createTextNode(i);
        let temp = document.createElement("option");
        temp.appendChild(txt);
        document.getElementById("year").appendChild(temp).setAttribute("value",i);
    }

})()
