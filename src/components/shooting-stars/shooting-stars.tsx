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
  @Prop() height: string = "auto";
  @Prop() width: string = "auto";
  @Prop() space: number = 100;

  componentDidLoad() {
    
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
