/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isWebp": () => (/* binding */ isWebp)
/* harmony export */ });
// проверка поддержки webp, добавление класса webp или no-webp
function isWebp() {
   //проверка поддержки webp
   function testWebP(callback) {

      var webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   //добавление класса
   testWebP(function (support) {
      if (support == true) {
         document.querySelector('body').classList.add('webp');
      } else {
         document.querySelector('body').classList.add('no-webp');
      }
   });
}


/*------------------------------Burger menu---------------------------*/
document.addEventListener("DOMContentLoaded", function () {
   const menuIcon = document.querySelector(".menu__icon");
   const menuBody = document.querySelector(".menu__body");
   const body = document.querySelector("body");
   const menuBodyClose = document.querySelector(".menu__body-close");

   if (menuIcon && menuBody) {
      // Открытие/закрытие меню по иконке
      menuIcon.addEventListener("click", function () {
         menuIcon.classList.toggle("active");
         menuBody.classList.toggle("active");
         body.classList.toggle("no-scroll");
      });

      // Закрытие меню при клике на ссылку внутри меню
      menuBody.addEventListener("click", function (event) {
         if (event.target.tagName === "A" || event.target.closest("a")) {
            menuIcon.classList.remove("active");
            menuBody.classList.remove("active");
            body.classList.remove("no-scroll");
         }
      });

      // Закрытие меню при клике на кнопку закрытия
      if (menuBodyClose) {
         menuBodyClose.addEventListener("click", function () {
            menuIcon.classList.remove("active");
            menuBody.classList.remove("active");
            body.classList.remove("no-scroll");
         });
      }

      // Закрытие меню при клике вне области меню
      document.addEventListener("click", function (event) {
         if (!menuBody.contains(event.target) && !menuIcon.contains(event.target)) {
            menuIcon.classList.remove("active");
            menuBody.classList.remove("active");
            body.classList.remove("no-scroll");
         }
      });
   }
});


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.isWebp();

document.addEventListener("DOMContentLoaded", function () {
   const sections = {
      app: document.getElementById("app"),
      loader: document.getElementById("loader"),
      instruction: document.getElementById("instruction"),
      game: document.getElementById("game"),
      order: document.getElementById("order"),
   };

   const body = document.querySelector('body');
   const questions = document.querySelectorAll(".test__question");
   const currentQuestionEl = document.getElementById("currentQuestion");
   const loaderListItems = document.querySelectorAll("#loaderList li");
   const instructionButton = document.querySelector(".instruction__button .button");
   const popup = document.getElementById("gamePopup");
   const tryAgainBtn = document.querySelector(".game__popup-button");
   const boxes = document.querySelectorAll(".box");

   let currentQuestion = 0;
   let clickCount = 0;
   let gameFinished = false;
   let lockClick = false;

   // Cookie
   function setCookie(name, value, days) {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${value}; expires=${expires}; path=/`;
   }

   function getCookie(name) {
      return decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1] || "");
   }

   // Animations
   function fadeIn(el) {
      el.classList.remove("fade-out");
      el.classList.add("fade-in");
      el.style.display = "block";
   }

   function fadeOut(el, callback = null) {
      el.classList.remove("fade-in");
      el.classList.add("fade-out");
      setTimeout(() => {
         el.style.display = "none";
         el.classList.remove("fade-out");
         if (callback) callback();
      }, 1000);
   }

   function transitionSection(from, to, callback = null) {
      fadeOut(from, () => {
         fadeIn(to);
         if (callback) callback();
      });
   }

   // Tests
   let timerStarted = false;

   function showNextQuestion() {
      fadeOut(questions[currentQuestion], () => {
         currentQuestion++;

         if (!timerStarted) {
            startTestTimer();
            timerStarted = true;
         }

         if (currentQuestion < questions.length) {
            fadeIn(questions[currentQuestion]);
            currentQuestionEl.textContent = currentQuestion + 1;
         } else {
            setCookie("surveyPassed", "true", 30);
            transitionSection(sections.app, sections.loader, startLoaderSequence);
         }
      });
   }


   // Loader animation
   function startLoaderSequence() {
      loaderListItems.forEach(item => item.style.opacity = "0");

      setTimeout(() => {
         loaderListItems[0].style.opacity = "1";
         loaderListItems[0].style.maxHeight = "200px";

         setTimeout(() => {
            loaderListItems[1].style.opacity = "1";
            loaderListItems[1].style.maxHeight = "200px";

            setTimeout(() => {
               loaderListItems[2].style.opacity = "1";
               loaderListItems[2].style.maxHeight = "200px";

               setTimeout(() => {
                  transitionSection(sections.loader, sections.game);
               }, 1000);
            }, 800);
         }, 1000);
      }, 2000);
   }

   // Instruction button
   instructionButton.addEventListener("click", () => {
      transitionSection(sections.instruction, sections.order);
   });

   // Game logic
   boxes.forEach(box => {
      box.addEventListener("click", () => {
         if (gameFinished || lockClick || box.classList.contains("opened")) return;
         clickCount++;
         lockClick = true;
         box.classList.add("opened");

         if (clickCount === 1) {
            setTimeout(() => {
               popup.classList.add("show");
            }, 1000);
         }

         if (clickCount === 2) {
            box.classList.add("win");
            gameFinished = true;

            setTimeout(() => {
               const prizeImage = document.querySelector(".game__prize-image");
               if (prizeImage) {
                  prizeImage.classList.add("show");
               };
               confetti({
                  particleCount: 300,
                  spread: 70,
                  origin: {
                     y: 0.6
                  },
                  zIndex: 99999,
               });
            }, 1000);

            setTimeout(() => {
               setCookie("gamePassed", "true", 30);
               transitionSection(sections.game, sections.instruction);
            }, 3000);
         }
      });
   });

   tryAgainBtn.addEventListener("click", () => {
      popup.classList.remove("show");
      lockClick = false;
   });

   // Инициализация секций
   Object.values(sections).forEach(section => section.style.display = "none");

   const surveyPassed = getCookie("surveyPassed") === "true";
   const gamePassed = getCookie("gamePassed") === "true";

   if (gamePassed) {
      fadeIn(sections.instruction);
   } else if (surveyPassed) {
      fadeIn(sections.game);
   } else {
      fadeIn(sections.app);

      questions.forEach((q, index) => {
         q.style.display = "none";
         if (index === 0) fadeIn(q);
         q.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", () => {
               showNextQuestion();
            });
         });
      });
   }
   updateSpotsLeft();
   body.classList.add('loaded');
});

//Spots left
function updateSpotsLeft() {
   const spotsEl = document.getElementById('spotsLeft');
   let currentSpots = parseInt(spotsEl.textContent);

   if (currentSpots <= 8) return;
   const delay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
   let decrement = Math.floor(Math.random() * (8 - 3 + 1)) + 3;

   if (currentSpots - decrement < 2) {
      decrement = currentSpots - 2;
   }

   setTimeout(() => {
      currentSpots -= decrement;
      spotsEl.textContent = currentSpots;
      if (currentSpots > 8) {
         updateSpotsLeft();
      }
   }, delay);
}


//date
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
   "January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
];

const now = new Date();

const dayName = days[now.getDay()];
const monthName = months[now.getMonth()];
const day = now.getDate();
const year = now.getFullYear();

// Обновляем содержимое элементов
document.getElementById("dayToday").textContent = dayName;
document.getElementById("dateToday").textContent = `${monthName} ${day}, ${year}`;

//Timer 
function startTestTimer() {
   const timer = document.querySelector(".test__timer");
   const minEl = document.getElementById("test__timer-hour");
   const secEl = document.getElementById("test__timer-seconds");

   let totalSeconds = 120;

   const interval = setInterval(() => {
      if (totalSeconds <= 0) {
         clearInterval(interval);
         return;
      }

      totalSeconds--;

      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      minEl.textContent = minutes;
      secEl.textContent = seconds < 10 ? "0" + seconds : seconds;
   }, 1000);
   timer.style.color = 'red';
}

//Validation phone number
document.querySelectorAll('.tel-input').forEach(input => {
   const phoneArea = input.closest('.phone-area');

   input.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '');
      const digits = this.value;
      const min = 8;
      const max = 15;
      const isValid = digits.length >= min && digits.length <= max;

      this.setCustomValidity(isValid ? '' : `Phone number must be ${min}-${max} digits`);

      phoneArea.classList.toggle('valid', isValid);
      phoneArea.classList.toggle('invalid', !isValid);
   });

   input.addEventListener('keypress', function (event) {
      const char = String.fromCharCode(event.charCode);
      if (!/\d/.test(char)) {
         event.preventDefault();
      }
   });
});


})();

/******/ })()
;