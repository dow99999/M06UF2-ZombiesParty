

function esperantAlUsuari(){
    let text = "ESPERANDO AL USUARIO";
    for(let i = 0; i < phase; i++){
        text += ".";
    }
    
    if(phase == 3){
        phase = 1;
    } else {
        phase++;
    }

    afeguirText("waiting-user", text);
}