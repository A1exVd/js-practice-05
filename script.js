
/*
    Валидаторы
*/
function validate(input, ...validators) {
    for (let validator of validators) {
        const errorMessage = validator(input.value);
        if(errorMessage) return errorMessage;
    }
}

const lengthValidator = (inputValue) => {
    return inputValue.length > 100 && "Ошибка: Значение поля не может быть более 100 символов!!!";
}

const checkEmptinessValidator = (inputValue) => !inputValue.length && "Ошибка: Значение поля не может быть пустым!!!";


function checkNumberValidator(inputValue) {
    if (isNaN(inputValue) || inputValue <= 0) {
        return "❌ Введите корректное число секунд!"
    }
}

// ---------------------------------------------------------------------------------------------




// Задание 1: Секундомер
const swDisplay = document.getElementById('stopwatch-display');
const swStartBtn = document.getElementById('sw-start');
const swStopBtn = document.getElementById('sw-stop');
const swResetBtn = document.getElementById('sw-reset');

let seconds = 0;
let intervalId = null;

function updateSwDisplay() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    swDisplay.textContent = `
        ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")};
    `
}

const handleSwStart = () => {
    if(intervalId !== null) return;
    // Использую setInterval для изменения значения секундомера кажду секунду.
    intervalId = setInterval(() => {
        seconds++;
        updateSwDisplay();
    }, 1000);
}

const handleSwStop = () => {
    // прекращаем работу setInterval при остановке
    clearInterval(intervalId);
    intervalId = null;
}

const handleSwReset = () => {
    // прекращаем работу setInterval при сбросе
    clearInterval(intervalId);
    intervalId = null;
    seconds = 0;
    updateSwDisplay();    
}

swStartBtn.addEventListener("click", handleSwStart);
swStopBtn.addEventListener("click", handleSwStop);
swResetBtn.addEventListener("click", handleSwReset);








// Задание 2: Обратный отсчёт
const cdInput = document.getElementById('countdown-seconds');
const cdStartBtn = document.getElementById('cd-start');
const cdStopBtn = document.getElementById('cd-stop');
const cdResetBtn = document.getElementById('cd-reset')
const cdDisplay = document.getElementById('countdown-display');

// TODO: Объявить переменные для таймера обратного отсчёта
let timeLeft = 0;
let countDownId = null;

const handleCdStart = () => {
    const cdValue = parseInt(cdInput.value, 10);
    cdDisplay.classList.remove("error");

    const errorMessage = validate(cdInput, checkNumberValidator);

    if(errorMessage) {
        cdDisplay.textContent = errorMessage;
        cdDisplay.classList.add("error");
        return;
    } 

    if(countDownId !== null) return;

    if(!timeLeft) {
        timeLeft = cdValue;
    }
    // Использую setInterval для уменьшения значения переменной timeLeft кажжую секунду
    countDownId = setInterval(() => {
        updateCdDisplay();
        timeLeft--;

        if(timeLeft < 0) {
            // Очищаем setInterval, если значение меньше 0
            clearInterval(countDownId);
            countDownId = null;
            cdDisplay.textContent = "Время вышло!";
        }
    }, 1000)

}

const handleCdStop = () => {
    // прекращаем работу setInterval при остановке
    clearInterval(countDownId);
    countDownId = null;
}

const handleCdReset = () => {
    // прекращаем работу setInterval при сбросе
    clearInterval(countDownId);
    countDownId = null;

    // устанавливаем дефолтные значения для обратного счетчика
    cdInput.value = 10;
    timeLeft = 0;
    cdDisplay.classList.remove("error");
    cdDisplay.textContent = "—";
}

function updateCdDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    cdDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

cdStartBtn.addEventListener("click", handleCdStart);
cdStopBtn.addEventListener("click", handleCdStop);
cdResetBtn.addEventListener("click", handleCdReset);








// Задание 3: Уведомление с задержкой (JUNIOR)


const showNotifictationBtn = document.getElementById("notification-show");
const persistNotificationBtn = document.getElementById("notification-persist");
let notificationTimerId;

