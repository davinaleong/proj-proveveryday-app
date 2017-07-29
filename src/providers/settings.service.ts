import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SettingsModel } from '../models/settings.model';

import { Translation } from '../interfaces/translation.interface';
import { PassagesService } from './passages.service';

export const SETTINGS_KEY: string = 'settings';

@Injectable()
export class SettingsService {

    private _defaultSettings: SettingsModel = null;

    constructor(
        private _storage: Storage,
        private _passagesService: PassagesService
    ) {
        let kjv: Translation = this._passagesService.findTranslation(5);
        
        this._defaultSettings = new SettingsModel(
            this.themes[1].toLocaleLowerCase(),
            kjv.id,
            this.views[1].toLocaleLowerCase(),
            this.fontSizes[1].toLocaleLowerCase(),
            this.fontTypes[0].toLocaleLowerCase()
        );
    }

    public getSettings(): Promise<any> {
        return this._storage.get(SETTINGS_KEY);
    }

    public setSettings(settings: SettingsModel): Promise<any> {
        return this._storage.set(SETTINGS_KEY, settings);
    }

    public reset(): Promise<any> {
        return this.setSettings(this._defaultSettings);
    }

    public getDefaultSettings(): SettingsModel {
        return this._defaultSettings;
    }

    public get themes(): string[] {
        return [
            'Dark',
            'Light'
        ];
    }

    public get fontSizes(): string[] {
        return [
            'Small',
            'Medium',
            'Large'
        ];
    }

    public get fontTypes(): string[] {
        return [
            'Sans-Serif',
            'Serif'
        ];
    }

    public get views(): string[] {
        return [
            'Grid',
            'Paragraph'
        ]
    }

} //end SettingsService class