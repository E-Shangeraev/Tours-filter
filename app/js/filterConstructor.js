const previewListConstructor = document.querySelector('#preview-constructor .preview__list');

previewListConstructor.addEventListener('click', (e) => {
  let more = e.target.closest('#more');

  if (!more) return;

  const locId = more.parentElement.parentElement.dataset.loc_id;
  const obj = { locId };

  console.log(obj);

  postData('constructor/loc_description.php', obj).then((data) => showLocaleDescription(data));

  console.log('Подробнее');
});

function showLocaleDescription(data) {
  if (document.querySelector('.locale')) {
    filter.removeChild(document.querySelector('.locale'));
  }
  if (document.querySelector('.tour-constructor')) {
    filter.removeChild(document.querySelector('.tour-constructor'));
  }

  let fact1 = data['fact-1'];
  let fact2 = data['fact-2'];
  let fact3 = data['fact-3'];
  let fact4 = data['fact-4'];
  let factImage1 = data['img-1'];
  let factImage2 = data['img-2'];
  let factImage3 = data['img-3'];
  let factImage4 = data['img-4'];
  let facts = [];

  if (fact1) {
    facts.push(`
      <li class="locale__fact">
        <img src="data:image/svg+xml;base64, ${factImage1}" alt="" />
        <p class="locale__descr locale__descr--fact">${fact1}</p>
      </li>
    `);
  }
  if (fact2) {
    facts.push(`
      <li class="locale__fact">
        <img src="data:image/svg+xml;base64, ${factImage2}" alt="" />
        <p class="locale__descr locale__descr--fact">${fact2}</p>
      </li>
    `);
  }
  if (fact3) {
    facts.push(`
      <li class="locale__fact">
        <img src="data:image/svg+xml;base64, ${factImage3}" alt="" />
        <p class="locale__descr locale__descr--fact">${fact3}</p>
      </li>
    `);
  }
  if (fact4) {
    facts.push(`
      <li class="locale__fact">
        <img src="data:image/svg+xml;base64, ${factImage4}" alt="" />
        <p class="locale__descr locale__descr--fact">${fact4}</p>
      </li>
    `);
  }
  facts = facts.join('');

  let transport = [];
  if (data['transport-1']) {
    const transport1 = `
      <li class="filter__transport-item">
        <img src="data:image/svg+xml;base64, ${data['transport-img-1']}" alt="${data['transport-1']}" />
        <span class="filter__item">${data['transport-1']}</span>
      </li>
    `;
    transport.push(transport1);
  }
  if (data['transport-2']) {
    const transport2 = `
      <li class="filter__transport-item">
        <img src="data:image/svg+xml;base64, ${data['transport-img-2']}" alt="${data['transport-2']}" />
        <span class="filter__item">${data['transport-2']}</span>
      </li>
    `;
    transport.push(transport2);
  }
  transport = transport.join('');

  let lodging = [];
  if (data['lodging-1']) {
    const lodging1 = `
      <li class="filter__lodging-item">
        <img src="data:image/svg+xml;base64, ${data['lodging-img-1']}" alt="${data['lodging-1']}" />
        <span class="filter__item">${data['lodging-1']}</span>
      </li>
    `;
    lodging.push(lodging1);
  }
  if (data['lodging-2']) {
    const lodging2 = `
      <li class="filter__lodging-item">
        <img src="data:image/svg+xml;base64, ${data['lodging-img-2']}" alt="${data['lodging-2']}" />
        <span class="filter__item">${data['lodging-2']}</span>
      </li>
    `;
    lodging.push(lodging2);
  }
  lodging = lodging.join('');

  let localeInteresting = [];
  if (data['subtitle-1']) {
    const subtitle1 = `
      <li>
        <h3 class="filter__title">${data['subtitle-1']}</h3>
        <p class="locale__descr">${data['desc-1']}</p>
      </li>
    `;
    localeInteresting.push(subtitle1);
  }
  if (data['subtitle-2']) {
    const subtitle2 = `
      <li>
        <h3 class="filter__title">${data['subtitle-2']}</h3>
        <p class="locale__descr">${data['desc-2']}</p>
      </li>
    `;
    localeInteresting.push(subtitle2);
  }

  localeInteresting = localeInteresting.join('');

  const locDesc = `
  <section class="row locale">
    <aside class="col-sm-3 filter__settings filter__settings--tour">
      <div class="tour__settings">
        <h3 class="filter__item" style="margin-bottom: 10px">${data.territory}</h3>

        <span class="filter__item">Сложность посещения: высокая</span><br><br>

        <div class="filter__transport">
          <h3 class="filter__title">Возможный транспорт до локации:</h3>
          <ul class="filter__transport-list">${transport}</ul>
        </div>

        <div class="filter__lodging">
          <h3 class="filter__title">Проживание во время тура:</h3>
          <ul class="filter__lodging-list">${lodging}</ul>
        </div>

        
      </div>
    </aside>

    <article class="col-sm-9 d-flex flex-column filter__description tour__article">
      <header class="locale__header">
        <h2 class="locale__name">${data.title}</h2>
      </header>

      <p class="locale__descr">${data.intro}</p>

      <div class="locale__promo">
        <img class="locale__img" src="data:image/jpeg;base64, ${data.image}" alt="Фотография с локации" />
      </div>

      <ul class="locale__description">${localeInteresting}</ul>

      <p class="locale__descr">${data.description}</p>

      <ul class="locale__facts">${facts}</ul>
    </article>

    <footer class="locale__footer col-sm-12">
      <p class="locale__footer-info">
        <span>Фото: </span>
        Максим Голубченко
      </p>
      <p class="locale__footer-info">
        <span>Полезная информация по турам: </span>
        <a href="#">Памятка для туриста</a>
      </p>
    </footer>
  </section>
  `;

  filter.insertAdjacentHTML('beforeend', locDesc);

  const groupFrom = document.querySelector('.group-from');
  const groupTo = document.querySelector('.group-to');

  $('.range-group-size').ionRangeSlider({
    type: 'double',
    skin: 'round',
    step: 1,
    onChange: function (data) {
      groupFrom.textContent = data.from;
      groupTo.textContent = data.to;
    },
  });
}

