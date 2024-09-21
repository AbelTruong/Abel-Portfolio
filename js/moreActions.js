class HandleActions {
  constructor() {
    this.init();
  }

  init() {
    const buttons = document.querySelectorAll('.action__button');
    buttons.forEach((button) => {
      button.addEventListener('click', () => this.handleAction(button));
    });
  }

  /**
   * Show More Actions
   */
  showMoreActions() {
    const element = document.querySelector('[show-more-actions]');
    element.classList.toggle('active');
  }

  handleAction(element) {
    const action = element.dataset.action;

    switch (action) {
      case 'action__show':
        this.showMoreActions();
        break;
      case 'action__copy-right':
        this.copyRight();
        break;
      case 'action__download':
        this.download();
        break;
      case 'action__listen':
        this.listen();
        break;
      case 'action__contact':
        this.contact();
        break;
      default:
        console.error('Unknown action:', action);
    }
  }

  copyRight() {
    setTimeout(() => {
      this.showMoreActions();
    }, 100);
  }

  /**
   * Initiates the download of a PDF file and handles the download process.
   * Fetches the file from a specified URL, creates a temporary link element to trigger the download,
   * and then cleans up the created URL object.
   *
   * @returns {void} This function does not return a value.
   */
  download() {
    console.log('download action');
    const url = './../mocks/abel_CV.pdf';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Truong Hung An - Web Developer.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      })
      .finally(() => {
        setTimeout(() => {
          this.showMoreActions();
        }, 100);
      });
  }

  listen() {
    console.log('listen action');
  }

  contact() {
    if (window.innerWidth < 1250) {
      const sidebarBtn = document.querySelector('[data-sidebar]');
      sidebarBtn.classList.add('active');
    }
  }
}

/**
 * handle more action
 */
document.addEventListener('DOMContentLoaded', () => {
  new HandleActions();
});
