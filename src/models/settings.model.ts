import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular'

@NgModule({
  declarations: [
    SettingsModel,
  ],
  imports: [
    IonicModule.forRoot(SettingsModel)
  ],
  exports: [
    SettingsModel
  ]
})

export class SettingsModel {

    constructor(
        public theme: string,
        public translationId: number,
        public view: string,
        public fontSize: string,
        public fontType: string
    ) {}

} //end SettingsModel class