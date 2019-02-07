import { Component, Prop, Element, Listen } from "@stencil/core";

@Component({
  tag: "shooting-stars",
  styleUrl: "shooting-stars.css",
  shadow: false
})
export class ShootingStars {

  // Host element
  @Element() el: HTMLElement;
  @Prop() image: string = "https://unpkg.com/shooting-stars/assets/meteor.svg";
  @Prop() height: string | number = 40;
  @Prop() width: string | number = 40;
  @Prop() rotated: boolean = false;
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
    const background = this.el.querySelector("#shooting-stars-background");
    const distanceToTravel = Math.sqrt(Math.pow(this.el.clientHeight, 2) + Math.pow(this.el.clientHeight, 2));
    const spacing = totalWidth / this.num;

    for (let i = 0; i < this.num; i++) {
      let star = document.createElement("div");
      let starImg = document.createElement("img");
      starImg.src = this.image;
      if (this.rotated) {
        starImg.className = "rotated";
      }
      star.className = "shooting-stars-star";

      if (isNaN(Number(this.height))) {
        star.style.height = this.height.toString();
      } else {
        star.style.height = this.height + "px";
      }
      star.style.top = "-" + star.style.height;
      if (isNaN(Number(this.width))) {
        star.style.width = this.width.toString();
      } else {
        star.style.width = this.width + "px";
      }
      star.style.left = this.calculateX(i, spacing);
      star.style.animationDelay = this.randomizeSeconds(0, this.num, true);
      star.style.animationDuration = this.randomizeSeconds((100 / this.maxSpeed), (100 / this.minSpeed), false);
      star.style.setProperty("--distance", "-" + distanceToTravel + "px");
      star.appendChild(starImg);
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
    const backgroundStyles = {
      position: "relative"
    };

    return (
      <div id="shooting-stars-background" style={backgroundStyles}>
      </div>
    );
  }
}
