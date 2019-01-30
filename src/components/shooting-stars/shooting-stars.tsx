import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'shooting-stars',
  styleUrl: 'shooting-stars.css',
  shadow: true
})
export class MyComponent {

  // Host element
  @Element() el: HTMLElement;
  @Prop() image: string;
  @Prop() height: string = "30px";
  @Prop() width: string = "30px";
  @Prop() concentration: number = 100;

  componentDidLoad() {
    this.onInit();
    console.log('here')
  }

  // private shootingStars = [];

  onInit() {
    this.el.style.height = '100%';
    this.el.style.width = '100%';
    this.el.style.display = 'block';
    const totalWidth = this.el.clientHeight + this.el.clientWidth;
    const background = this.el.shadowRoot.querySelector('#background');
    const numStars = Math.ceil(totalWidth / this.concentration);
    for (let i = 0; i < numStars; i++) {
      console.log("generated")
      let star = document.createElement("img");
      star.className = "star";
      star.src = this.image;
      star.style.height = this.height;
      star.style.width = this.width;
      star.style.top = "-" + this.height;
      star.style.left = this.calculateX(i);
      star.style.animationDelay = this.randomizeSeconds(0, 10, true);
      star.style.animationDuration = this.randomizeSeconds(2, 8, false)
      background.appendChild(star);
    }
  }

  private calculateX(index) {
    return (index + Math.random()) * this.concentration + 'px';
  }

  private randomizeSeconds(start, end, negative) {
    let seconds = (Math.random() * end) + start + 's';
    return negative ? '-' + seconds : seconds;
  }


  render() {
    return (
      <div id="background">
      </div>
    );
  }
}
