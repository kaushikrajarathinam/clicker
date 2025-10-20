import "./style.css";

(() => {
  const appRoot = (document.querySelector<HTMLElement>("#app")) ??
    document.body;

  const btn = document.createElement("button");
  btn.innerHTML = "🧇";
  btn.setAttribute("aria-label", "Add one waffle");
  btn.style.fontSize = "24px";
  btn.style.fontFamily = "Arial, sans-serif";
  btn.style.padding = "8px 12px";
  btn.style.marginTop = "8px";
  appRoot.appendChild(btn);

  const UNIT = "waffles";
  let counter: number = 0;
  let ratePerSecond = 0;

  const status = document.createElement("div");
  status.style.marginTop = "8px";
  status.style.fontSize = "16px";
  status.style.fontFamily = "Arial, sans-serif";
  appRoot.appendChild(status);

  const counterEl = document.createElement("div");
  counterEl.id = "counter";
  counterEl.style.marginTop = "8px";
  counterEl.style.fontSize = "18px";
  counterEl.style.fontFamily = "Arial, sans-serif";
  appRoot.appendChild(counterEl);

  const shop = document.createElement("div");
  shop.style.marginTop = "10px";
  shop.style.display = "flex";
  shop.style.flexDirection = "column"; // i learned that this makes the butttons go up to down. a
  shop.style.gap = "10px";
  appRoot.appendChild(shop);

  interface Item {
    name: string;
    cost: number;
    rate: number;
    count: number;
    description: string;
  }

  const inc = 1.15;

  const availableItems: Item[] = [
    {
      name: "Syrup Drizzle",
      cost: 10,
      rate: 0.1,
      count: 0,
      description: "I heard this makes them taste good...",
    },
    {
      name: "Toaster",
      cost: 100,
      rate: 2.0,
      count: 0,
      description: "A tool that can make them toasty apparently.",
    },
    {
      name: "Breakfast Cart",
      cost: 1000,
      rate: 50.0,
      count: 0,
      description:
        "Just an ordinary cart with a weird property of generating waffles inside.",
    },
    {
      name: "Diner Franchise",
      cost: 15000,
      rate: 800.0,
      count: 0,
      description: "A chain of slaves flipping waffles 24/7.",
    },
    {
      name: "Waffle Planet",
      cost: 250000,
      rate: 12000,
      count: 0,
      description:
        "You transformed earth and enslaved everyone to make waffles for you.",
    },
  ];

  const price = (base: number, n: number) => base * Math.pow(inc, n);

  const buttons: { button: HTMLButtonElement; desc: HTMLDivElement }[] = [];
  for (let i = 0; i < availableItems.length; i++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.flexDirection = "column";
    row.style.gap = "4px";

    const b = document.createElement("button");
    b.style.fontFamily = "Arial, sans-serif";
    b.style.padding = "6px 10px";
    b.title = availableItems[i].description;

    const d = document.createElement("div");
    d.style.fontFamily = "Arial, sans-serif";
    d.style.fontSize = "12px";
    d.style.opacity = "0.85";

    row.appendChild(b);
    row.appendChild(d);
    shop.appendChild(row);
    buttons.push({ button: b, desc: d });
  }

  const render = () => {
    ratePerSecond = availableItems.reduce(
      (sum, it) => sum + it.rate * it.count,
      0,
    );
    counterEl.textContent = `${counter.toFixed(2)} ${UNIT}`;
    status.textContent = `+${ratePerSecond.toFixed(2)} ${UNIT}/sec | ` +
      availableItems.map((it) => `${it.name}:${it.count}`).join(" ");

    for (let i = 0; i < availableItems.length; i++) {
      const it = availableItems[i];
      const costNow = price(it.cost, it.count);
      buttons[i].button.textContent = `${it.name} (+${it.rate}/sec) – ${
        costNow.toFixed(2)
      }`;
      buttons[i].button.disabled = counter < costNow;
      buttons[i].desc.textContent = it.description;
    }
  };

  btn.addEventListener("click", () => {
    counter += 1;
    render();
  });

  for (let i = 0; i < availableItems.length; i++) {
    buttons[i].button.addEventListener("click", () => {
      const it = availableItems[i];
      const costNow = price(it.cost, it.count);
      if (counter >= costNow) {
        counter -= costNow;
        it.count += 1;
        render();
      }
    });
  }

  let lastTs: number | null = null;
  const frame = (ts: number) => {
    if (lastTs === null) lastTs = ts;
    const dt = (ts - lastTs) / 1000;
    lastTs = ts;
    if (ratePerSecond > 0) counter += ratePerSecond * dt;
    render();
    requestAnimationFrame(frame);
  };

  render();
  requestAnimationFrame(frame);
})();
import "./style.css";

