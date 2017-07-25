import { Component, ViewChild } from '@angular/core';
import {
  Nav,
  Platform,
  MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PassagesService } from '../providers/passages.service';
import { MenuItemModel } from '../models/menu-item.model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'Tabs';

  menuItems: MenuItemModel[] = null;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _passagesService: PassagesService,
    private _menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.menuItems = [
      new MenuItemModel('SelectTranslation', 'Bible Translations', 'book'),
      new MenuItemModel('Settings', 'Settings', 'settings')
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.selectTodaysChapter();
  }

  openPage(pageName: string) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(pageName);
    this._menuCtrl.close();
  }

  todaysChapterHandler() {
    this.selectTodaysChapter();
    this.nav.setRoot('Tabs');
  }

  private selectTodaysChapter() {
    let today = new Date();
    this._passagesService.selectedChapterNo = today.getDate();
  }

} //end MyApp class
