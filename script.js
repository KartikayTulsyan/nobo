if (window.matchMedia("(max-width: 1000px)").matches) {

    const coinsound = new Audio('image/move.mp3');
    const gameover = new Audio('image/gameover.mp3');
    const gamemusic = new Audio('image/rockmusic.mp3');

    const score = document.querySelector('.score');
    const startScreen = document.querySelector('.startScreen');
    const gameArea = document.querySelector('.gameArea');
    const body = document.getElementById('body')
    const startbtn = document.getElementsByClassName('startbtn')[0];
    const gamecoin = document.getElementsByClassName('gamecoin')[0];
    const hiscorebox = document.querySelector('.hiscorebox');
    const hicoinbox = document.getElementById('hicoinbox');
    const speedboxp = document.getElementById('speedboxp');
    const speedbox = document.getElementsByClassName('speedbox')[0];
    const controlpanel = document.querySelector('.controlpanel');


    let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false };

    let player = { speed: 7, speedtop: 3.5, speedumy: 7, scoreval: 0, coinval: 0 };
    player.speedumy = player.speed;

    let speed = 5;
    let road;

    let car1, car2, car3, car4, car5;
    let car_1, car_2, car_3, car_4, car_5;

    let up=false,down=false,right=false,left=false;


    function isCollide(a, b) {
        mycarRect = a.getBoundingClientRect();
        enemycarRect = b.getBoundingClientRect();

        return !((mycarRect.bottom < enemycarRect.top + 10) || (mycarRect.top > enemycarRect.bottom) || (mycarRect.right < enemycarRect.left + 10) || (mycarRect.left > enemycarRect.right - 10));
    }

    function getcoins(a, b) {
        mycarRect = a.getBoundingClientRect();
        coinRect = b.getBoundingClientRect();
        return !((mycarRect.bottom < coinRect.top) || (mycarRect.top > coinRect.bottom) || (mycarRect.right < coinRect.left) || (mycarRect.left > coinRect.right));
    }

    function setspeed() {
        if (player.speed < 11) {
            speedval = Math.round(player.speed * 5.71);
        }
        else if (player.speed < 14) {
            speedval = Math.round(player.speed * 6.511);
        }
        else if (player.speed > 14 && player.speed < 16) {
            speedval = Math.round(player.speed * 7.221);
        }
        else if (player.speed > 16) {
            speedval = Math.round(player.speed * 8.2);
        }
        if (player.speed >= 17) {
            speedval = 150;
        }
        console.log(player.speed)
        speedboxp.innerHTML = `${speedval}Km/hr`
    }

    //for getting cars position
    function setCarsRect() {

        car_1 = document.querySelector('.car1');
        car_2 = document.querySelector('.car2');
        car_3 = document.querySelector('.car3');
        car_4 = document.querySelector('.car4');
        // car_5 = document.querySelector('.car5');

        car1 = car_1.getBoundingClientRect();
        car2 = car_2.getBoundingClientRect();
        car3 = car_3.getBoundingClientRect();
        car4 = car_4.getBoundingClientRect();
        // car5 = car_5.getBoundingClientRect();
    }


    //for moving road lines
    function movelines() {
        let lines = document.querySelectorAll('.lines');
        lines.forEach(function (e) {
            if (e.y >= road.height) {
                e.y -= (road.height);
            }
            e.y += (player.speed + 3);
            e.style.top = e.y + 'px';
        });
    }

    function moveenemy(car) {
        let enemycars = document.querySelectorAll('.enemy');

        //for getting cars position
        setCarsRect();

        enemycars.forEach(function (e) {
            if ((isCollide(car, e))) {
                gameover.play();
                player.start = false;
                main();
            }
            if (e.y >= road.height) {
                e.y = (-250);
                e.style.left = `${Math.floor(Math.random() * (road.width - 50))}px`;
                eRect = e.getBoundingClientRect();
                if (!(eRect.right < car1.left + 10) || (eRect.left > car1.right - 10) || (eRect.right < car2.left + 10) || (eRect.left > car2.right - 10) || (eRect.right < car3.left + 10) || (eRect.left > car3.right - 10) || (eRect.right < car4.left + 10) || (eRect.left > car4.right - 10)) {
                    e.style.left = `${Math.floor(Math.random() * (road.width - 50))}px`;
                }
            }
            // e.style.background='url(image/car3.png)';
            e.y += (player.speed - 1);
            e.style.top = e.y + 'px';
        });
    }
    function movecoins(car) {
        let coins = document.querySelectorAll('.coin');
        coins.forEach(function (e) {
            if ((getcoins(car, e))) {
                coinsound.play();
                player.coinval += 1;
                e.classList.add('hide');
                gamecoin.innerHTML = `Coins: ${player.coinval}`;
            }
            if (e.y >= road.height) {
                e.classList.remove('hide');
                e.y = (-150);
                e.style.left = `${Math.floor(Math.random() * (road.width - 50))}px`;
            }
            e.y += (player.speed - 1);
            e.style.top = e.y + 'px';
        });
    }




    //on click key function
    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyUp);
    function keydown(e) {
        keys[e.key] = true;
    }
    function keyUp(e) {
        keys[e.key] = false;
    }
    
    document.getElementById('up').addEventListener('click',upfun);
    document.getElementById('down').addEventListener('click',downfun);
    document.getElementById('left').addEventListener('click',leftfun);
    document.getElementById('right').addEventListener('click',rightfun);



    function upfun(){
        up=true;
    }
    function downfun(){
        down=true;
    }
    function leftfun(){
        left=true;
    }
    function rightfun(){
        right=true;
    }


    //gamePlay function
    function gamePlay() {
        let car = document.getElementsByClassName('car')[0];

        movelines();
        moveenemy(car);
        movecoins(car);
        setspeed();
        road = gameArea.getBoundingClientRect();
        if (player.start) {
            //all speed control

            if ( up==true && player.y > 150) {
                up = false;
                if (player.speed < 12) {
                    player.speed += 0.13;
                }
                if (player.speed < 15.5) {
                    player.speed += 0.079;
                }
                if (player.speed < 18) {
                    player.speed += 0.069;
                }
                player.y -= 1.2;
                // console.log('topArrow: ' + player.speed);
                if (player.speedumy < 7) {
                    player.speedumy += 0.2;
                }
            }

            // if (player.speed > 8) {
            //     player.speed -= 0.07;
            //     // console.log(player.speed)
            // }


            if (down==true) {
                down=false;
                //all speed control
                if (player.speed > 6) {
                    player.speed -= 0.4;
                }
                if (player.speedumy > 4) {
                    player.speedumy -= 0.2;
                }
                if (player.y < road.bottom - 100) {
                    player.y += 4.7;
                    // console.log('downArrow: ' + player.speed);
                }
            }
            // if (player.speed > 7) {
            //     player.speed += 0.03;
            // }

            if (left==true && player.x > 2) {
                player.x -= player.speedumy;
                left=false;
                console.log('speeddummy'+player.speedumy)
            }
            if (right==true && player.x < (road.width - 60)) {
                right=false;
                player.x += player.speedumy;
            }
            car.style.left = player.x + "px";
            car.style.top = player.y + "px";

            window.requestAnimationFrame(gamePlay);
            player.scoreval++;
            score.innerHTML = `Score: ${player.scoreval}`;
            // hiscore
            if (hiscoreval < player.scoreval) {
                hiscoreval = player.scoreval;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                hiscorebox.innerHTML = "Hi Score: " + hiscoreval;
            }
        }


    }

    let hicoin = localStorage.getItem("hicoin");
    if (hicoin === null) {
        hicoinval = 0;
        localStorage.setItem("$ :", JSON.stringify(hicoinval));
    }
    else {
        hicoinval = JSON.parse(hicoin);
        hicoinbox.innerHTML = "$ : " + hicoinval;
    }


    //main function
    function main() {
        gamemusic.pause();
        gameArea.innerHTML = "";
        score.innerHTML = `Score: ${player.scoreval}`;
        startScreen.classList.remove('hide');
        gameArea.classList.add('hide');
        body.classList.remove('body');
        gamecoin.classList.add('hide');
        speedbox.classList.add('hide');
        controlpanel.classList.add('hide');
        startbtn.addEventListener('click', start);
        console.log('hgdkdftdktdhg')

        //display final coins
        hicoinval += player.coinval;
        localStorage.setItem("hicoin", JSON.stringify(hicoinval));
        hicoinbox.innerHTML = "$ : " + hicoinval;


        player = { speed: 7, speedtop: 3.5, speedumy: 7, scoreval: 0, coinval: 0 };
        gamecoin.innerHTML = `Coins: ${player.coinval}`;
        score.innerHTML = `Score: ${player.scoreval}`;
    }

    function restart() {
        gameArea.innerHTML = "";
        score.innerHTML = `Score: ${player.scoreval}`;

        //display final coins
        hicoinval += player.coinval;
        localStorage.setItem("hicoin", JSON.stringify(hicoinval));
        hicoinbox.innerHTML = "$ : " + hicoinval;


        player = { speed: 7, speedtop: 3.5, speedumy: 7, scoreval: 0, coinval: 0 };
        gamecoin.innerHTML = `Coins: ${player.coinval}`;
        score.innerHTML = `Score: ${player.scoreval}`;
        start();
    }




    //main
    let hiscore = localStorage.getItem("hiscore");
    if (hiscore === null) {
        hiscoreval = 0;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
    }
    else {
        hiscoreval = JSON.parse(hiscore);
        hiscorebox.innerHTML = "Hi Score: " + hiscoreval;
    }





    main();


    function start() {
        gamemusic.play();
        player.start = true;
        player.scoreval = 0;
        window.requestAnimationFrame(gamePlay);

        startScreen.classList.add('hide');
        gameArea.classList.remove('hide');
        body.classList.add('body');
        gamecoin.classList.remove('hide');
        speedbox.classList.remove('hide');
        controlpanel.classList.remove('hide');

        //animating roadline
        for (let i = 0; i < 6; i++) {
            let roadLine = document.createElement('div');
            roadLine.setAttribute('class', 'lines');
            roadLine.y = (i * 150);
            roadLine.style.top = `${roadLine.y}px`
            gameArea.appendChild(roadLine);
        }

        //creating car
        let car = document.createElement('div');
        car.setAttribute('class', 'car');
        gameArea.appendChild(car);

        player.x = car.offsetLeft;
        player.y = car.offsetTop;

        // console.log(car.getBoundingClientRect());
        road = gameArea.getBoundingClientRect();
        //creating random cars
        for (let x = 0; x < 4; x++) {
            let enemycar = document.createElement('div');
            enemycar.setAttribute('class', 'enemy');
            enemycar.y = ((x + 1) * 350) * -1;
            enemycar.classList.add(`car${x + 1}`)
            // console.log(`url(image/car${x + 1}.png)`);
            enemycar.style.top = `${enemycar.y}px`
            enemycar.style.left = `${Math.floor(Math.random() * (road.width - 42))}px`;
            gameArea.appendChild(enemycar);
        }

        //creating coins
        for (let x = 0; x < 8; x++) {
            let coins = document.createElement('div');
            coins.setAttribute('class', 'coin');
            coins.y = ((x + 1) * 150) * -1;
            coins.classList.add('coin');
            coins.classList.add('coin' + (x + 1));
            coins.style.top = `${coins.y}px`
            coins.style.left = `${Math.floor(Math.random() * (road.width - 42))}px`;
            gameArea.appendChild(coins);
        }

    }

}




