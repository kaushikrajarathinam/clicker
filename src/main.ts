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

  const items = {
    A: { cost: 10, rate: 0.1, count: 0 },
    B: { cost: 100, rate: 2.0, count: 0 },
    C: { cost: 1000, rate: 50.0, count: 0 },
  };

  const btnA = document.createElement("button");
  btnA.textContent = "A (+0.1/sec) – 10";
  btnA.style.fontFamily = "Arial, sans-serif";
  btnA.style.padding = "6px 10px";

  const btnB = document.createElement("button");
  btnB.textContent = "B (+2/sec) – 100";
  btnB.style.fontFamily = "Arial, sans-serif";
  btnB.style.padding = "6px 10px";

  const btnC = document.createElement("button");
  btnC.textContent = "C (+50/sec) – 1000";
  btnC.style.fontFamily = "Arial, sans-serif";
  btnC.style.padding = "6px 10px";

  shop.appendChild(btnA);
  shop.appendChild(btnB);
  shop.appendChild(btnC);

  const render = () => {
    counterEl.textContent = `${counter.toFixed(2)} ${UNIT}`;
    status.textContent = `+${
      ratePerSecond.toFixed(2)
    } ${UNIT}/sec | A:${items.A.count} B:${items.B.count} C:${items.C.count}`;
    btnA.disabled = counter < items.A.cost;
    btnB.disabled = counter < items.B.cost;
    btnC.disabled = counter < items.C.cost;
  };

  btn.addEventListener("click", () => {
    counter += 1;
    render();
  });

  const buy = (key: "A" | "B" | "C") => {
    const it = items[key];
    if (counter >= it.cost) {
      counter -= it.cost;
      it.count += 1;
      ratePerSecond = items.A.count * items.A.rate +
        items.B.count * items.B.rate + items.C.count * items.C.rate;
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

    if (ratePerSecond > 0) {
      counter += ratePerSecond * dt;
    }
    render();

    requestAnimationFrame(frame);
  };

  render();
  requestAnimationFrame(frame);
})();

// code space keeps breaking, very ineffective use.