const handleShowNotification = () => {
    const notificationInput = document.getElementById("notification");
    const notificationResult = document.getElementById("notification-result");
    notificationResult.classList.remove("show");
    notificationResult.classList.remove("persist");
    notificationResult.classList.remove("notification-error");

    const errorMessage = validate(
        notificationInput,
        checkEmptinessValidator,
        lengthValidator
    )
    
    if(errorMessage) {
        notificationResult.textContent = errorMessage;
        notificationResult.classList.add("notification-error");
        return;
    }

    notificationResult.textContent = notificationInput.value;
    notificationResult.classList.add("show");

    // используем setTimeout для удаления уведомления через 5 с.
    notificationTimerId = setTimeout(() => {
        notificationResult.classList.remove("show");
    }, 5000)

}


showNotifictationBtn.addEventListener("click", handleShowNotification);

const handlePersistNotification = () => {
    const notificationResult = document.getElementById("notification-result");
    // используем для отмены выполнения колбэка в setTimeout. Из-за чего всплывающее
    // сообщение остается.
    clearTimeout(notificationTimerId);
    notificationResult.classList.add("persist");
    
}

persistNotificationBtn.addEventListener("click", handlePersistNotification);








// Задание 4: Информация о браузере (BOM)

const infoBtn = document.getElementById("browser-info-btn");
const infoBlock = document.getElementById("browser-info");

const handleShowInfo = () => {
    const isMobile = /Android|iPhone|Ipad|Ipod/i.test(navigator.userAgent);
    const deviceType = isMobile ? " Мобильное устройство" : " Десктоп";
    const onlineStatus = navigator.onLine ? "Онлайн" : "Офлайн";

    const info = `
        <ul>
            <li><strong>URL: </strong>${location.href}</li>
            <li><strong>Протокол: </strong>${location.protocol}</li>
            <li><strong>Домен: </strong>${location.hostname}</li>
            <li><strong>Путь: </strong>${location.pathname}</li>
            <li><strong>Язык: </strong>${navigator.language}</li>
            <li><strong>User Agent: </strong>${navigator.userAgent.substring(0, 100)}...</li>
            <li><strong>Статус: </strong>${onlineStatus}</li>
            <li><strong>Разрешение экрана: </strong>${screen.width} x ${screen.height}</li>
            <li><strong>Размер окна: </strong>${window.innerWidth} x ${window.innerHeight}</li>
            <li><strong>Устройство: </strong>${deviceType}</li>
        </ul>
    `;

    infoBlock.innerHTML = info;
}

infoBtn.addEventListener("click", handleShowInfo);







// Задание 5 — Автосохранение формы (PRO)

const textarea = document.getElementById("autosave-textarea");
const indicator = document.getElementById("autosave-indicator");
const toggleBtn = document.getElementById("autosave-toggle");
const clearBtn = document.getElementById("autosave-clear");
let saveIntervalId = null;


const handleLoad = () => {
    const draft = loadFromLocalStorage("draft");
    startAutoSave();
    if(!draft) return;

    textarea.value = draft.text;
}

const handleToggleAutoSave = () => {
    if(saveIntervalId === null) {
        startAutoSave();
    } else {
        stopAutoSave();
    }
}

const handleClear = () => {
    textarea.value = "";
    indicator.textContent = ""
    removeFromLocalStorage("draft");
    stopAutoSave();
}

// Принимает на вход инпут, сохраняем значение поля и время в localStorage
function saveToLocalStorage(input, key) {
    const text = input.value.trim();
    if(text === "") return;
    const timestamp = new Date().toLocaleTimeString("ru-Ru");

    const objToSave = {
        text, 
        timestamp
    };

    localStorage.setItem(key, JSON.stringify(objToSave));

    return objToSave;
}

// Возвращает из localStorage значение ключа
function loadFromLocalStorage(key) {
    try {
        const loadObj = localStorage.getItem(key);

        if(!loadObj) return;

        return JSON.parse(loadObj);
    } catch (error) {
        return error;
    }
}

function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}


function startAutoSave() {
    // используем setInterval для сохранения в localStorage каждые 5 сек.
    saveIntervalId = setInterval(() => {
        const savedObj = saveToLocalStorage(textarea, 'draft');
        if(!savedObj) return;

        indicator.textContent = `Последнее сохранение: ${savedObj.timestamp}`;
    }, 5000);

    toggleBtn.textContent ="Остановить автосохранение";
} 

function stopAutoSave() {
    // прекращаем действие setInterval для остановки автосохранения
    clearInterval(saveIntervalId);
    saveIntervalId = null;
    toggleBtn.textContent = "Возобновить автосохранение";
}

