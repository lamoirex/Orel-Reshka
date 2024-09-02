// var money = 0;
if(localStorage.getItem('money') > 0) {
    var money = localStorage.getItem('money')
} else {
    var money = 100
}
var upgrader = 0;
var maxRandomValueUpgrader = 0;
var minRandomValueUpgrader = 0;
var counterDecreaseUpgrader = 0;
var moneyPerSecond = 0;

var rebirthTokens = 0;
var rebirthCount = 0;
var rebirthMoneyUpgrader = 1;

var totalMoneyReceived = 0;

// Генератор случайного числа
function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// кнопка Подкинуть
var isBtnActive = false;
document.querySelector('#btn1').onclick = function() {
    if (isBtnActive == false) {
        isBtnActive = true
        let minRandomValue = 1 + minRandomValueUpgrader;
        let maxRandomValue = 4 + maxRandomValueUpgrader;
        var moneyGotten = Math.round((randomNumber(minRandomValue, maxRandomValue) + upgrader) * rebirthMoneyUpgrader) ;
        money = money + moneyGotten ;

        // таймер при нажатии кнопки "подкинуть"
        let counter = 3 - counterDecreaseUpgrader;
        setInterval(function() {
        counter = Math.round((counter - 0.1)* 10)/10;;
        if (counter >= 0) {
            document.querySelector('#btn1').innerHTML = counter;
        }
        if (counter === 0) {
            document.querySelector('#btn1').innerHTML = "Подкинуть";
            clearInterval(counter);
            isBtnActive = false
            }
        }, 100);
        // таймер при нажатии кнопки "подкинуть"
        
        // Элемент для полученных монет(падающих с неба)
        const spanForMoneyGotten = document.createElement('span');
        spanForMoneyGotten.setAttribute("id","455");
        spanForMoneyGotten.setAttribute("class",'id455');
        spanForMoneyGotten.style.top = `${randomNumber(0, 1)}px`;
        spanForMoneyGotten.style.left = `${randomNumber(2, 99)}vw`;
        const contentForMoneyGotten = document.createTextNode(0);
        spanForMoneyGotten.appendChild(contentForMoneyGotten) ;
        document.querySelector('#div1334').appendChild(spanForMoneyGotten);
        setTimeout(() => {
            document.getElementById(455).remove()
        }, 1000);
        
        // показ полученных монет
        const moneyGottenSpanForMoneyDiv = document.createElement('span');
        moneyGottenSpanForMoneyDiv.setAttribute("id", "moneyGottenSpan1");
        moneyGottenSpanForMoneyDiv.setAttribute("class", "moneyGottenSpan");
        let moneyDivCoords = document.querySelector('#moneyCount').getBoundingClientRect();
        moneyGottenSpanForMoneyDiv.style.top = moneyDivCoords.top - 10 + "px";
        moneyGottenSpanForMoneyDiv.style.position = 'fixed';
        moneyGottenSpanForMoneyDiv.style.left = moneyDivCoords.right - 20 + 'px'
        const moneyGottenSpanContent = document.createTextNode(moneyGotten);
        moneyGottenSpanForMoneyDiv.appendChild(moneyGottenSpanContent);
        document.querySelector('.money').appendChild(moneyGottenSpanForMoneyDiv);
        // показ полученных монет

        // Анимация для элемента(падающих монет)
        let start = Date.now();
        let timer = setInterval(function() {
            let timePassed = Date.now() - start;
            if (timePassed >= 2000) {
                clearInterval(timer);
                return;
            }
            draw(timePassed);
        }, 20);
        function draw(timePassed) {
            spanForMoneyGotten.style.top = `${timePassed / 5}px`;
        }

        setTimeout(() => {
            spanForMoneyGotten.style.opacity = '0';
        }, 420);
        // Элемент для полученных монет

        // анимация для полученных монет
        setTimeout(() => {
            moneyGottenSpanForMoneyDiv.style.transform = 'translateY(-20px)'
            moneyGottenSpanForMoneyDiv.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            moneyGottenSpanForMoneyDiv.style.opacity = '0';
        }, 500);

        setTimeout(() => {
            moneyGottenSpanForMoneyDiv.remove();
        }, 1500);
        // анимация для полученных монет

        // "Всего монет получено"
        totalMoneyReceived = totalMoneyReceived + moneyGotten
        document.querySelector('#moneyGottenStatistics').textContent = "Всего монет получено: " + totalMoneyReceived
        // "Всего монет получено"

        document.getElementById('moneyCount').textContent = "Монет: " + money;
    } else {
        setTimeout(() => {
            document.querySelector('#btn1').style.background = 'rgb(194, 0, , 0.3)'
        }, 10);
        setTimeout(() => {
            document.querySelector('#btn1').style.background = 'rgb(255, 0, 0)'
        }, 50);
        setTimeout(() => {
            document.querySelector('#btn1').style.background = 'rgb(143, 0, 0)'
        }, 100);
        setTimeout(() => {
            document.querySelector('#btn1').style.background = 'rgb(219, 175, 117)'
        }, 500);

    }
 };
