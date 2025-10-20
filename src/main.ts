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

  const inc = 1.15;
  const items = {
    A: { baseCost: 10, rate: 0.1, count: 0, label: "Syrup Drizzle (+0.1/sec)" },
    B: { baseCost: 100, rate: 2.0, count: 0, label: "Toaster (+2/sec)" },
    C: {
      baseCost: 1000,
      rate: 50.0,
      count: 0,
      label: "Breakfast Cart (+50/sec)",
    },
  };

  const costNow = (base: number, n: number) => base * Math.pow(inc, n);

  const btnA = document.createElement("button");
  btnA.style.fontFamily = "Arial, sans-serif";
  btnA.style.padding = "6px 10px";

  const btnB = document.createElement("button");
  btnB.style.fontFamily = "Arial, sans-serif";
  btnB.style.padding = "6px 10px";

  const btnC = document.createElement("button");
  btnC.style.fontFamily = "Arial, sans-serif";
  btnC.style.padding = "6px 10px";

  shop.appendChild(btnA);
  shop.appendChild(btnB);
  shop.appendChild(btnC);

  const render = () => {
    ratePerSecond = items.A.count * items.A.rate +
      items.B.count * items.B.rate + items.C.count * items.C.rate;
    counterEl.textContent = `${counter.toFixed(2)} ${UNIT}`;
    status.textContent = `+${
      ratePerSecond.toFixed(2)
    } ${UNIT}/sec | Syrup:${items.A.count} Toaster:${items.B.count} Cart:${items.C.count}`;

    const aCost = costNow(items.A.baseCost, items.A.count);
    const bCost = costNow(items.B.baseCost, items.B.count);
    const cCost = costNow(items.C.baseCost, items.C.count);

    btnA.textContent = `${items.A.label} – ${aCost.toFixed(2)}`;
    btnB.textContent = `${items.B.label} – ${bCost.toFixed(2)}`;
    btnC.textContent = `${items.C.label} – ${cCost.toFixed(2)}`;

    btnA.disabled = counter < aCost;
    btnB.disabled = counter < bCost;
    btnC.disabled = counter < cCost;
  };

  btn.addEventListener("click", () => {
    counter += 1;
    render();
  });

  const buy = (key: "A" | "B" | "C") => {
    const it = items[key];
    const price = costNow(it.baseCost, it.count);
    if (counter >= price) {
      counter -= price;
      it.count += 1;
      render();
    }
  };

  btnA.addEventListener("click", () => buy("A"));
  btnB.addEventListener("click", () => buy("B"));
  btnC.addEventListener("click", () => buy("C"));

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
