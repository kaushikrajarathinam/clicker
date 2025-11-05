import "./style.css";

(() => {
  const appRoot = (document.querySelector<HTMLElement>("#app")) ??
    document.body;

  const addBtn = document.createElement("button");
  addBtn.innerHTML = "🧇";
  addBtn.setAttribute("aria-label", "Add one waffle");
  addBtn.className = "btn";
  appRoot.appendChild(addBtn);

  // Labels and counters
  const UNIT_LABEL = "waffles";
  const CLICK_INCREMENT = 1;
  let counter: number = 0;
  let ratePerSecond = 0;

  const status = document.createElement("div");
  status.className = "status";
  appRoot.appendChild(status);

  const counterEl = document.createElement("div");
  counterEl.id = "counter";
  counterEl.className = "counter";
  appRoot.appendChild(counterEl);

  const shopEl = document.createElement("div");
  shopEl.className = "shop";
  appRoot.appendChild(shopEl);

  // Types and constants
  interface Item {
    name: string;
    cost: number;
    rate: number;
    count: number;
    description: string;
  }

  const PRICE_GROWTH = 1.15;

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

  // helpers
  const price = (base: number, n: number) => base * Math.pow(PRICE_GROWTH, n);

  const computeRate = (items: Item[]) =>
    items.reduce((sum, it) => sum + it.rate * it.count, 0);

  const canAfford = (total: number, cost: number) => total >= cost;

  const tryPurchase = (
    total: number,
    it: Item,
  ): { total: number; bought: boolean } => {
    const costNow = price(it.cost, it.count);
    if (!canAfford(total, costNow)) return { total, bought: false };
    return { total: total - costNow, bought: true };
  };

  const buttons: { button: HTMLButtonElement; desc: HTMLDivElement }[] = [];
  for (let i = 0; i < availableItems.length; i++) {
    const row = document.createElement("div");
    row.className = "stack";

    const b = document.createElement("button");
    b.className = "itemBtn";
    b.title = availableItems[i].description;

    const d = document.createElement("div");
    d.className = "meta";

    row.appendChild(b);
    row.appendChild(d);
    shopEl.appendChild(row);
    buttons.push({ button: b, desc: d });
  }

  const render = () => {
    ratePerSecond = computeRate(availableItems);

    counterEl.textContent = `${counter.toFixed(2)} ${UNIT_LABEL}`;
    status.textContent = `+${ratePerSecond.toFixed(2)} ${UNIT_LABEL}/sec | ` +
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

  // Events
  addBtn.addEventListener("click", () => {
    counter += CLICK_INCREMENT;
    render();
  });

  for (let i = 0; i < availableItems.length; i++) {
    buttons[i].button.addEventListener("click", () => {
      const it = availableItems[i];
      const result = tryPurchase(counter, it);
      if (result.bought) {
        counter = result.total;
        it.count += 1;
        render();
      }
    });
  }

  // Animation Loop
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
