new Vue({
    el:'#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []   
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function() {
            this.turns.unshift({
                isPlayer: true,
                text: `El jugador golpea al monstruo ${5}%`
            })
        },
        specialAttack: function() {
            let damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage;
            if (this.checkWin()){
                return;
            }
            this.monsterAttacks();
        }, 
        heal: function() {
            this.playerHealth = Math.min(100, playerHealth+10)
            this.monsterAttacks()
        },
        giveUp: function() {
            this.gameIsRunning = false;
        }         
    }
    });