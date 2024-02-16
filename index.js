console.log('work')


var send = document.querySelector(".send-btn"),
    textarea = document.querySelector(".textarea"),
    sendContainer = document.querySelector(".input-action"),
    commentNameInput = document.querySelector(".comment-name-input");
const key = `commentOn${window.location.pathname}`;
let inputBlock = document.querySelector(".form__sand");
let adminText = document.querySelector(".comment__admin");
let comment = document.querySelector(".comment-appear");

adminText.style.display = "none";
comment.style.display = "none";

// Работа кнопок 'лайк'
if (sendContainer) {
    function likeCount() {
        var like = document.querySelectorAll(".like");
        var likeCountOutput = document.querySelectorAll(".like-count");
        [].forEach.call(like, function (item, i) {
            item.onclick = function () {
                if (item.classList.contains("liked")) {
                    item.classList.remove("liked");
                    item.style.fontWeight = "normal";
                    --likeCountOutput[i].innerHTML;
                    likeCountOutput[i].classList.remove("like-count-liked");
                    likeCountOutput[i].classList.add("like-count-unliked");
                } else {
                    item.classList.add("liked");
                    item.style.fontWeight = "bold";
                    ++likeCountOutput[i].innerHTML;
                    likeCountOutput[i].classList.add("like-count-liked");
                    likeCountOutput[i].classList.remove("like-count-unliked");
                }
            };
        });
    }
    likeCount();

    // Если JS не загрузится, то кнопка отправки комментария будет доступна по-умолчанию
    sendContainer.classList.remove("input-action-focus");
    // И ширина инпута тоже будет больше
    textarea.classList.remove("textarea-focus");

    // При фокусировке на поле ввода появляется кнопка отправления комментария, а также увеличивается высота поля ввода
    textarea.addEventListener("focus", function (event) {
        sendContainer.classList.add("input-action-focus");
        textarea.classList.add("textarea-focus");
    });

    // При потере фокуса поле ввода схлопнется, если оно пустое
    textarea.addEventListener("blur", function () {
        if (!textarea.value) {
            textarea.classList.remove("textarea-focus");
        } else {
            return false;
        }
    });

    // Добавление коммента и проверка заполненности полей
    send.addEventListener("click", function (event) {
        if (!textarea.value) {
            alert("WRITE YOUR COMMENT!");
            send.disabled = true;
        } else {
            var allComments = document.querySelectorAll(".comments-item");
            var newComment = document.createElement("div");
            newComment.classList.add("comments-item");
            newComment.classList.add("comment-appear");
            newComment.innerHTML = allComments[0].innerHTML;
            newComment.querySelector(".comment-username").innerHTML =
                textarea.value;
            newComment
                .querySelector(".like-count")
                .classList.remove("like-count-liked");
            newComment.querySelector(".like").classList.remove("liked");
            newComment.querySelector(".like").style.fontWeight = "normal";
            newComment.querySelector(".like-count").innerHTML = 0;
            newComment.querySelector(".comment-date").innerHTML = "";
            // вставляем данные в новый коммент, если есть инпут имени
            if (commentNameInput) {
                newComment.querySelector(".comment-text").innerHTML =
                    '<span class="comment-username">' +
                    commentNameInput.value +
                    "</span>" +
                    textarea.value;
                let q1 = commentNameInput.value;
                let q2 = textarea.value;
                localStorage.setItem("user", q1);
                localStorage.setItem("text", q2);
                textarea.value = "";
                commentNameInput.value = "";
                document
                    .querySelector(".comments")
                    .insertBefore(newComment, document.querySelector("#asd"));
                likeCount();
            } else {
                alert("Your comment is sent for moderation!");
                textarea.value = "";
            }
        }
    });
}

if (!localStorage.getItem(key)) {
    send.addEventListener("click", (e) => {
        e.preventDefault();
        window.localStorage.setItem(key, "true");

        inputBlock.style.display = "none";
        adminText.style.display = "block";
    });
} else {
    inputBlock.style.display = "none";
    adminText.style.display = "block";
    comment.style.display = "block";

    let commentUserName2 = localStorage.getItem("user");
    document.getElementById("username").innerHTML = commentUserName2;

    let commentUserText2 = localStorage.getItem("text");
    document.getElementById("usercomment").innerHTML = commentUserText2;
}

