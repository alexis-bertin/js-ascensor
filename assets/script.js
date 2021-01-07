window.addEventListener("load", function (event) {

    let btnFloors = document.getElementsByClassName("floor");
    let btnAsc1 = document.getElementById("key1").getElementsByTagName('li');
    let btnAsc2 = document.getElementById("key2").getElementsByTagName('li');
    let memoryAsc1 = ["1"];
    let memoryAsc2 = ["1"];
    let blocAsc1 = document.getElementById("imgAsc1");
    let blocAsc2 = document.getElementById("imgAsc2");
    let status1 = "starting";
    let status2 = "starting";
    let currentFloor = "1";
    let currentFloor2 = "1";
    let ding1 = document.getElementById("ding1");
    let ding2 = document.getElementById("ding2");
    let music1 = document.getElementById("music1");
    let music2 = document.getElementById("music2");

    //GESTION DES BOUTONS D'ETAGES

    for (let i = 0; i < btnFloors.length; i++) {
        btnFloors[i].addEventListener('click', actionBtnFloor, false);
    }

    //GESTION DU CLAVIER DE L'ASCENSEUR 1
    for (let i = 0; i < btnAsc1.length; i++) {
        btnAsc1[i].addEventListener('click', actionBtnAsc1, false);
    }

    //GESTION DU CLAVIER DE L'ASCENSEUR 1
    for (let i = 0; i < btnAsc2.length; i++) {
        btnAsc2[i].addEventListener('click', actionBtnAsc2, false);
    }



    // FONCTIONS

    function actionBtnFloor() {
        let attribute = this.getAttribute("data-floor");
        this.classList.add("waiting");

        addFloorToAsc(attribute, 1);
        addFloorToAsc(attribute, 2);

        if (status1 == "starting" && attribute !== currentFloor) {
            startAsc(1);
        }
        if (status2 == "starting" && attribute !== currentFloor2) {
            startAsc(2);
        }
    }

    function actionBtnAsc1() {
        let value = this.textContent;
        this.classList.add("waiting");
        let diff = [];
        let indexofMin = "";

        if (memoryAsc1.includes(value) && value !== memoryAsc1[0]) {
            let index = memoryAsc1.indexOf(value);
            memoryAsc1.splice(index, 1);
        }

        for (let i = 0; i < memoryAsc1.length; i++) {
            diff.push(Math.abs(value - memoryAsc1[i]));
        }
        let min = Math.min(...diff);
        for (let i = 0; i < diff.length; i++) {
            if (Math.abs(value - memoryAsc1[i]) == min) {
                indexofMin = memoryAsc1.indexOf(memoryAsc1[i]);
            }
        }

        if (memoryAsc1.length < 2) {
            indexofMin = "1";
        }
        else if (indexofMin == "0" || indexofMin == "1") {
            indexofMin = "2";
        }
        memoryAsc1.splice(indexofMin, 0, value);

        if (status1 == "starting" && value !== currentFloor) {
            startAsc(1);
        }
    }

    function actionBtnAsc2() {
        let value = this.textContent;
        this.classList.add("waiting");
        let diff = [];
        let indexofMin = "";

        if (memoryAsc2.includes(value) && value !== memoryAsc2[0]) {
            let index = memoryAsc2.indexOf(value);
            memoryAsc2.splice(index, 1);
        }

        for (let i = 0; i < memoryAsc2.length; i++) {
            diff.push(Math.abs(value - memoryAsc2[i]));
        }
        let min = Math.min(...diff);
        for (let i = 0; i < diff.length; i++) {
            if (Math.abs(value - memoryAsc2[i]) == min) {
                indexofMin = memoryAsc2.indexOf(memoryAsc2[i]);
            }
        }

        if (memoryAsc2.length < 2) {
            indexofMin = "1";
        }
        else if (indexofMin == "0" || indexofMin == "1") {
            indexofMin = "2";
        }
        memoryAsc2.splice(indexofMin, 0, value);

        if (status2 == "starting" && value !== currentFloor2) {
            startAsc(2);
        }
    }

    function addFloorToAsc(floor, asc) {
        switch (asc) {
            case 1:
                if (!memoryAsc1.includes(floor)) {
                    memoryAsc1.push(floor);
                }
                break;
            case 2:
                if (!memoryAsc2.includes(floor)) {
                    memoryAsc2.push(floor);
                }
                break;
            default:
                console.log("L'ascenseur n'existe pas, c'est triste.");
        }
    }

    function startAsc(asc) {
        switch (asc) {
            case 1:
                console.log("Ascenseur 1 : " + memoryAsc1);
                music1.play();

                currentFloor = memoryAsc1[0];
                let nextFloor = memoryAsc1[1];
                let diffFloor = Math.abs(currentFloor - nextFloor);
                status1 = "moving";

                let heightFloor1 = (nextFloor * 100) - 100;
                blocAsc1.classList.add("close");
                blocAsc1.style.transition = "bottom " + diffFloor + "s";
                blocAsc1.style.bottom = heightFloor1 + "px";

                for (let i = 0; i < btnFloors.length; i++) {
                    if (btnFloors[i].getAttribute("data-floor") == currentFloor && (currentFloor !== currentFloor2 || status2 == "moving")) {
                        btnFloors[i].classList.remove("waiting");
                    }
                }

                stopAsc(1, diffFloor * 1000);

                break;

            case 2:
                console.log("Ascenseur 2 : " + memoryAsc2);
                music2.play();

                currentFloor2 = memoryAsc2[0];
                let nextFloor2 = memoryAsc2[1];
                let diffFloor2 = Math.abs(currentFloor2 - nextFloor2);
                status2 = "moving";

                let heightFloor2 = (nextFloor2 * 100) - 100;
                blocAsc2.classList.add("close");
                blocAsc2.style.transition = "bottom " + diffFloor2 + "s";
                blocAsc2.style.bottom = heightFloor2 + "px";

                for (let i = 0; i < btnFloors.length; i++) {
                    if (btnFloors[i].getAttribute("data-floor") == currentFloor2 && (currentFloor !== currentFloor2 || status1 == "moving")) {
                        btnFloors[i].classList.remove("waiting");
                    }
                }

                stopAsc(2, diffFloor2 * 1000);

                break;

            default:
                console.log("L'ascenseur est peut-être en panne, RIP.");
        }
    }

    function stopAsc(asc, time) {
        switch (asc) {
            case 1:
                for (let i = 0; i < btnFloors.length; i++) {
                    if (btnFloors[i].getAttribute("data-floor") == memoryAsc1[1]) {
                        btnFloors[i].classList.add("waiting");
                    }
                }

                setTimeout(function () {
                    ding1.play();
                    blocAsc1.classList.remove("close");

                    status1 = "stopped";
                    music1.pause();

                    currentFloor = memoryAsc1[1];

                    for (let i = 0; i < btnAsc1.length; i++) {
                        if (btnAsc1[i].textContent.includes(memoryAsc1[0])) {
                            btnAsc1[i].classList.remove("waiting");
                        }
                    }

                    memoryAsc1.splice(0, 1);

                    if (memoryAsc1.length > 1) {
                        restartAsc(1);
                    }
                    else {
                        status1 = "starting";
                    }
                }, time);

                break;

            case 2:
                for (let i = 0; i < btnFloors.length; i++) {
                    if (btnFloors[i].getAttribute("data-floor") == memoryAsc2[1]) {
                        btnFloors[i].classList.add("waiting");
                    }
                }
                setTimeout(function () {
                    ding2.play();
                    blocAsc2.classList.remove("close");

                    status2 = "stopped";
                    music2.pause();

                    currentFloor2 = memoryAsc2[1];

                    for (let i = 0; i < btnAsc2.length; i++) {
                        if (btnAsc2[i].textContent.includes(memoryAsc2[0])) {
                            btnAsc2[i].classList.remove("waiting");
                        }
                    }

                    memoryAsc2.splice(0, 1);

                    if (memoryAsc2.length > 1) {
                        restartAsc(2);
                    }
                    else {
                        status2 = "starting";
                    }
                }, time);

                break;
            default:
                console.log("L'ascenseur s'envole vers d'autres cieuuuuuuux !");
        }
    }

    function restartAsc(asc) {
        setTimeout(function () {
            startAsc(asc);
        }, 2000);
    }


});