function showTourConstructor(data) {
  if (document.querySelector('.tour-constructor')) {
    filter.removeChild(document.querySelector('.tour-constructor'));
  }
  if (document.querySelector('.locale')) {
    filter.removeChild(document.querySelector('.locale'));
  }

  console.log(data);

  let title = data.map((item) => item.territory);
  title = title.join(' - ');
  console.log(title);

  let image = data.map((item) => {
    return `
    <div class="tour__slide" style="background-image: url('data:image/jpeg;base64, ${item.image}')">
      <span class="slide__name">${item.territory}</span>
    </div>
    `;
  });
  image = image.join('');

  let facts = [];

  data.forEach((item, index) => {
    let fact = item['fact-1'];
    let factImage = item['img-1'];

    facts.push(`
      <li>
        <div class="locale__fact">
          <img src='data:image/svg+xml;base64, ${factImage}' alt="" />
          <p class="filter__item">
            ${fact}. Здесь вы пробудете 
            <span class="filter__item filter__item--red day-count-${index}">1 день</span>.
          </p>
        </div>
        <div class="filter__group-size">
          <span class="filter__item">Длительность вашего пребывания здесь:</span>
          <input
            type="text"
            class="range-day-count-${index}"
            name="range-day-count"
            data-min="1"
            data-max="30"
            data-from="1"
            data-grid="false"
          />
        </div><br><br>
      </li>
    `);
  });

  facts = facts.join('');

  let program = data.map((item, index) => {
    return `
      <li class="program__item">
        <h4 class="program__day">
          <span>> Локация ${index + 1}: </span>
          <span>${item.territory}</span>
        </h4>
        <p class="program__descr">${item.intro}</p>
      </li>
    `;
  });
  program = program.join('');

  const tourConstructor = `
  <section class="row tour-constructor">
    <aside class="col-sm-3 filter__settings filter__settings--tour">
      <div class="tour__settings">
      <h3 class="filter__item" style="margin-bottom: 10px">Конструируемый тур</h3>
      <h3 class="filter__title" style="margin-bottom: 20px">
        ${data[0].territory} - ${data[data.length - 1].territory}
      </h3>

        <span class="filter__item">Общая сложность: средняя</span>

        <p class="filter__group-size">
          <span class="filter__item">Размер группы от </span>
          <span class="filter__item filter__item--red group-from">1</span>
          <span class="filter__item"> до </span>
          <span class="filter__item filter__item--red group-to">1</span>
          <span class="filter__item"> человек</span>
          <input
            type="text"
            class="range-group-size"
            name="range-group-size"
            data-min="1"
            data-max="10"
            data-from="1"
            data-to="1"
            data-grid="false"
          />
        </p>

        <div class="filter__lodging">
          <h3 class="filter__title">Проживание во время тура:</h3>
          <ul class="filter__lodging-list"></ul>
        </div>

        <div class="filter__total-price">
          <h3 class="filter__title" style="text-transform: uppercase">Ориентировочная стоимость:</h3>
          <span class="filter__item filter__item--red total-price">115 900</span>
          <span class="filter__item"> рублей с человека</span>
        </div>

        <div class="filter__reservation">
          <button class="btn-reservation" id="constructor-reserve">Забронировать</button>
        </div>
      </div>
    </aside>

    <article class="col-sm-9 d-flex flex-column filter__description tour__article">
      <header class="locale__header">
        <h2 class="locale__name">${title}</h2>
      </header>
      
      <div class="tour__promo">
        <div class="tour__warning warning">
          <b class="warning__title">ОБРАТИТЕ ВНИМАНИЕ!</b>
          <p class="warning__text">
            Этот тур составили вы сами, используя конструктор туров. Конструктор учитывает все возможные условия сочетаемости точек вашего маршрута, поэтому если вы видите эту страницу, то с вашим туром все в порядке и он состоится. Однако, описание тура также составлено автоматически и может содержать не все подробности о нем. Более детально обсудить тур вы сможете с туроператором, который возьмется за его выполнение.
          </p>
        </div><br>
        
        <div class="tour__slider">${image}</div>
      </div>
      
      <p class="locale__descr">Во время этого тура вы посетите несколько локаций туристско-рекреационного кластера «Арктический». Вот главные точки интереса, которые привлекут ваше внимание в ходе тура:</p>

      <ul class="locale__facts">${facts}</ul>
      

      <h3 class="tour__program">Программа тура</h3>
      <ul class="program">${program}</ul>
    </article>

    <footer class="locale__footer col-sm-12">
      <p class="locale__footer-info">
        <span>Фото: </span>
        Максим Голубченко
      </p>
      <p class="locale__footer-info">
        <span>Полезная информация по турам: </span>
        <a href="#">Памятка для туриста</a>
      </p>
    </footer>
  </section>
  `;

  filter.insertAdjacentHTML('beforeend', tourConstructor);

  objFilter.territory = title;

  $(function () {
    $('.tour__slider').slick({
      arrows: true,
      autoplay: false,
      autoplaySpeed: 8000,
      speed: 1400,
      cssEase: 'ease-in-out',
      pauseOnHover: false,
      waitForAnimate: true,
    });
  });

  function setRangeDayCount(index) {
    const dayCount = document.querySelector(`.day-count-${index}`);

    $(`.range-day-count-${index}`).ionRangeSlider({
      type: 'single',
      skin: 'round',
      min: 1,
      max: 30,
      from: 1,
      step: 1,
      onChange: function (data) {
        const num = String(data.from);

        if (num.match(/1$/)) {
          dayCount.textContent = num + ' день';
        }
        if (num.match(/[2-4]$/)) {
          dayCount.textContent = num + ' дня';
        }
        if (num.match(/[0, 5-9]$/)) {
          dayCount.textContent = num + ' дней';
        }
        if (num >= 11 && num <= 19) {
          dayCount.textContent = num + ' дней';
        }
      },
    });
  }

  data.forEach((item, index) => setRangeDayCount(index));

  const totalPriceText = document.querySelector('.tour-constructor .total-price');
  const groupFrom = document.querySelector('.group-from');
  const groupTo = document.querySelector('.group-to');

  totalPriceText.textContent = totalPriceConstructor;

  $('.range-group-size').ionRangeSlider({
    type: 'double',
    skin: 'round',
    min: 1,
    max: 10,
    from: 1,
    to: 10,
    step: 1,
    onChange: function (data) {
      groupFrom.textContent = data.from;
      groupTo.textContent = data.to;
      objFilter.groupFrom = data.from;
      objFilter.groupTo = data.to;

      console.log(totalPriceConstructor);

      const total = calcTotalPrice(objFilter.groupFrom, objFilter.groupTo, totalPriceConstructor);
      objFilter.price = total;
      totalPriceText.textContent = total;
    },
  });

  $('.tour-constructor .btn-reservation').magnificPopup({
    items: {
      src: '#reservation-popup',
      type: 'inline',
    },
  });

  $('#reserve').click(function () {
    $('.mfp-close').trigger('click');
  });

  const btnReserv = document.querySelector('#constructor-reserve');
  btnReserv.addEventListener('click', () => {
    const locDays = document.querySelectorAll('.locale__fact span');
    let days = objFilter.territory.split('-');

    locDays.forEach((day, index) => {
      days.splice(index + (index + 1), 0, ` (${day.textContent});`);
    });

    days = days
      .join('')
      .split(';')
      .filter((item) => item);

    objFilter.constructorTour = days.join(' - ');
  });
}

console.log(previewConstructor);

previewConstructor.addEventListener('click', (e) => {
  const calcPrice = e.target.closest('#preview-constructor .btn-calc');
  const previewTour = document.querySelectorAll('#preview-constructor .preview__tour');

  if (e.target != calcPrice) return;

  const obj = {
    locId: [],
  };

  previewTour.forEach((item) => {
    obj.locId.push(item.dataset.loc_id);
  });
  console.log(obj);

  postData('constructor/constructor.php', obj).then((data) => {
    showTourConstructor(data);
  });
});

// Сворачаивание/разворачивание превью списка туров

previewConstructor.addEventListener('click', (e) => {
  if (!e.target.closest('.preview__arrow')) return;

  e.target.classList.toggle('preview__arrow--close');
  previewListConstructor.classList.toggle('preview__list--close');
});