// кнопка Подкинуть


// кнопка Улучшения
document.getElementById('upgradesButton').onclick = function upgradesMenuOpenClose() {
    let menuElement = document.querySelector('#upgradeMenu');
    let rebirthMenuElement = document.querySelector('#rebirthMenu1');
    let statisticsElement = document.querySelector('#statisticsMenu1')

    // открытие и закрытие меню
    if (menuElement.style.display === ('none')) {
        menuElement.style.display = ('flex');
        rebirthMenuElement.style.display = ('none');
        statisticsElement.style.display = ('none')
    } else {
        menuElement.style.display = ('none');
    }

};
// кнопка Улучшения

// кнопка закрытия меню
document.querySelector('#closeButton1').onclick = function closeMenu() {
    let menuElement = document.querySelector('#upgradeMenu');
    let rebirthMenuElement = document.querySelector('#rebirthMenu1');
    let statisticsElement = document.querySelector('#statisticsMenu1');

    statisticsElement.style.display = ('none');
    rebirthMenuElement.style.display = ('none');
    menuElement.style.display = ('none');
};
// кнопка закрытия меню

// +1 монета за клик улучшение 
    var cost1StartPrice = 200
    var cost1 = cost1StartPrice;
    var upgradeCount1 = 0
    document.querySelector('#upgradeButton1').onclick = function() {
        if (money >= cost1 && upgradeCount1 < 10) {
            upgrader = upgrader + 1;
            money = money - cost1;
            document.getElementById('moneyCount').textContent = "Монет: " + money;
            cost1 = Math.round(((cost1 * 1.20) + 75) / 5) * 5;
            upgradeCount1 = upgradeCount1 + 1;
            document.querySelector('#spanForUpgradeCount1').textContent = `${upgradeCount1}/10`;
            if (upgradeCount1 == 10) {document.querySelector('#upgradeButton1').textContent = 'FULL';}
            else if (upgradeCount1 < 10) {document.querySelector('#upgradeButton1').textContent = cost1;}
            else {return}
        } else if (upgradeCount1 == 10) { 
            alert('Улучшено на максимум.');
        }else {alert('Недостаточно монет')};
    };
// +1 монета за клик улучшение

// +1 к максимальному пределу клика улучшение
var cost2StartPrice = 50
var cost2 = cost2StartPrice;
var upgradeCount2 = 0
document.querySelector('#upgradeButton2').onclick = function() {
    if (money >= cost2 && upgradeCount2 < 20) {
        maxRandomValueUpgrader = maxRandomValueUpgrader + 1;
        money = money - cost2;
        document.getElementById('moneyCount').textContent = "Монет: " + money;
        cost2 = Math.round(((cost2 * 1.10) + 25) / 5) * 5;
        upgradeCount2 = upgradeCount2 + 1;
        document.querySelector('#spanForUpgradeCount2').textContent = `${upgradeCount2}/20`;
        if (upgradeCount2 == 20) {document.querySelector('#upgradeButton2').textContent = 'FULL';}
            else if (upgradeCount2 < 20) {document.querySelector('#upgradeButton2').textContent = cost2;}
            else {return}
    } else if (upgradeCount2 == 20) {
        alert('Улучшено на максимум.')} 
        else {alert('Недостаточно монет')}
};
// +1 к максимальному пределу клика улучшение

