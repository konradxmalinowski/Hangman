import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LetterComponent } from './letter/letter.component';
import { LeftChancesComponent } from './left-chances/left-chances.component';
import { FieldComponent } from './field/field.component';
import { SettingsComponent } from './settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LetterComponent,
    LeftChancesComponent,
    FieldComponent,
    SettingsComponent,
    DialogComponent,
  ],
  imports: [BrowserModule, HttpClientModule, MatDialogModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
