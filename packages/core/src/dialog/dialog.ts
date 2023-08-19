export class Dialog {
  box: HTMLElement;
  iframe: HTMLElement;
  dialog: HTMLElement;
  close: HTMLElement;
  title: HTMLElement;
  x: number;
  y: number;
  constructor(public parentElement: HTMLElement) {
    this.box = document.createElement('div');
    this.dialog = document.createElement('div');
    let header = document.createElement('div');
    this.title = document.createElement('div');
    this.close = document.createElement('span');
    this.close.innerHTML = `
      <svg fill="none" viewBox="0 0 16 16" width="1em" height="1em">
      <path
        fill="currentColor"
        d="M8 8.92L11.08 12l.92-.92L8.92 8 12 4.92 11.08 4 8 7.08 4.92 4 4 4.92 7.08 8 4 11.08l.92.92L8 8.92z"
        fill-opacity="0.9"
      ></path>
    </svg>`;
    let body = document.createElement('div');
    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute('frameborder', '0');
    this.box.className = 'meta2d-dialog_mask';
    this.dialog.className = 'meta2d-dialog';
    body.className = 'meta2d-dialog_body';
    header.className = 'meta2d-dialog_header';
    this.title.className = 'meta2d-dialog-content';
    this.close.className = 'meta2d-dialog-close';

    header.appendChild(this.title);
    header.appendChild(this.close);
    body.appendChild(this.iframe);
    this.dialog.appendChild(header);
    this.dialog.appendChild(body);
    this.box.appendChild(this.dialog);
    parentElement.appendChild(this.box);

    this.dialog.onclick = (e) => {
      e.stopPropagation();
    };
    this.box.onclick = () => {
      this.hide();
    };
    this.close.onclick = () => {
      this.hide();
    };

    let sheet: any;
    for (let i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].title === 'le5le.com/dialog') {
        sheet = document.styleSheets[i];
      }
    }

    if (!sheet) {
      let style = document.createElement('style');
      style.type = 'text/css';
      style.title = 'le5le.com/dialog';
      document.head.appendChild(style);

      style = document.createElement('style');
      style.type = 'text/css';
      document.head.appendChild(style);
      sheet = style.sheet;
      sheet.insertRule(
        `.meta2d-dialog_mask {
        display: none;
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
        background-color: #0000006f;
        z-index: 9999;`
      );
      sheet.insertRule(
        `.meta2d-dialog_mask .meta2d-dialog {
            position: absolute;
            top: 15vh;
            left: 10%;
            width: 80%;
            padding: 16px 20px;
            border-radius: 9px;
            background-color: #1e2430;
            z-index: 19999;
            overflow: auto;
        }`
      );
      sheet.insertRule(
        `.meta2d-dialog_header {
            display: flex;
        }`
      );
      sheet.insertRule(
        `.meta2d-dialog-content {
            width: calc(100% - 20px);
            font-weight: 600;
            font-size: 14px;
            color: #bdc7db;
        }`
      );
      sheet.insertRule(
        `.meta2d-dialog-close {
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            color: #617b91;
        }`
      );
      sheet.insertRule(
        `.meta2d-dialog-close :hover{
            cursor: pointer;
        }`
      );
      sheet.insertRule(
        `.meta2d-dialog_body{
            margin-top: 4px;
        } `
      );
      sheet.insertRule(
        `.meta2d-dialog_body iframe{
            width: 100%;
            height: 400px;
        }`
      );
    }
  }

  show(title?: string, url?: string) {
    this.box.style.display = 'block';
    url && this.iframe.setAttribute('src', url);
    title && (this.title.innerText = title);
  }

  hide() {
    this.box.style.display = 'none';
  }

  destroy() {
    this.dialog.onclick = undefined;
    this.box.onclick = undefined;
    this.close.onclick = undefined;
  }
}
