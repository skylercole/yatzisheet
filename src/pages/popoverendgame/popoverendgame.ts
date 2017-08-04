import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { PlayersData } from '../../app/playersdata';

@Component({
	templateUrl: 'popoverendgame.html'
})

export class PopoverEndGamePage {
	playersClass;
	
	constructor(public viewCtrl: ViewController, public playersData: PlayersData) {
		this.playersClass = playersData;
	}

	close() {
		this.viewCtrl.dismiss();
	}
}