window.addEventListener("load", handleLoad);
clearBtn.addEventListener("click", handleClear);
toggleBtn.addEventListener("click", handleToggleAutoSave);








// Задание 6 — Pomodoro-таймер (PRO)


const pomodoroStartBtn = document.getElementById("pomodoro-start");
const pomodoroBreakBtn = document.getElementById("pomodoro-break");
const pomodoroPauseBtn = document.getElementById("pomodoro-pause");
const pomodoroResetBtn = document.getElementById("pomodoro-reset");
const pomodoroDisplay = document.getElementById("pomodoro-cd-display");

const workCdInput = document.getElementById("work-seconds");
const breakCdInput = document.getElementById("break-seconds");


let pomodoroCount = 0; // увеличивает при истечении рабочего времени
let period; // WORK или BREAK
let isRunning = false; // если счетчик запущен, то true
let pomodoroTimeLeft = 0; // оставшееся время обратного счетчика
let cdStartTime = 0; 
let pomodoroCountDownId;

const clearHistoryBtn = document.getElementById("clear-history");
const showHistoryBtn = document.getElementById("show-history");
const historyOutput = document.getElementById("history-output");

const pomodoroAlert = document.getElementById("pomodoro-alert-container");
const pomodoroAlertBtn = document.getElementById("pomodoro-alert-btn");

const beep = document.getElementById("beep");

/*
    Общий обработчик событий для двух кнопок pomodoroStartBtn и pomodoroBreakBtn
    Если кнопка на которой вызвали обработчик pomodoroStartBtn - запускаем таймер работы
    После запуска работы переключение на таймер перерыва с помощью кнопки возможно
    только после сброса. 
*/
const handleStartCd = (btn) => {
    const btnId = btn.getAttribute('id');

    // Присваиваем инпут в зависимости от типа кнопки. 
    const cdInput = btnId === "pomodoro-start" ? workCdInput : breakCdInput;

    // Проверяем если период рабочий, то мы не можем переключаться на перерыв и наоборот;
    if(period === "WORK" && btnId === "pomodoro-break") return;
    if(period === "BREAK" && btnId === "pomodoro-start") return;

    // Early return если таймер уже запущен.
    if(isRunning) return;
    
    isRunning = true;

    period = btnId === "pomodoro-start" ? "WORK" : "BREAK";


    const cdInputValue = parseInt(cdInput.value, 10);
    pomodoroDisplay.classList.remove("error");
    
    // Валидируем инпут
    const errorMessage = validate(cdInput, checkNumberValidator);

    if(errorMessage) {
        pomodoroDisplay.textContent = errorMessage;
        pomodoroDisplay.classList.add("error");
        return;
    } 
    // Проверяем, если pomodoroTimeLeft falsy, то присваем значения поля ввода
    if(!pomodoroTimeLeft) {
        cdStartTime = cdInputValue;
        pomodoroTimeLeft = cdInputValue;
    }
    
    // Используем setInterval для уменьшения обратного счетчика
    // Добавляем сюда progresBar для отображения шкалы оставшегося времени
    // saveCurrentSession для сохранения текущего состояния и времени счетчика в localStorage
    // saveSessionHistory для сохранения истории в localStorage
    // updatePomodorDisplay обновляет значение дисплея
    // beep.play() добавляем звук.
    pomodoroCountDownId = setInterval(() => {
        updatePomodoroDisplay(period);
        pomodoroTimeLeft--;
        
        saveCurrentSession(pomodoroTimeLeft, period, isRunning, cdInputValue, pomodoroCount);

        progressBar("pomodoro-progress", pomodoroTimeLeft, cdInputValue);

        if(pomodoroTimeLeft < 0) {
            clearInterval(pomodoroCountDownId);
            beep.play();
            console.log("beep")
            if (period === "WORK") {
                showAlert("⏰ Время на перерыв!");
                saveSessionHistory(cdInputValue);
                pomodoroCount++;
            } else {
                showAlert("⏰ Хватит отдыхать! Пора работать!");
            }
        }
    }, 1000)
}

