import { Component, Prop, Element, Listen } from "@stencil/core";

@Component({
  tag: "shooting-stars",
  styleUrl: "shooting-stars.css",
  shadow: true
})
export class ShootingStars {

  // Host element
  @Element() el: HTMLElement;
  @Prop() image: string;
  @Prop() height: string = "30px";
  @Prop() width: string = "30px";
  @Prop() minSpeed: number = 10;
  @Prop() maxSpeed: number = 50;
  @Prop() num: number = 10;

  private shootingStars = [];
  private resizeTimeout = null;

  componentDidLoad() {
    this.onInit();
  }

  @Listen('window:resize')
  resizeDebounced() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.onInit();
    }, 200);
  }

  onInit() {
    this.killStars();
    this.el.style.height = "100%";
    this.el.style.width = "100%";
    this.el.style.position = "absolute";
    this.el.style.display = "block";
    const totalWidth = this.el.clientHeight + this.el.clientWidth;
    const background = this.el.shadowRoot.querySelector("#background");
    const distanceToTravel = Math.sqrt(Math.pow(this.el.clientHeight, 2) + Math.pow(this.el.clientHeight, 2));
    this.el.style.setProperty("--distance", "-" + distanceToTravel + "px");
    const spacing = totalWidth / this.num;

    for (let i = 0; i < this.num; i++) {
      let star = document.createElement("img");
      star.className = "star";
      star.src = this.image;
      star.style.height = this.height;
      star.style.width = this.width;
      star.style.top = "-" + this.height;
      star.style.left = this.calculateX(i, spacing);
      star.style.animationDelay = this.randomizeSeconds(0, this.num, true);
      star.style.animationDuration = this.randomizeSeconds((100 / this.maxSpeed), (100 / this.minSpeed), false)
      background.appendChild(star);
      this.shootingStars.push(star);
    }
  }

  private calculateX(index, spacing) {
    return (index + Math.random()) * spacing + "px";
  }

  private randomizeSeconds(start, end, negative) {
    let seconds = (Math.random() * end) + start + "s";
    return negative ? "-" + seconds : seconds;
  }

  private killStars() {
    this.shootingStars.forEach((ss) => {
      ss.parentNode.removeChild(ss);
    });
    this.shootingStars = []
  }

  render() {
    return (
      <div id="background">
      </div>
    );
  }
}
