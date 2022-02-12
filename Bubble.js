const MODES = ["a", "b", "c", "d", "e", "f", "g"];

class Bubble {
  constructor(sound, parent, sibling) {
    this.sound = sound;
    this.mobileHover = false;
    this.parent = parent;
    this.sibling = sibling;
    this.burst = false;
    this.mode = MODES[Math.floor(Math.random() * MODES.length)];
  }

  onClick(e) {
    e?.preventDefault();
    if (!this.burst) {
      this.sound.play();
      this.burst = true;
    }
    this.render();
  }

  render() {
    if (!this.element) {
      const bubble = document.createElement("span");
      bubble.classList.add("bubble");
      bubble.classList.add(this.mode);
      bubble.addEventListener("click", this.onClick.bind(this));
      this.element = bubble;
      if (this.sibling) {
        this.sibling.element.parentElement.insertBefore(bubble, this.sibling.element.nextSibling);
      } else {
        this.parent.appendChild(bubble);
      }
    } else if (this.burst) {
      this.element.classList.add("burst");
    }
  }

  remove() {
    this.element.parentElement.removeChild(this.element);
  }
}
