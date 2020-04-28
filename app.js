new Vue({
    el:'#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false    
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function() {
            var damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            
            if (this.checkWin()){
                return;
            }
            this.monsterAttacks();

        },
        specialAttack: function() {

        }, 
        heal: function() {

        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        monsterAttacks: function(){
            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.checkWin();

        },
        calculateDamage: function(min, max){
            return  Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function(){
            if(this.monsterHealth <= 0){
                if(confirm('Ganaste! Jugar de nuevo?')){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            else if (this.playerHealth <= 0) {
                if(confirm('Perdiste! Jugar de nuevo?')){
                    this.startGame();
                }
                else {
                    this.gameIsRunning = false;
                }
                return true;                
            }
            return false;
        }         
    }
    });