const handleStopCd = () => {
    if(!isRunning) return;
    // Останавливаем обратный счетчик, сохраняем текущее состояние и время в localStorage
    clearInterval(pomodoroCountDownId);
    pomodoroCountDownId = null;
    isRunning = false;

    saveCurrentSession(pomodoroTimeLeft, period, isRunning, cdStartTime, pomodoroCount);
}

const handleResetCd = () => {
    clearInterval(pomodoroCountDownId);
    pomodoroCountDownId = null;

    // устанавливаем дефолтные значения для обратного счетчика
    isRunning = false;
    pomodoroTimeLeft = 0;
    period = null;
    pomodoroDisplay.classList.remove("error");
    pomodoroDisplay.textContent = "—";
    progressBar("pomodoro-progress", 0, cdStartTime);
    deleteCurrentSession();
    


}


/// Добавление истории

const handleShowHistory = () => {
    const history = loadFromLocalStorage("pomodoroHistory");
    if(!history) {
        historyOutput.innerHTML = "История пуста!"
        return
    }

    const historyList = history.reduce((acc, historyItem) => {
        return (acc + `<li>
            Дата: ${historyItem.date} Время: ${historyItem.time} Длительность: ${historyItem.duration}
        </li>`);
    }, "");
    historyOutput.innerHTML = historyList;
    historyOutput.previousSibling.textContent = `Количество сессий: ${pomodoroCount}`;
}

const handleDeleteHistory = () => {
    localStorage.removeItem("pomodoroHistory");

    historyOutput.innerHTML = '';
}



function saveSessionHistory(duration) {
    const newSession = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        duration
    }

    const sessionArr = loadFromLocalStorage("pomodoroHistory");
    
    if(!sessionArr) {
        const newSessionArr = [];
        newSessionArr.push(newSession);
        localStorage.setItem("pomodoroHistory", JSON.stringify(newSessionArr));
        return;
    }

    sessionArr.push(newSession);
    localStorage.setItem("pomodoroHistory", JSON.stringify(sessionArr));
}


showHistoryBtn.addEventListener("click", handleShowHistory);
clearHistoryBtn.addEventListener("click", handleDeleteHistory);

//-------------------------------------------------------------------------




// Всплывающее сообщение

function showAlert(message) {
    pomodoroAlert.style.display = 'block';
    const messageText = document.getElementById("pomodoro-alert-text");
    messageText.textContent = message;

}

function hideAlert() {
    pomodoroAlert.style.display = "none";
}

pomodoroAlertBtn.addEventListener("click", hideAlert);
pomodoroAlertBtn.addEventListener("click", () => {
    if(period === "WORK") {
        handleResetCd();
        handleStartCd(pomodoroBreakBtn)
    } else {
        handleResetCd();
        handleStartCd(pomodoroStartBtn)
    }


})

//-------------------------------------------------------------------------

// Сохранение и загрузка значений таймера

const handleloadCurrentSession = () => {
    const session = loadFromLocalStorage("pomodoroCurrent");
    if(!session) return;

    pomodoroTimeLeft = session.pomodoroTimeLeft;
    period = session.period;
    let wasRunning = session.isRunning;
    pomodoroCount = session.pomodoroCount;
    
    if (period === "WORK") {
        workCdInput.value = session.cdTotalTime;
    } else {
        breakCdInput.value = session.cdTotalTime;
    }

    // Если таймер был запущен, вызываем обработчик событий при загрузке страницы и
    // передаем соответствующую кнопку в качестве аргумента. Если остановлен - обновляем дисплей
    if(wasRunning) {
        const btn = period === "WORK" ? pomodoroStartBtn : pomodoroBreakBtn;
        isRunning = false;
        handleStartCd(btn);
    } {
        updatePomodoroDisplay(period);
    }
}

function saveCurrentSession(pomodoroTimeLeft, period, isRunning, cdTotalTime) {
    const session = {
        pomodoroTimeLeft,
        period,
        isRunning,
        cdTotalTime,
        pomodoroCount
    }

    localStorage.setItem("pomodoroCurrent", JSON.stringify(session));
}

function deleteCurrentSession() {
    localStorage.removeItem("pomodoroCurrent");
}

window.addEventListener("load", handleloadCurrentSession)

//--------------------------------------------------------------------


// Обновление дисплея

