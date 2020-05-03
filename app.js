new Vue({
    el:'#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        specialAttackCount: 0,
        turns: []   
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.specialAttackCount = 0;
            this.turns = [];
        },
        attack: function() {
            const damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;

            this.turns.unshift({
                isPlayer: true,
                text: `El jugador golpea al monstruo un ${damage}%`
            })
            
            if (this.checkWin()){
                return;
            }
            this.monsterAttacks();
        },
        specialAttack: function() {
            const damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.specialAttackCount++;

            this.turns.unshift({
                isPlayer: true,
                text: `El jugador golpea poderosamente al monstruo un ${damage}%`
            })

            if (this.checkWin()){
                return;
            }
            this.monsterAttacks();
        }, 
        heal: function() {
            const oldPlayerHealth = this.playerHealth;
            this.playerHealth = Math.min(100, this.playerHealth+10);

            this.turns.unshift({
                isPlayer: true,
                text: `El jugador recupera un ${this.playerHealth - oldPlayerHealth}%`
            })

            this.monsterAttacks();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        monsterAttacks: function(){
            const damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;

            this.turns.unshift({
                isPlayer: false,
                text: `El monstruo golpea al jugador un ${damage}%`
            })

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