// +1 к минимальному пределу клика улучшение
var cost3StartPrice = 150
var cost3 = cost3StartPrice;
var upgradeCount3 = 0
document.querySelector('#upgradeButton3').onclick = function() {
    if (money >= cost3) {
        if ((minRandomValueUpgrader + 1) < (maxRandomValueUpgrader + 3) && upgradeCount3 < 15) {
            minRandomValueUpgrader = minRandomValueUpgrader + 1;
            money = money - cost3;
            document.getElementById('moneyCount').textContent = "Монет: " + money;
            cost3 = Math.round(((cost3 * 1.15) + 50) / 5) * 5;
            upgradeCount3 = upgradeCount3 + 1;
            document.querySelector('#spanForUpgradeCount3').textContent = `${upgradeCount3}/15`;
            if (upgradeCount3 == 15) {document.querySelector('#upgradeButton3').textContent = 'FULL';}
            else if (upgradeCount3 < 15) {document.querySelector('#upgradeButton3').textContent = cost3;}
            else {return}
        } else {alert('Для начала необходимо улучшить максимальный предел клика')}
    } else if (upgradeCount3 == 15) {
        alert('Улучшено на максимум.')} 
        else {alert('Недостаточно монет')}
};
// +1 к минимальному пределу клика улучшение

// кнопка Перерождения
document.querySelector('#rebirthButton').onclick = function rebirthMenuOpenClose() {
    let rebirthMenuElement = document.querySelector('#rebirthMenu1')
    let menuElement = document.querySelector('#upgradeMenu')
    let statisticsElement = document.querySelector('#statisticsMenu1')

    // открытие и закрытие меню
    if (rebirthMenuElement.style.display === ('none')) {
        rebirthMenuElement.style.display = ('flex');
        menuElement.style.display = ('none');
        statisticsElement.style.display = ('none')
    } else {
        rebirthMenuElement.style.display = ('none')
    }

};

document.querySelector('#closeButton2').onclick = function closeMenu() {
    let menuElement = document.querySelector('#upgradeMenu');
    let rebirthMenuElement = document.querySelector('#rebirthMenu1');
    let statisticsElement = document.querySelector('#statisticsMenu1');

    statisticsElement.style.display = ('none');
    rebirthMenuElement.style.display = ('none');
    menuElement.style.display = ('none');
};
// кнопка Перерождения

// кнопка Статистика
document.querySelector('#statisticsButton').onclick = function rebirthMenuOpenClose() {
    let rebirthMenuElement = document.querySelector('#rebirthMenu1')
    let menuElement = document.querySelector('#upgradeMenu')
    let statisticsElement = document.querySelector('#statisticsMenu1')

    // открытие и закрытие меню
    if (statisticsElement.style.display === ('none')) {
        statisticsElement.style.display = ('flex')
        rebirthMenuElement.style.display = ('none');
        menuElement.style.display = ('none');
    } else {
        statisticsElement.style.display = ('none')
    }

};

document.querySelector('#closeButton3').onclick = function closeMenu() {
    let menuElement = document.querySelector('#upgradeMenu');
    let rebirthMenuElement = document.querySelector('#rebirthMenu1');
    let statisticsElement = document.querySelector('#statisticsMenu1');

    statisticsElement.style.display = ('none');
    rebirthMenuElement.style.display = ('none');
    menuElement.style.display = ('none');
};
// кнопка Статистика

// кнопки в меню улучшений

    document.querySelector('#clickUpgradesBtn').onclick = function() {
        document.querySelector('#moneyPerSecUpgradesDiv').style.display = ('none');
        document.querySelector('#clickUpgradesDiv').style.display = ("flex");
        document.querySelectorAll('.upgradeChooseBtn').forEach(element => {
            element.style.backgroundColor = '#fff3c5'});;
        document.querySelector('#clickUpgradesBtn').style.background = ('#6dbd71');
    }

    document.querySelector('#moneyPerSecUpgradesBtn').onclick = function() {
        document.querySelector('#clickUpgradesDiv').style.display = ("none");
        document.querySelector('#moneyPerSecUpgradesDiv').style.display = ('flex');
        document.querySelectorAll('.upgradeChooseBtn').forEach(element => {
            element.style.backgroundColor = '#fff3c5'});;
        document.querySelector('#moneyPerSecUpgradesBtn').style.background = ('#6dbd71');
    }


