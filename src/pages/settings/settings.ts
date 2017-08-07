import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsData } from '../../app/settingsdata';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {
	settingsClass;
	newPlayerName: string;
	isRenaming: string;
	copyName: string;

	constructor(public navCtrl: NavController, public settingsData: SettingsData) {
		this.settingsClass = settingsData;				
	}	
	
	updateHideTotal() {
		this.settingsClass.save();
	}
	
	updateGame(game) {
		this.settingsClass.settings.yatziGameType = game;
		this.settingsClass.save();
	}
}