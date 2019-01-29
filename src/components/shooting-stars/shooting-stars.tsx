import { Component, Prop, Element } from '@stencil/core';
import { start } from 'repl';
import { strict } from 'assert';

@Component({
  tag: 'shooting-stars',
  styleUrl: 'shooting-stars.css',
  shadow: true
})
export class MyComponent {

  // Host element
  @Element() el: HTMLElement;

  @Prop() image: string;
  @Prop() height: string = "10px";
  @Prop() width: string = "10px";
  @Prop() concentration: number = 100;

  componentDidLoad() {

  }

  private shootingStars = [];

  onInit() {
    const extension = this.el.clientHeight / this.el.clientWidth;
    const totalWidth = this.el.clientHeight + this.el.clientWidth;
    const numStars = Math.ceil(totalWidth / this.concentration);
    for (let i = 0; i < numStars; i++) {
      let star = document.createElement("img");
      star.className = "star";
      star.src = this.image;
      star.style.height = this.height;
      star.style.width = this.width;
      star.style.top = "-" + this.height;
      star.style.left = this.calculateX(i, totalWidth)
      document.body.appendChild(star);
    }
  }

  private calculateX(index, totalWidth) {
    return ((index + Math.random) * this.concentration) / totalWidth * 100 + "%";
  }

  render() {
    return (
      <div id="background">
        {this.image}
        <img src={this.image} class="shooting-star"></img>
      </div>
    );
  }
}
