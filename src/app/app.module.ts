import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterPreviewComponent } from './components/character-preview/character-preview.component';
import { ChooseCharacterComponent } from './components/choose-character/choose-character.component';
import { DressupOptionsComponent } from './components/dressup-options/dressup-options.component';

@NgModule({
  declarations: [
    AppComponent,
    DressupOptionsComponent,
    ChooseCharacterComponent,
    CharacterPreviewComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
