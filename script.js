const app = document.querySelector("#app");

const data = {
  cycling: {
    title: "Велотуризм",
    icon: "🚴",
    desc: "Дальние поездки и красивые маршруты на велосипеде.",
    levels: {
      novice: {
        label: "Новичок",
        
      },
      amateur: {
        label: "Любитель",
        
      },
      pro: {
        label: "Профессионал",
        
      },
    },
  },
  skiing: {
    title: "Лыжи",
    icon: "⛷️",
    desc: "Зимние трассы, склоны и туры по снегу.",
    levels: {
      novice: {
        label: "Новичок",
        
      },
      amateur: {
        label: "Любитель",
        
      },
      pro: {
        label: "Профессионал",
        
      },
    },
  },
  climbing: {
    title: "Альпинизм",
    icon: "🧗",
    desc: "Горы, восхождения и маршруты по высоте.",
    levels: {
      novice: {
        label: "Новичок",
        
      },
      amateur: {
        label: "Любитель",
        
      },
      pro: {
        label: "Профессионал",
        
      },
    },
  },
};


const routeImages = {
  cycling: {
    novice: "велотуризм, новичок.jpg",
    amateur: "велотуризм, средний уровень.jpg",
    pro: "велотуризм, профи.jpg",
  },
  skiing: {
    novice: "лыжи, новичок.jpg",
    amateur: "лыжи, средний уровень.jpg",
    pro: "лыжи, профи.jpg",
  },
  climbing: {
    novice: "альпинизм, новичок.jpg",
    amateur: "альпинизм, средний уровень.jpg",
    pro: "альпинизм, профи.jpg",
  },
};

const state = {
  activityKey: null,
  levelKey: null,
};

const render = () => {
  if (!state.activityKey) {
    renderActivityStep();
    return;
  }

  if (!state.levelKey) {
    renderLevelStep();
    return;
  }

  renderResultStep();
};

const renderActivityStep = () => {
  app.innerHTML = `
    <section class="step">
      <div class="step__header">
        <h2 class="step__title">Что вам интересно?</h2>
        <p class="step__subtitle">Выберите направление, чтобы продолжить.</p>
      </div>
      <div class="activity">
        ${Object.entries(data)
          .map(
            ([key, item]) => `
          <button class="activity__card" data-activity="${key}">
            <span class="activity__icon">${item.icon}</span>
            <span class="activity__title">${item.title}</span>
            <span class="activity__desc">${item.desc}</span>
          </button>
        `,
          )
          .join("")}
      </div>
    </section>
  `;

  const cards = app.querySelectorAll("[data-activity]");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      state.activityKey = card.getAttribute("data-activity");
      render();
    });
  });
};

const renderLevelStep = () => {
  const activity = data[state.activityKey];

  app.innerHTML = `
    <section class="step">
      <div class="step__header">
        <h2 class="step__title">${activity.title}: выберите уровень</h2>
        <p class="step__subtitle">Подберем места и маршруты под ваш опыт.</p>
      </div>
      <div class="level">
        ${Object.entries(activity.levels)
          .map(
            ([key, level]) => `
          <button class="level__button" data-level="${key}">
            ${level.label}
          </button>
        `,
          )
          .join("")}
      </div>
      <div class="step__actions">
        <button class="button button--ghost" data-back="activities">
          Назад к активностям
        </button>
      </div>
    </section>
  `;

  const buttons = app.querySelectorAll("[data-level]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      state.levelKey = button.getAttribute("data-level");
      render();
    });
  });

  const backButton = app.querySelector("[data-back='activities']");
  backButton.addEventListener("click", () => {
    state.activityKey = null;
    state.levelKey = null;
    render();
  });
};

const renderResultStep = () => {
  const activity = data[state.activityKey];
  const level = activity.levels[state.levelKey];
  const imageFile = routeImages[state.activityKey]?.[state.levelKey];
  const imageSrc = imageFile ? encodeURI(`images/${imageFile}`) : "";

  app.innerHTML = `
    <section class="step">
      <div class="step__header">
        <h2 class="step__title">${activity.title} — ${level.label}</h2>
        <p class="step__subtitle">Популярное место и подходящие маршруты.</p>
      </div>
      <div class="result">
        <div class="result__card">
          ${imageSrc ? `<img class="result__image" src="${imageSrc}" alt="${activity.title} — ${level.label}" loading="lazy" />` : ""}
          
        </div>
      </div>
      <div class="step__actions">
        <button class="button" data-back="levels">Выбрать другой уровень</button>
        <button class="button button--ghost" data-back="activities">
          Выбрать другую активность
        </button>
      </div>
    </section>
  `;

  const backToLevels = app.querySelector("[data-back='levels']");
  backToLevels.addEventListener("click", () => {
    state.levelKey = null;
    render();
  });

  const backToActivities = app.querySelector("[data-back='activities']");
  backToActivities.addEventListener("click", () => {
    state.activityKey = null;
    state.levelKey = null;
    render();
  });
};

render();
