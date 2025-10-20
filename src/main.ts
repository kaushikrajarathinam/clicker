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
  shop.style.marginTop = "8px";
  shop.style.display = "flex";
  shop.style.gap = "8px";
  appRoot.appendChild(shop);

  interface Item {
    name: string;
    cost: number;
    rate: number;
    count: number;
  }

  const inc = 1.15;

  const availableItems: Item[] = [
    { name: "Syrup Drizzle", cost: 10, rate: 0.1, count: 0 },
    { name: "Toaster", cost: 100, rate: 2.0, count: 0 },
    { name: "Breakfast Cart", cost: 1000, rate: 50.0, count: 0 },
  ];

  const price = (base: number, n: number) => base * Math.pow(inc, n);

  const buttons: HTMLButtonElement[] = [];
  for (let i = 0; i < availableItems.length; i++) {
    const b = document.createElement("button");
    b.style.fontFamily = "Arial, sans-serif";
    b.style.padding = "6px 10px";
    buttons.push(b);
    shop.appendChild(b);
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
      buttons[i].textContent = `${it.name} (+${it.rate}/sec) – ${
        costNow.toFixed(2)
      }`;
      buttons[i].disabled = counter < costNow;
    }
  };

  btn.addEventListener("click", () => {
    counter += 1;
    render();
  });

  for (let i = 0; i < availableItems.length; i++) {
    buttons[i].addEventListener("click", () => {
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
