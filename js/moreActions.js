class HandleActions {
  constructor() {
    this.init();
  }

  init() {
    const buttons = document.querySelectorAll(".action__button");
    buttons.forEach((button) => {
      button.addEventListener("click", () => this.handleAction(button));
    });
  }

  /**
   * Show More Actions
   */
  showMoreActions() {
    const element = document.querySelector("[show-more-actions]");
    element.classList.toggle("active");
  }

  handleAction(element) {
    const action = element.dataset.action;

    switch (action) {
      case "action__show":
        this.showMoreActions();
        break;
      case "action__copy-right":
        this.copyRight();
        break;
      case "action__download":
        this.download();
        break;
      case "action__listen":
        this.listen();
        break;
      case "action__contact":
        this.contact();
        break;
      default:
        console.error("Unknown action:", action);
    }
  }

  copyRight() {
    setTimeout(() => {
      this.showMoreActions();
    }, 100);
  }

  download() {
    console.log("download action");
  }

  listen() {
    console.log("listen action");
  }

  contact() {
    const sidebarBtn = document.querySelector("[data-sidebar]");
    sidebarBtn.classList.add("active");
  }
}

/**
 * handle more action
 */
document.addEventListener("DOMContentLoaded", () => {
  new HandleActions();
});
