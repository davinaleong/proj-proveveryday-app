import { Injectable } from '@angular/core';
import { Translation } from '../interfaces/translation.interface';
import { Settings } from '../interfaces/settings.interface';

import passages from '../data/passages';
import settings from '../data/settings';

@Injectable()
export class SettingsService {

    private _settings: Settings = null;
    get settings(): Settings {
        return this._settings;
    }
    set settings(settings: Settings) {
        this._settings = settings;
    }

    public themes(): string[] {
        return [
            'Dark',
            'Light'
        ];
    }

    public fontSizes(): string[] {
        return [
            'small',
            'medium',
            'large'
        ];
    }

    public fontTypes(): string[] {
        return [
            'Sans-Serif',
            'Serif'
        ];
    }

    public views(): string[] {
        return [
            'Grid',
            'Paragraph'
        ]
    }

    public translationIds(): number[] {
        let translationIds: number[] = null;
        for (let translation of passages) {
            translationIds.push(translation.id);
        }
        return translationIds;
    }

} //end SettingsService class