// кнопки в меню улучшений

// улучшение -0.1 к таймеру подкидывания
var cost4StartPrice = 100
var cost4 = cost4StartPrice;
var upgradeCount4 = 0
document.querySelector('#upgradeButton4').onclick = function() {
    if (money >= cost4 && upgradeCount4 < 27) {
        counterDecreaseUpgrader = counterDecreaseUpgrader + 0.1;
        money = money - cost4;
        document.getElementById('moneyCount').textContent = "Монет: " + money;
        cost4 = Math.round(((cost4 * (1.20 - upgradeCount4 * 0.005)) + 25) / 5) * 5;
        upgradeCount4 = upgradeCount4 + 1;
        document.querySelector('#spanForUpgradeCount4').textContent = `${upgradeCount4}/27`;
        if (upgradeCount4 == 27) {document.querySelector('#upgradeButton4').textContent = 'FULL';}
        else if (upgradeCount4 < 27) {document.querySelector('#upgradeButton4').textContent = cost4;}
        else {return}
    } else if (upgradeCount4 == 27) { 
        alert('Улучшено на максимум.');
    }else {alert('Недостаточно монет')};
};
// улучшение -0.1 к таймеру подкидывания

// улучшение +1 монета в секунду\
var cost5StartPrice = 500
var cost5 = cost5StartPrice;
var upgradeCount5 = 0
document.querySelector('#upgradeButton5').onclick = function() {
    if (money >= cost5 && upgradeCount5 < 20) {
        moneyPerSecond = moneyPerSecond + 1;
        money = money - cost5;
        upgradeCount5 = upgradeCount5 + 1
        document.getElementById('moneyCount').textContent = "Монет: " + money;
        document.querySelector('.moneyPerSecond').style.display = 'flex';
        cost5 = Math.round(((cost5 * 1.10) + 300) / 5) * 5;
        document.querySelector('#spanForUpgradeCount5').textContent = `${upgradeCount5}/20`;
        document.querySelector('#moneyPerSecondID').textContent = "Монет в секунду: " + moneyPerSecond;
        document.querySelector('.moneyPerSecond').style.display = 'flex';
        if (upgradeCount5 == 20) {document.querySelector('#upgradeButton5').textContent = 'FULL';}
        else if (upgradeCount5 < 20) {document.querySelector('#upgradeButton5').textContent = cost5;}
        else {return}
    } else if (upgradeCount5 == 20) { 
        alert('Улучшено на максимум.');
    }else {alert('Недостаточно монет')};
}
// улучшение +1 монета в секунду

// бесконечный цикл на "монеты в секунду"
function moneyPerSecondFunction() {
    let moneyGottenSpanForMoneyDiv = document.createElement('span');
    moneyGottenSpanForMoneyDiv.setAttribute("id", "moneyGottenSpan");
    moneyGottenSpanForMoneyDiv.setAttribute("class", "moneyGottenSpan");
    let moneyDivCoords = document.querySelector('#moneyCount').getBoundingClientRect();
    moneyGottenSpanForMoneyDiv.style.top = moneyDivCoords.top - 10 + "px";
    moneyGottenSpanForMoneyDiv.style.position = 'absolute';
    moneyGottenSpanForMoneyDiv.style.left = moneyDivCoords.right - 20 + 'px'
    let moneyGottenSpanContent = document.createTextNode(moneyPerSecond);
    moneyGottenSpanForMoneyDiv.appendChild(moneyGottenSpanContent);
    document.querySelector('.money').appendChild(moneyGottenSpanForMoneyDiv);

    money = money + moneyPerSecond;
    document.getElementById('moneyCount').textContent = "Монет: " + money;

    totalMoneyReceived = totalMoneyReceived + moneyPerSecond
        document.querySelector('#moneyGottenStatistics').textContent = "Всего монет получено: " + totalMoneyReceived

    setTimeout(() => {
        moneyGottenSpanForMoneyDiv.style.transform = 'translateY(-20px)'
        moneyGottenSpanForMoneyDiv.style.opacity = '1';
    }, 30);

    setTimeout(() => {
        moneyGottenSpanForMoneyDiv.style.opacity = '0';
    }, 500);

    setTimeout(() => {
        moneyGottenSpanForMoneyDiv.remove();
    }, 1500);

}