(() => {
  const appRoot = (document.querySelector<HTMLElement>("#app")) ??
    document.body;

  const btn = document.createElement("button");
  btn.innerHTML = "🧇";
  btn.setAttribute("aria-label", "Add one waffle");
  btn.style.fontSize = "24px";
  btn.style.fontFamily = "Arial, sans-serif";
  btn.style.padding = "8px 12px";
  btn.style.marginTop = "8px";
  appRoot.appendChild(btn);

  const UNIT = "waffles";
  let counter: number = 0;
  let ratePerSecond = 0;

  const status = document.createElement("div");
  status.style.marginTop = "8px";
  status.style.fontSize = "16px";
  status.style.fontFamily = "Arial, sans-serif";
  appRoot.appendChild(status);

  const counterEl = document.createElement("div");
  counterEl.id = "counter";
  counterEl.style.marginTop = "8px";
  counterEl.style.fontSize = "18px";
  counterEl.style.fontFamily = "Arial, sans-serif";
  appRoot.appendChild(counterEl);

  const shop = document.createElement("div");
  shop.style.marginTop = "10px";
  shop.style.display = "flex";
  shop.style.flexDirection = "column"; // i learned that this makes the butttons go up to down. a
  shop.style.gap = "10px";
  appRoot.appendChild(shop);

  interface Item {
    name: string;
    cost: number;
    rate: number;
    count: number;
    description: string;
  }

  const inc = 1.15;

  const availableItems: Item[] = [
    {
      name: "Syrup Drizzle",
      cost: 10,
      rate: 0.1,
      count: 0,
      description: "I heard this makes them taste good...",
    },
    {
      name: "Toaster",
      cost: 100,
      rate: 2.0,
      count: 0,
      description: "A tool that can make them toasty apparently.",
    },
    {
      name: "Breakfast Cart",
      cost: 1000,
      rate: 50.0,
      count: 0,
      description:
        "Just an ordinary cart with a weird property of generating waffles inside.",
    },
    {
      name: "Diner Franchise",
      cost: 15000,
      rate: 800.0,
      count: 0,
      description: "A chain of slaves flipping waffles 24/7.",
    },
    {
      name: "Waffle Planet",
      cost: 250000,
      rate: 12000,
      count: 0,
      description:
        "You transformed earth and enslaved everyone to make waffles for you.",
    },
  ];

  const price = (base: number, n: number) => base * Math.pow(inc, n);

  const buttons: { button: HTMLButtonElement; desc: HTMLDivElement }[] = [];
  for (let i = 0; i < availableItems.length; i++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.flexDirection = "column";
    row.style.gap = "4px";

    const b = document.createElement("button");
    b.style.fontFamily = "Arial, sans-serif";
    b.style.padding = "6px 10px";
    b.title = availableItems[i].description;

    const d = document.createElement("div");
    d.style.fontFamily = "Arial, sans-serif";
    d.style.fontSize = "12px";
    d.style.opacity = "0.85";

    row.appendChild(b);
    row.appendChild(d);
    shop.appendChild(row);
    buttons.push({ button: b, desc: d });
  }

  const render = () => {
    ratePerSecond = availableItems.reduce(
      (sum, it) => sum + it.rate * it.count,
      0,
    );
    counterEl.textContent = `${counter.toFixed(2)} ${UNIT}`;
    status.textContent = `+${ratePerSecond.toFixed(2)} ${UNIT}/sec | ` +
      availableItems.map((it) => `${it.name}:${it.count}`).join(" ");

    for (let i = 0; i < availableItems.length; i++) {
      const it = availableItems[i];
      const costNow = price(it.cost, it.count);
      buttons[i].button.textContent = `${it.name} (+${it.rate}/sec) – ${
        costNow.toFixed(2)
      }`;
      buttons[i].button.disabled = counter < costNow;
      buttons[i].desc.textContent = it.description;
    }
  };

  btn.addEventListener("click", () => {
    counter += 1;
    render();
  });

  for (let i = 0; i < availableItems.length; i++) {
    buttons[i].button.addEventListener("click", () => {
      const it = availableItems[i];
      const costNow = price(it.cost, it.count);
      if (counter >= costNow) {
        counter -= costNow;
        it.count += 1;
        render();
      }
    });
  }

  let lastTs: number | null = null;
  const frame = (ts: number) => {
    if (lastTs === null) lastTs = ts;
    const dt = (ts - lastTs) / 1000;
    lastTs = ts;
    if (ratePerSecond > 0) counter += ratePerSecond * dt;
    render();
    requestAnimationFrame(frame);
  };

  render();
  requestAnimationFrame(frame);
})();
