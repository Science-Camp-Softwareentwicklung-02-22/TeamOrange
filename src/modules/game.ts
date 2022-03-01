//controll player 

var controller, loop, player;

player={
    height:32,
    jumping=true,
    width=20,
    x:144,
    x_velocity: 0,
    y_velocity: 0,    
};

controller= {
    left:false,
    right: false,
    up: false, 
    
    keyListener: function(event){
        var key_state= (event.type == "keydown")?true:false;

        switch(event.keyCode){
            case37:
            controller.left=key_state;
            break;
            case39:
            controller.right=key_state;
            break;
            case38:
            controller.up=key_state;
            break;
        }
    }
};

loop= function(){
    if (controller.up && player.jumping == false) {
        player.y_velocity-=20;
        player.jumping=true;
    }
    if (controller.left){
        player.x_velocity-=0.5;
    }

    if (controller.right){
        player.x_velocity += 0,5;
    }

}

player.y_velocity += 1.5;
player.x_velocity += player.x_velocity;
player.y_velocity += player.y_velocity;



 window.addEventListener("keydown",controller.keyListener);
 window.addEventListener("keyup",controller.keyListener);
 window.requestAnimationFrame(loop);