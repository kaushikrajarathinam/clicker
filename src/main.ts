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

  const counterEl = document.createElement("div");
  counterEl.id = "counter";
  counterEl.style.marginTop = "8px";
  counterEl.style.fontSize = "18px";
  counterEl.style.fontFamily = "Arial, sans-serif";
  appRoot.appendChild(counterEl);

  const buyBtn = document.createElement("button");
  buyBtn.textContent = "Buy +1/sec (10 waffles)";
  buyBtn.style.marginTop = "8px";
  buyBtn.style.marginLeft = "8px";
  buyBtn.style.fontFamily = "Arial, sans-serif";
  buyBtn.style.padding = "6px 10px";
  buyBtn.disabled = true;
  appRoot.appendChild(buyBtn);

  const render = () => {
    counterEl.textContent = `${
      counter.toFixed(2)
    } ${UNIT} — +${ratePerSecond}/sec`;
    buyBtn.disabled = counter < 10;
  };

  btn.addEventListener("click", () => {
    counter += 1;
    render();
  });

  buyBtn.addEventListener("click", () => {
    if (counter >= 10) {
      counter -= 10;
      ratePerSecond += 1;
      render();
    }
  });

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