function updatePomodoroDisplay(period) {
    const minutes = Math.floor(pomodoroTimeLeft / 60);
    const seconds = pomodoroTimeLeft % 60;

    pomodoroDisplay.textContent = `${period} ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}


pomodoroStartBtn.addEventListener("click", (e) => handleStartCd(e.target));
pomodoroBreakBtn.addEventListener("click", (e) => handleStartCd(e.target))
pomodoroPauseBtn.addEventListener("click", handleStopCd);
pomodoroResetBtn.addEventListener("click", handleResetCd);

//---------------------------------------------------------------------

// Отключение и включение всех кнопок

function disableAllBtn(exceptionBtnArr) {
    const allBtns = document.getElementsByTagName("button");
    for(const btn of allBtns) {
        if(exceptionBtnArr.include(btn.getAttribute(id))) {
            continue;
        }
        btn.disabled = true;
    }
}

function enableAllBtn() {
    const allBtns = document.getElementsByTagName("button");
    for (const btn of allBtns) {
        btn.disabled = false;
    }
}

//-----------------------------------------------------------------------------


// Визуальный прогресс-бар 


function progressBar(progressElmId, currentProgress, max) {
    const progressElm = document.getElementById(progressElmId);
    progressElm.max = max;
    progressElm.value = currentProgress;
}

//-----------------------------------------------------------------------------



// Проверка активности пользователя 

function checkActivity() {
    let lastActivityId; 
    ["mousemove", "keypress"].forEach(activityEvent => {
        window.addEventListener(activityEvent, () => {
            clearTimeout(lastActivityId);
            const activityId = setTimeout(() => {
                console.log('notActive')
            }, 3000);
            lastActivityId = activityId;
        })
    })
}

//------------------------------------------------------------------------------
// checkActivity();


// Диалоговые окна

const alertBtn = document.getElementById("btn-alert");
const confirmBtn = document.getElementById("btn-confirm");
const promptBtn = document.getElementById("btn-prompt");
const dialogResult = document.getElementById("dialog-result");


const handleConfirm = () => {
    const confirmOkBtn = document.getElementById("confirm-ok-btn");
    const confirmCancelBtn = document.getElementById("confirm-cancel-btn");
    showDialog("dialog-confirm");
    confirmOkBtn.addEventListener("click", () => {
        dialogResult.textContent = "Результат: true";
        hideDialog("dialog-confirm");
    })
    confirmCancelBtn.addEventListener("click",() => {
        dialogResult.textContent = "Результат: false";
        hideDialog("dialog-confirm");
    })
}

const handlePrompt = () => {
    const promptOkBtn = document.getElementById("prompt-ok-btn");
    const promptCancelBtn = document.getElementById("prompt-cancel-btn");
    const promptInput = document.getElementById("prompt-input");
    showDialog("dialog-prompt");
    promptOkBtn.addEventListener("click", () => {
        dialogResult.textContent = `Результат: ${promptInput.value}`
        hideDialog("dialog-prompt");
    })
    promptCancelBtn.addEventListener("click", () => {
        dialogResult.textContent = "Результат: null";
        hideDialog("dialog-prompt");
    })
}

const handleAlert = () => {
    const simpleAlertBtn = document.getElementById("simple-alert-btn");
    showDialog('dialog-alert');
    simpleAlertBtn.addEventListener("click", () => {
        dialogResult.textContent = "Простой аллерт показан";
        hideDialog('dialog-alert'); 
    })
}

confirmBtn.addEventListener("click", handleConfirm);
promptBtn.addEventListener("click", handlePrompt);
alertBtn.addEventListener("click", handleAlert);



function showDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    dialog.style.display = "block";
}

function hideDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    dialog.style.display = "none";
}

// ------------------------------------------------------------------------







// Смена темы
const themeButton = document.getElementById('theme-toggle');
const isEvening = new Date().getHours() > 18;
// Проверить наличие сохраненной темы в localStorage
// Если вечер то тема при обновлении страницы каждый раз будет темная
if(isEvening) {
   localStorage.setItem('theme', 'dark');
}

const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'dark') {
    document.documentElement.setAttribute("data-theme", "dark");
   themeButton.innerText = '☀️';
}

themeButton.addEventListener('click', function() {
   const currentTheme = document.documentElement.getAttribute("data-theme");
   
   if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem('theme', 'light');
        themeButton.innerText = '🌙'
   } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem('theme', 'dark');
        themeButton.innerText = '☀️';
   }
});