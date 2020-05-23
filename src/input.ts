import { googleMaps } from "./app";

export class Input {
  input: HTMLInputElement;
  button: HTMLButtonElement;
  constructor() {
    this.input = document.querySelector("#address")! as HTMLInputElement;
    this.button = document.querySelector("button")! as HTMLButtonElement;
    this.configure();
  }
  private configure() {
    this.button.addEventListener("click", this.submitHandler.bind(this));
  }

  private clearInput(): void {
    this.input.value = "";
  }

  submitHandler(e: Event) {
    e.preventDefault();
    if (this.input.value.length) {
      const address = this.input.value;
      googleMaps.getAddress(address);
      this.clearInput();
    } else {
      alert("No address");
    }
  }
}
