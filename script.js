// ===== 1. Меню на телефоне =====
var header = document.querySelector(".header");
var burger = document.querySelector(".burger");

if (burger) {
  burger.onclick = function () {
    header.classList.toggle("open");
  };
}

// ===== 2. Каталог: фильтр и сортировка =====
var cardsBox = document.getElementById("cards");

if (cardsBox) {
  var cards = Array.from(cardsBox.children);
  var buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach(function (btn) {
    btn.onclick = function () {
      // подсветка активной кнопки
      buttons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      var mode = btn.dataset.mode;

      if (mode === "all") {
        cards.forEach(function (c) { c.style.display = ""; });
      }

      if (mode === "popular") {
        cards.forEach(function (c) {
          c.style.display = c.dataset.popular === "yes" ? "" : "none";
        });
      }

      if (mode === "price") {
        cards.forEach(function (c) { c.style.display = ""; });
        cards.sort(function (a, b) { return a.dataset.price - b.dataset.price; });
        cards.forEach(function (c) { cardsBox.appendChild(c); });
      }
    };
  });
}

// ===== 3. Карточка товара: данные берутся по ?id=... =====
var productTitle = document.getElementById("product-title");

if (productTitle) {
  var products = {
    pottery:    { title: "Гончарное дело для начинающих", price: "3999", img: "images/pottery.png",
                  text: "Первое знакомство с глиной и гончарным кругом. Учимся вытягивать стенки и создавать простые формы." },
    drawing:    { title: "Рисование для начинающих", price: "2999", img: "images/drawing.png",
                  text: "Первое знакомство с живописью. Учимся работать с цветом, формой и композицией. Гуашь, акварель, акрил." },
    oil:        { title: "Живопись маслом", price: "4999", img: "images/oil.png",
                  text: "Классическая техника для тех, кто хочет работать с цветом по-настоящему. Учимся смешивать краски, строить форму." },
    watercolor: { title: "Легкие акварельные узоры", price: "2499", img: "images/watercolor.png",
                  text: "Лёгкая и воздушная техника. Учимся работать с водой и прозрачностью, создавать мягкие переходы и текстуры." },
    sketch:     { title: "Строгий скетчинг", price: "2799", img: "images/sketch.png",
                  text: "Быстрые зарисовки для тех, кто хочет рисовать везде. Учимся схватывать главное, работать линией." },
    ceramics:   { title: "Керамика и глазурь", price: "4499", img: "images/ceramics.png",
                  text: "Для тех, кто хочет разобраться в декоре. Изучаем виды глазурей, техники нанесения, обжиг. Экспериментируем с текстурой." }
  };

  var id = new URLSearchParams(location.search).get("id");
  var item = products[id] || products.pottery; // если id нет — показываем первый товар

  document.title = item.title + " — Твори";
  productTitle.textContent = item.title;
  document.getElementById("product-text").textContent = item.text;
  document.getElementById("product-price").textContent = item.price + "₽";
  document.getElementById("product-img").src = item.img;
  document.getElementById("product-img").alt = item.title;
}

// ===== 4. Форма обратной связи =====
var form = document.getElementById("feedback-form");

if (form) {
  form.onsubmit = function (e) {
    e.preventDefault(); // не перезагружаем страницу

    var name = form.elements.name;
    var phone = form.elements.phone;
    var review = form.elements.review;
    var ok = true;

    // имя не пустое
    if (name.value.trim() === "") { showError(name, true); ok = false; }
    else { showError(name, false); }

    // отзыв не пустой
    if (review.value.trim() === "") { showError(review, true); ok = false; }
    else { showError(review, false); }

    // в телефоне должно быть минимум 10 цифр
    var digits = phone.value.replace(/\D/g, "");
    if (digits.length < 10) { showError(phone, true); ok = false; }
    else { showError(phone, false); }

    if (ok) {
      form.reset();
      document.getElementById("form-success").style.display = "block";
    }
  };
}

function showError(input, hasError) {
  var field = input.closest(".field");
  field.classList.toggle("error", hasError);
}
