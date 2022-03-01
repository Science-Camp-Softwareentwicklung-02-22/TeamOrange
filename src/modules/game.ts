//controll player 

const Controller =function(){
    this.left=new Controller.ButtonInput();
    this.right= new Controller.ButtonInput();

    switch(key_code){
        case 37: this.left.getInput(down);  break;
        case 39: this.right.getInput(down);
    }
}