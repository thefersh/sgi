import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { WindowService } from './services/window.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isElectron = false;
  titlePage = '';
  status = '';
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private w: WindowService,
    private title: Title
  ) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);
    this.w.title.subscribe(s => {
      this.titlePage = s;
      this.title.setTitle(s);
    });
    this.w.status.subscribe(s => this.status = s);

    if (this.electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
      this.isElectron = true;
    }else {
      this.isElectron = false;
    }
  }

  windowAction(d: string): void{
    this.electronService.ipcRenderer.send('windowAction', d);
  }
}