window.onload = function () {
    // Главная дата - нужно добавить класс элементу .mv_mdate
    var mv_mdate = document.getElementsByClassName("mv_mdate");
    var mv_now = Date.now(),
        mv_one_month = 1000 * 60 * 60 * 24 * 10;
    if (mv_mdate) {
        for (i = 0; i < mv_mdate.length; i++) {
            mv_mdate[i].innerHTML = new Date(
                mv_now - mv_one_month
            ).toLocaleDateString();
        }
    }

    // Дата сегодня- нужно добавить класс элементу .mv_tdate
    var mv_tdate = document.getElementsByClassName("mv_tdate");
    if (mv_tdate) {
        for (i = 0; i < mv_tdate.length; i++) {
            mv_tdate[i].innerHTML = new Date(mv_now).toLocaleDateString();
        }
    }

    // Даты для комментов - нужно элементам где должна быть дата добавить класс .mv_rdate
    var mv_rdate = document.getElementsByClassName("mv_rdate");
    if (mv_rdate) {
        for (i = 0; i < mv_rdate.length; i++) {
            let now = Date.now();
            let one_month = 1000 * 60 * 60 * 24 * (i + 2) * 0.3;
            let new_rdate = new Date(now - one_month).toLocaleDateString();
            let y = mv_rdate.length - i - 1;
            mv_rdate[y].innerHTML = new_rdate;
        }
    }

    // Даты для комментов - нужно элементам где должна быть дата добавить класс .mv_rtdate
    var mv_rtdate = document.getElementsByClassName("mv_rtdate");
    if (mv_rtdate) {
        for (i = 0; i < mv_rtdate.length; i++) {
            let now = Date.now();
            let one_month = 1000 * 60 * 60 * 24 * (i + 2) * 0.3;
            let new_rtdate = new Date(now - one_month).toLocaleDateString();
            let new_rtdateH =
                new Date(now - one_month).getHours() >= 10
                    ? new Date(now - one_month).getHours()
                    : "0" + new Date(now - one_month).getHours();
            let new_rtdateM =
                new Date(now - one_month).getMinutes() >= 10
                    ? new Date(now - one_month).getMinutes()
                    : "0" + new Date(now - one_month).getMinutes();
            let new_rtdateT = new_rtdateH + ":" + new_rtdateM;
            let y = mv_rtdate.length - i - 1;
            mv_rtdate[y].innerHTML = new_rtdate + " " + new_rtdateT;
        }
    }

    // Текущий год - нужно добавить класс элементу .mv_tyear
    var mv_tyear = document.getElementsByClassName("mv_tyear");
    if (mv_tyear) {
        for (i = 0; i < mv_tyear.length; i++) {
            mv_tyear[i].innerHTML = new Date().getFullYear();
        }
    }
};


// Создание функции для генерации случайного имени пользователя
function generateRandomName() {
    // Список возможных имен пользователя
    var names = ["Алексей", "Мария", "Иван", "Анна", "Владимир", "Елена", "Дмитрий", "Наталья", "Сергей", "Ольга"];

    // Генерация случайного индекса из списка имен пользователя
    var randomIndex = Math.floor(Math.random() * names.length);

    // Возврат случайного имени пользователя
    return names[randomIndex];
}
function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}




let isPopupShown = false;

window.addEventListener('scroll', function() {
    let orderForm = document.querySelector('.order-form-wrapper');
    let windowBottom = window.innerHeight + window.pageYOffset;

    if (!isPopupShown && windowBottom > orderForm.offsetTop) {
        showPopup();
        isPopupShown = true;
    }
});

function showPopup() {
    let popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `Пользователь ${generateRandomName()} только что заказал ${getRandomNumber()} шт.`;

    let closeButton = document.createElement("button");
    closeButton.className = "close";
    closeButton.innerHTML = "X";

    popup.appendChild(closeButton);
    document.body.appendChild(popup);

    closeButton.addEventListener("click", function () {
        document.body.removeChild(popup);
    });
}