setInterval(() => {
    if (document.querySelector('.moneyPerSecond').style.display === 'flex') {
        moneyPerSecondFunction()
    } else {return}
}, 1000);

// setInterval(moneyPerSecondFunction, 999);

// бесконечный цикл на "монеты в секунду"

// ПЕРЕРОЖДЕНИЕ
var rebirthCost = 100000;
document.querySelector('.rebirthMenuButton').onclick = function rebirth() {
    if (money >= rebirthCost) {
        money = 0;
        document.getElementById('moneyCount').textContent = "Монет: " + money;
        upgrader = 0;
        maxRandomValueUpgrader = 0;
        minRandomValueUpgrader = 0;
        counterDecreaseUpgrader = 0;

        moneyPerSecond = 0;
        document.querySelector('.moneyPerSecond').style.display = 'none'
        document.querySelector('#moneyPerSecondID').textContent = "Монет в секунду: " + moneyPerSecond;

        cost1StartPrice = cost1StartPrice + 50 + (rebirthCount * 65);
        cost1 = cost1StartPrice;
        document.querySelector('#upgradeButton1').textContent = cost1;
        cost2StartPrice = cost2StartPrice + 25 + (rebirthCount * 15);
        cost2 = cost2StartPrice;
        document.querySelector('#upgradeButton2').textContent = cost2;
        cost3StartPrice = cost3StartPrice + 40 + (rebirthCount * 45);
        cost3 = cost3StartPrice;
        document.querySelector('#upgradeButton3').textContent = cost3;
        cost4StartPrice = cost4StartPrice + 30 + (rebirthCount * 35);
        cost4 = cost4StartPrice;
        document.querySelector('#upgradeButton4').textContent = cost4;
        cost5StartPrice = cost5StartPrice + 100 + (rebirthCount * 55);
        cost5 = cost5StartPrice;
        document.querySelector('#upgradeButton5').textContent = cost5;

        upgradeCount1 = 0;
        document.querySelector('#spanForUpgradeCount1').textContent = `${upgradeCount1}/10`;
        upgradeCount2 = 0;
        document.querySelector('#spanForUpgradeCount2').textContent = `${upgradeCount2}/20`;
        upgradeCount3 = 0;
        document.querySelector('#spanForUpgradeCount3').textContent = `${upgradeCount3}/15`;
        upgradeCount4 = 0;
        document.querySelector('#spanForUpgradeCount4').textContent = `${upgradeCount4}/27`;
        upgradeCount5 = 0;
        document.querySelector('#spanForUpgradeCount5').textContent = `${upgradeCount5}/20`;

        let rebirthMaxMoneyUpgrader = 20 + Math.floor((rebirthCount * 1.7) + rebirthCount * 6);
        let rebirthMinMoneyUpgrader = 10 + Math.floor((rebirthCount * 1.4) + rebirthCount * 4);
        rebirthMoneyUpgrader = rebirthMoneyUpgrader + (randomNumber(rebirthMinMoneyUpgrader, rebirthMaxMoneyUpgrader)/100);
        document.querySelector('#rebirthMoneyUpgraderSpan').textContent = `Бонус к получаемым монетам: +${Math.round((rebirthMoneyUpgrader - 1) * 100 )}%`;
         
        let rebirthMaxTokens = 7 + Math.floor(rebirthCount * 1.7);
        let rebirthMinTokens = 1 + Math.floor(rebirthCount * 1.4);
        rebirthTokens = rebirthTokens + randomNumber(rebirthMinTokens, rebirthMaxTokens)
        document.querySelector('#rebirthTokensSpan').textContent = ':' + rebirthTokens;
        rebirthCount = rebirthCount + 1;
        rebirthCost = Math.round(((rebirthCost * 1.5) + 10000) / 5) * 5;
        document.querySelector('#rebirthCostSpan').textContent = 'Стоимость: ' + rebirthCost;
    } else {alert('Недостаточно монет')}
}

