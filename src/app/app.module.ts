import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { GamePage } from '../pages/game/game';
import { PlayersPage } from '../pages/players/players';
import { StatisticsPage } from '../pages/statistics/statistics';
import { PopoverPage } from '../pages/popover/popover';
import { PopoverEndGamePage } from '../pages/popoverendgame/popoverendgame';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PlayersData} from './playersdata';
import { NativeStorage } from '@ionic-native/native-storage';
import { Keyboard } from '@ionic-native/keyboard';

@NgModule({
  declarations: [
    MyApp,
    GamePage,
    PlayersPage,
    StatisticsPage	,
	PopoverPage,
	PopoverEndGamePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamePage,
    PlayersPage,
    StatisticsPage,
	PopoverPage,
	PopoverEndGamePage
  ],
  providers: [	
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
	PlayersData,
	NativeStorage,
	Keyboard
  ]
})
export class AppModule {}