else {

    const coinsound = new Audio('image/move.mp3');
    const gameover = new Audio('image/gameover.mp3');
    const gamemusic = new Audio('image/rockmusic.mp3');

    const score = document.querySelector('.score');
    const startScreen = document.querySelector('.startScreen');
    const gameArea = document.querySelector('.gameArea');
    const body = document.getElementById('body')
    const startbtn = document.getElementsByClassName('startbtn')[0];
    const gamecoin = document.getElementsByClassName('gamecoin')[0];
    const hiscorebox = document.querySelector('.hiscorebox');
    const hicoinbox = document.getElementById('hicoinbox');
    const speedboxp = document.getElementById('speedboxp');
    const speedbox = document.getElementsByClassName('speedbox')[0];


    let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false };

    let player = { speed: 7, speedtop: 3.5, speedumy: 7, scoreval: 0, coinval: 0 };
    player.speedumy = player.speed;

    let speed = 5;
    let road;

    let car1, car2, car3, car4, car5;
    let car_1, car_2, car_3, car_4, car_5;




    function isCollide(a, b) {
        mycarRect = a.getBoundingClientRect();
        enemycarRect = b.getBoundingClientRect();

        return !((mycarRect.bottom < enemycarRect.top + 10) || (mycarRect.top > enemycarRect.bottom) || (mycarRect.right < enemycarRect.left + 10) || (mycarRect.left > enemycarRect.right - 10));
    }

    function getcoins(a, b) {
        mycarRect = a.getBoundingClientRect();
        coinRect = b.getBoundingClientRect();
        return !((mycarRect.bottom < coinRect.top) || (mycarRect.top > coinRect.bottom) || (mycarRect.right < coinRect.left) || (mycarRect.left > coinRect.right));
    }

    function setspeed() {
        if (player.speed < 11) {
            speedval = Math.round(player.speed * 5.71);
        }
        else if (player.speed < 14) {
            speedval = Math.round(player.speed * 6.511);
        }
        else if (player.speed > 14 && player.speed < 16) {
            speedval = Math.round(player.speed * 7.221);
        }
        else if (player.speed > 16) {
            speedval = Math.round(player.speed * 8.2);
        }
        if (player.speed >= 17) {
            speedval = 150;
        }
        console.log(player.speed)
        speedboxp.innerHTML = `${speedval}Km/hr`
    }

    //for getting cars position
    function setCarsRect() {

        car_1 = document.querySelector('.car1');
        car_2 = document.querySelector('.car2');
        car_3 = document.querySelector('.car3');
        car_4 = document.querySelector('.car4');
        // car_5 = document.querySelector('.car5');

        car1 = car_1.getBoundingClientRect();
        car2 = car_2.getBoundingClientRect();
        car3 = car_3.getBoundingClientRect();
        car4 = car_4.getBoundingClientRect();
        // car5 = car_5.getBoundingClientRect();
    }


    //for moving road lines
    function movelines() {
        let lines = document.querySelectorAll('.lines');
        lines.forEach(function (e) {
            if (e.y >= road.height) {
                e.y -= (road.height);
            }
            e.y += (player.speed + 3);
            e.style.top = e.y + 'px';
        });
    }

    function moveenemy(car) {
        let enemycars = document.querySelectorAll('.enemy');

        //for getting cars position
        setCarsRect();

        enemycars.forEach(function (e) {
            if ((isCollide(car, e))) {
                gameover.play();
                player.start = false;
                main();
            }
            if (e.y >= road.height) {
                e.y = (-250);
                e.style.left = `${Math.floor(Math.random() * (road.width - 50))}px`;
                eRect = e.getBoundingClientRect();
                if (!(eRect.right < car1.left + 10) || (eRect.left > car1.right - 10) || (eRect.right < car2.left + 10) || (eRect.left > car2.right - 10) || (eRect.right < car3.left + 10) || (eRect.left > car3.right - 10) || (eRect.right < car4.left + 10) || (eRect.left > car4.right - 10)) {
                    e.style.left = `${Math.floor(Math.random() * (road.width - 50))}px`;
                }
            }
            // e.style.background='url(image/car3.png)';
            e.y += (player.speed - 1);
            e.style.top = e.y + 'px';
        });
    }
    function movecoins(car) {
        let coins = document.querySelectorAll('.coin');
        coins.forEach(function (e) {
            if ((getcoins(car, e))) {
                coinsound.play();
                player.coinval += 1;
                e.classList.add('hide');
                gamecoin.innerHTML = `Coins: ${player.coinval}`;
            }
            if (e.y >= road.height) {
                e.classList.remove('hide');
                e.y = (-150);
                e.style.left = `${Math.floor(Math.random() * (road.width - 50))}px`;
            }
            e.y += (player.speed - 1);
            e.style.top = e.y + 'px';
        });
    }



    //on click key function
    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyUp);
    function keydown(e) {
        keys[e.key] = true;
    }
    function keyUp(e) {
        keys[e.key] = false;
    }

    //gamePlay function
    function gamePlay() {
        let car = document.getElementsByClassName('car')[0];

        movelines();
        moveenemy(car);
        movecoins(car);
        setspeed();
        road = gameArea.getBoundingClientRect();
        if (player.start) {
            //all speed control
            if (keys.ArrowUp && player.y > 150) {
                if (player.speed < 12) {
                    player.speed += 0.13;
                }
                if (player.speed < 15.5) {
                    player.speed += 0.079;
                }
                if (player.speed < 18) {
                    player.speed += 0.069;
                }
                player.y -= 1.2;
                // console.log('topArrow: ' + player.speed);
                if (player.speedumy < 7) {
                    player.speedumy += 0.2;
                }
            }
            if (player.speed > 8) {
                player.speed -= 0.07;
                // console.log(player.speed)
            }
            if (keys.ArrowDown) {
                //all speed control
                if (player.speed > 6) {
                    player.speed -= 0.4;
                }
                if (player.speedumy > 4) {
                    player.speedumy -= 0.2;
                }
                if (player.y < road.bottom - 100) {
                    player.y += 4.7;
                    // console.log('downArrow: ' + player.speed);
                }
            }
            if (player.speed > 7) {
                player.speed += 0.03;
            }
            if (keys.ArrowLeft && player.x > 2) {
                player.x -= player.speedumy;
                // console.log(player.speedumy)
            }
            if (keys.ArrowRight && player.x < (road.width - 60)) {
                player.x += player.speedumy;
            }
            car.style.left = player.x + "px";
            car.style.top = player.y + "px";

            window.requestAnimationFrame(gamePlay);
            player.scoreval++;
            score.innerHTML = `Score: ${player.scoreval}`;
            // hiscore
            if (hiscoreval < player.scoreval) {
                hiscoreval = player.scoreval;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                hiscorebox.innerHTML = "Hi Score: " + hiscoreval;
            }
        }


    }

    let hicoin = localStorage.getItem("hicoin");
    if (hicoin === null) {
        hicoinval = 0;
        localStorage.setItem("$ :", JSON.stringify(hicoinval));
    }
    else {
        hicoinval = JSON.parse(hicoin);
        hicoinbox.innerHTML = "$ : " + hicoinval;
    }


    //main function
    function main() {
        gamemusic.pause();
        gameArea.innerHTML = "";
        score.innerHTML = `Score: ${player.scoreval}`;
        startScreen.classList.remove('hide');
        gameArea.classList.add('hide');
        body.classList.remove('body');
        gamecoin.classList.add('hide');
        speedbox.classList.add('hide');
        startbtn.addEventListener('click', start);

        //display final coins
        hicoinval += player.coinval;
        localStorage.setItem("hicoin", JSON.stringify(hicoinval));
        hicoinbox.innerHTML = "$ : " + hicoinval;


        player = { speed: 7, speedtop: 3.5, speedumy: 7, scoreval: 0, coinval: 0 };
        gamecoin.innerHTML = `Coins: ${player.coinval}`;
        score.innerHTML = `Score: ${player.scoreval}`;
    }

    function restart() {
        gameArea.innerHTML = "";
        score.innerHTML = `Score: ${player.scoreval}`;

        //display final coins
        hicoinval += player.coinval;
        localStorage.setItem("hicoin", JSON.stringify(hicoinval));
        hicoinbox.innerHTML = "$ : " + hicoinval;


        player = { speed: 7, speedtop: 3.5, speedumy: 7, scoreval: 0, coinval: 0 };
        gamecoin.innerHTML = `Coins: ${player.coinval}`;
        score.innerHTML = `Score: ${player.scoreval}`;
        start();
    }




    //main
    let hiscore = localStorage.getItem("hiscore");
    if (hiscore === null) {
        hiscoreval = 0;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
    }
    else {
        hiscoreval = JSON.parse(hiscore);
        hiscorebox.innerHTML = "Hi Score: " + hiscoreval;
    }





    main();


    function start() {
        gamemusic.play();
        player.start = true;
        player.scoreval = 0;
        window.requestAnimationFrame(gamePlay);

        startScreen.classList.add('hide');
        gameArea.classList.remove('hide');
        body.classList.add('body');
        gamecoin.classList.remove('hide');
        speedbox.classList.remove('hide');

        //animating roadline
        for (let i = 0; i < 6; i++) {
            let roadLine = document.createElement('div');
            roadLine.setAttribute('class', 'lines');
            roadLine.y = (i * 150);
            roadLine.style.top = `${roadLine.y}px`
            gameArea.appendChild(roadLine);
        }

        //creating car
        let car = document.createElement('div');
        car.setAttribute('class', 'car');
        gameArea.appendChild(car);

        player.x = car.offsetLeft;
        player.y = car.offsetTop;

        // console.log(car.getBoundingClientRect());
        road = gameArea.getBoundingClientRect();
        //creating random cars
        for (let x = 0; x < 4; x++) {
            let enemycar = document.createElement('div');
            enemycar.setAttribute('class', 'enemy');
            enemycar.y = ((x + 1) * 350) * -1;
            enemycar.classList.add(`car${x + 1}`)
            // console.log(`url(image/car${x + 1}.png)`);
            enemycar.style.top = `${enemycar.y}px`
            enemycar.style.left = `${Math.floor(Math.random() * (road.width - 42))}px`;
            gameArea.appendChild(enemycar);
        }

        //creating coins
        for (let x = 0; x < 8; x++) {
            let coins = document.createElement('div');
            coins.setAttribute('class', 'coin');
            coins.y = ((x + 1) * 150) * -1;
            coins.classList.add('coin');
            coins.classList.add('coin' + (x + 1));
            coins.style.top = `${coins.y}px`
            coins.style.left = `${Math.floor(Math.random() * (road.width - 42))}px`;
            gameArea.appendChild(coins);
        }

    }

}