// смена цвета кнопки перерождения
setInterval(() => {
    if (money < rebirthCost) {
        document.querySelector('.rebirthMenuButton').style.backgroundColor = '#928080'
    } else if (money >= rebirthCost) {
        document.querySelector('.rebirthMenuButton').style.backgroundColor = '#2cad5d'
    } else return
}, 500);
// смена цвета кнопки перерождения

// ПЕРЕРОЖДЕНИЕ



// for princess
var achievementUsed1 = 0
var achievementUsed2 = 0
var achievementUsed3 = 0
var achievementUsed4 = 0
var achievementUsed5 = 0
var achievementUsed6 = 0
var achievementUsed7 = 0
var achievementUsed8 = 0
var achievementUsed9 = 0
var achievementUsed10 = 0
var achievementUsed11 = 0
var achievementUsed12 = 0
var achievementUsed13 = 0
var achievementUsed14 = 0
var achievementUsed15 = 0
var achievementUsed16 = 0
setInterval(() => {
    if (totalMoneyReceived >= 50 && achievementUsed1 != 1) {
        alert('умница моя, радость ты моя, ты накопила 50(5 = 3+2(3.02)) монеток и правда нажимаешь кнопочку в моей игре... спасибо тебе большое... мне так важна твоя поддержка, чудо ты мое)) это издание для тебя. моя первооткрывательница))');
        achievementUsed1 += 1;
    }else if (totalMoneyReceived >= 150 && achievementUsed2 != 1) {
        alert('спасибо тебе... большое спасибо тебе, что ты у меня есть.. несмотря на все трудности, мы все равно ВМЕСТЕ выходим из них победившими! да, мы справимся и справляемся со всем, что жизнь нам преподносит! и я... горжусь нами.. ведь мы правда молодцы! спасибо, что ты до сих пор со мной на этом пути) с праздником нас, а в данном случае именно тебя, потому что ты читаешь это)) с 7ми-месячной годовщиной!))) нам каждый месяц важен. мы любим нас)))');
        achievementUsed2 += 1;
    }  else if (totalMoneyReceived >= 256 && achievementUsed13 != 1) {
        alert('любимая моя ляля лапочка');
        achievementUsed13 += 1;
    } else if (totalMoneyReceived >= 302 && achievementUsed3 != 1) {
        alert('ты очень открыта передо мной... и я безумно это ценю.. ты ждешь нашей встречи как никто, потому что нет никого, с кем такое уникальное создание как ты может сравниться. но мы не сравниваем, это так, лирическое отступление и ффакт(я чихнул на этом моменте, это значит, что это неоспоримый факт-факт(ффакт)(пока я писал это я чихнул во второй раз, тут сомнений и случайностей быть не может))... ждешь нашей встречи как никто.. с теплом обнимаешь мою руку, когда мы идем вместе, просто с душой любишь... спасибо.. машенька)');
        achievementUsed3 += 1;
    } else if (totalMoneyReceived >= 405 && achievementUsed12 != 1) {
        alert('милый купидончик');
        achievementUsed12 += 1;
    } else if (totalMoneyReceived >= 532 && achievementUsed4 != 1) {
        alert('китик, спасибо, что во многом мне составляешь компанию, бежишь ко мне, когда я предлагаю встретиться... запрыгиваешь на меня, обнимаешь, сотни раз целуешь на дню...... спасибо, коттттттттттттттенок! ты просто ну ...... маленькая[спорти, принцессочка] моя радость) огроооооомная[единица измерения] радость моя))');
        achievementUsed4 += 1;
    } else if (totalMoneyReceived >= 605 && achievementUsed11 != 1) {
        alert('повелительница стихий любви');
        achievementUsed11 += 1;
    } else if (totalMoneyReceived >= 750 && achievementUsed5 != 1) {
        alert('машенькинс, спасибо, что ты терпеливо, бережно и страстно веришь в меня каждый день! спасибо, что даешь слова благодарности, слова ценности и просто комплименты! никто в жизни мне не давал столько теплых слов, сколько ты дала за 7 месяцев. ');
        achievementUsed5 += 1;
    } else if (totalMoneyReceived >= 800 && achievementUsed10 != 1) {
        alert('хранительница сердца');
        achievementUsed10 += 1;
    } else if (totalMoneyReceived >= 1032 && achievementUsed6 != 1) {
        alert('лучик света мой любимыый, ну вот спасибо тебе, что ты просто сейчас сидишь и даже проходишь как-то мою игру небольшую пхапх, ну ты чудо! спасибо тебе просто, что дошла до этого момента. спасибо, что всегда остаешься рядом со мной, несмотря ни на что. я ценю, что ты видишь со мной будущее) плечом к плечу, несмотря ни на что, но справимся со всем! и отдельное спасибо тебе за каждый моментик лета и за каждый домашний моментик, и за каждый моментик со мной, и за каждую улыбочку твою... это ведь так ценно так ценноооооооооооооооооооо.');
        achievementUsed6 += 1;
    } else if (totalMoneyReceived >= 1101 && achievementUsed14 != 1) {
        alert('мой любимый чупчупс и моя сладость и конфетка ! ');
        achievementUsed14 += 1;
    } else if (totalMoneyReceived >= 1150 && achievementUsed7 != 1) {
        alert('спасибо, что готовишь мне подарки, интересуешься моими предпочтениями и даже еду готовишь так, чтоб я кушал.. это ценно, малыш! а еще ценно то, что ты с каждым месяцем больше заботишься о себе и своем здоровье, правильнее и осознаннее питаешься, осознаешь свои необходимые цели для спортзала)) а я всегда рядом в эти моменты и рад быть рядом и рад помогать! мой свет любимый)');
        achievementUsed7 += 1;
    } else if (totalMoneyReceived >= 1250 && achievementUsed15 != 1) {
        alert('с_ксYал.н0-горячее мое сокровище 0_0 0_0 0_0 0_0 0_0');
        achievementUsed15 += 1;
    } else if (totalMoneyReceived >= 1532 && achievementUsed8 != 1) {
        alert('мы желаем нам счастья. и мы его постигнем, ведь желанье таково! спасибо, я правда очень ценю, что мы желаем друг другу лучшего. мне приятно слышать, что ты хочешь для нас лучшего, желаешь счастья и спокойствия только и, когда мне плохо, переживаешь о моем состоянии и всегда готова помочь.. спасибо тебе, солнышко) а еще меня так радует твое отношение к маленьким жужикам, ну просто восхищение)) я как посмотрю на твое личико, когда ты видишь хорошего малыша... я в улет) просто))');
        achievementUsed8 += 1;
    } else if (totalMoneyReceived >= 1673 && achievementUsed16 != 1) {
        alert('чудо, воссозданное из материала, дороже золота и платины, ведь все части ее тела - дар волшебный, чем она может удивить и восхитить.');
        achievementUsed16 += 1;
    }  else if (totalMoneyReceived >= 2032 && achievementUsed9 != 1) {
        alert('я ценю, что ты есть в моей жизни. рад проживать совместно с тобой разные моменты. рад проживать горести и приятные эмоции, проживать падения и взлеты) мы живем, живем в мире. и я рад жить в этом мире в эту эпоху с тобой.');
        achievementUsed9 += 1;
    } else if (totalMoneyReceived >= 2500 && achievementUsed10 != 1) {
        alert('танцуй, где тебе хочется, и ничего не бойся. не бойся светить, ведь свет отгонит тьму! пой песенки и подпевай вслух, когда требует душа. будь счастлива, радость ты моя))) спасибо, что дошла до этого момента.');
        achievementUsed10 += 1;
    } else return
}, 500);
// for princess
