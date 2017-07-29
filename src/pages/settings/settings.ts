import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController } from 'ionic-angular';

import { SettingsService } from '../../providers/settings.service';
import { SettingsModel } from '../../models/settings.model';
import passages from '../../data/passages';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {

  private _passages: any = null;
  private _settings: SettingsModel = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _loadingCtrl: LoadingController,
    private _toastController: ToastController,
    private _settingsService: SettingsService) {
      this._passages = passages;
      this._settings = this._settingsService.getDefaultSettings();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }

  ionViewDidEnter() {
    let loading = this._loadingCtrl.create({
      content: 'Retrieving stored settings ...'
    });
    loading.present();

    this._settingsService.getSettings()
    .then(settings => {
      this._settings = settings;
      loading.dismiss();
      console.log('Stored settings retrieved.', this._settings);
    })
    .catch(error => {
      console.log('Error', error);
      loading.dismiss();
      this._createToast(
        'Failed to retrieve stored settings. Error: ' + error,
        2000
      );
    });
  }

  resetSettingsHandler() {
    let loading = this._loadingCtrl.create({
      content: 'Resetting settings ...'
    });
    loading.present();

    this._settingsService.reset()
    .then(() => {
      this._createToast('Reset settings to default.');

      this._settingsService.getSettings()
      .then(settings => {
        this._settings = settings;
        loading.dismiss();
        console.log('Reset settings to default.', this._settings);
      })
      .catch(error => {
        console.log('Error', error);
        loading.dismiss();
      });
    })
    .catch(error => {
      console.log('Error', error);
      loading.dismiss();
      this._createToast(
        'Failed to reset settings. Error: ' + error,
        2000
      );
    });
  }

  private _createToast(message: string, duration: number = 1000,
    position: string = 'top') {
    let toast = this._toastController.create({
      message: message,
      duration: duration,
      position: position
    });
    toast.present();
  }

} //end Settings class