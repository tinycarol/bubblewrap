const home = document.getElementById("home");
const button = document.querySelector("button");
const audio = document.querySelector("audio");

const start = () => {
  home.removeChild(button);
  const wrapper = document.createElement("div");
  home.appendChild(wrapper);
  wrapper.id = "wrapper";
  wrapper.classList.add("visible");

  let wrapperWidth = 0;
  let wrapperHeight = 0;

  const boxSize = 40;

  let bubbles = {};

  const sound = new SoundManager(audio);

  document.body.appendChild(sound.render());
  document.body.appendChild(sound.renderAttribution());

  const generateBubbles = () => {
    const rows = Math.floor(wrapperHeight / boxSize);
    const cols = Math.floor(wrapperWidth / boxSize);

    if (!bubbles.maxRows) {
      bubbles.maxRows = rows;
      bubbles.maxCols = cols;
    }

    let sibling = undefined;

    for (let i = 0; i <= Math.max(rows, bubbles.maxRows); i++) {
      const clear = i > bubbles.maxRows - 1;
      if (!clear && !bubbles[i]) {
        bubbles[i] = [];
      }
      for (let j = 0; j + 1 <= Math.max(cols, bubbles.maxCols); j++) {
        if (clear || j > cols - 1) {
          bubbles[i]?.[j]?.remove();
          if (bubbles[i] && j === bubbles.maxCols - 1) {
            bubbles[i] = bubbles[i].slice(0, cols);
          }
        } else {
          let bubble;
          if (!bubbles[i][j]) {
            bubble = new Bubble(sound, wrapper, sibling);
            bubbles[i].push(bubble);
          } else {
            bubble = bubbles[i][j];
          }
          bubble.render();
          sibling = bubble;
        }
      }
      if (clear) {
        delete bubbles[i];
      }
    }
    bubbles.maxRows = rows;
    bubbles.maxCols = cols;
    /* for (let i = 0; i + 1 <= rows; i++) {
      if (!bubbles[i]) {
        bubbles[i] = [];
      }
      for (let j = 0; j + 1 <= columns; j++) {
        let bubble;
        if (!bubbles[i][j]) {
          bubble = new Bubble(sound, parent);
          bubbles[i].push(bubble);
        } else {
          bubble = bubbles[i][j];
        }
        bubble.render();
      }
    } */
  };

  const onWindowResize = () => {
    wrapperWidth = wrapper.offsetWidth;
    wrapperHeight = wrapper.offsetHeight;
    wrapperX = wrapper.offsetLeft;
    wrapperY = wrapper.offsetTop;
    generateBubbles();
  };
  onWindowResize();

  new ResizeObserver(onWindowResize).observe(wrapper);
};

button.addEventListener("click", start);
