import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayersData } from '../../app/playersdata';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../../pages/popover/popover';
import { PopoverEndGamePage } from '../../pages/popoverendgame/popoverendgame';
import { AlertController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})

export class GamePage {
	playersClass;
	
	constructor(public navCtrl: NavController, private alertCtrl: AlertController, public playersData: PlayersData, public popoverCtrl: PopoverController,
		private keyboard: Keyboard) {
			
		// Attempt to load data if players array is empty.
		if (playersData.players.length == 0)
			this.playersData.load();
		
		this.playersClass = playersData;
	}
	
	addPlayers(myEvent) {
		let popover = this.popoverCtrl.create(PopoverPage);
		popover.present({
		  ev: myEvent
		});
	}
	
	onChangeUpperSide(data, player, elementName){
		var name = player.name + '[' + elementName + ']';
		
		if (data != "" && !this.include(this.getUpperValidationArray(elementName), data)) {
			data = undefined;										
			document.getElementById(name).style.border = "thin solid red";
		}
		else if (data == "") {
			data = undefined;
			document.getElementById(name).style.border = "none";
		}
		else {
			document.getElementById(name).style.border = "none";
		}
				
		switch(elementName){
			case 'ones': {		
				player.ones = data;
				break;
			}
			case 'twos': {
				player.twos = data;
				break;
			}	
			case 'threes': {
				player.threes = data;
				break;
			}	
			case 'fours': {
				player.fours = data;				
				break;
			}	
			case 'fives': {
				player.fives = data;
				break;
			}	
			case 'sixes': {
				player.sixes = data;
			}	
		}		
		
		var index = this.playersClass.exists(player.name);
		
		if (data != undefined) {			
			if (this.playersClass.players[index].ones != undefined && 
				this.playersClass.players[index].twos != undefined &&
				this.playersClass.players[index].threes != undefined &&
				this.playersClass.players[index].fours != undefined &&
				this.playersClass.players[index].fives != undefined &&
				this.playersClass.players[index].sixes != undefined) {
					
					var val = this.calcUpper(index);					
					
					if (val >= 0) {
						this.playersClass.players[index].upperTotal = val + 50;
					}
					else {
						this.playersClass.players[index].upperTotal = 0;
					}
			}			
		}
		else {
				this.playersClass.players[index].upperTotal = 0;
		}
		
		this.playersClass.players[index].total = this.calcLower(index) + this.playersClass.players[index].upperTotal;
		
		if (this.isGameCompleted())
			this.showCompleted();
	}
	
	onChangeLowerSide(data, player, elementName){
		var name = player.name + '[' + elementName + ']';
		
		if (data != "" && !this.include(this.getLowerValidationArray(elementName), data)) {
			data = undefined;										
			document.getElementById(name).style.border = "thin solid red";
		}
		else if (data == "") {
			data = undefined;
			document.getElementById(name).style.border = "none";
		}
		else {
			document.getElementById(name).style.border = "none";
		}
				
		switch(elementName){
			case 'pair': {		
				player.pair = data;
				break;
			}
			case 'twopair': {
				player.twopair = data;
				break;
			}	
			case 'threesome': {
				player.threesome = data;
				break;
			}	
			case 'foursome': {
				player.foursome = data;				
				break;
			}	
			case 'sStraight': {
				player.sStraight = data;
				break;
			}	
			case 'bStraight': {
				player.bStraight = data;
				break;
			}
			case 'fullhouse': {
				player.fullhouse = data;
				break;
			}
			case 'chance': {
				player.chance = data;
				break;
			}
			case 'yatzy': {
				player.yatzy = data;
				break;
			}			
		}		
		
		var index = this.playersClass.exists(player.name);
		this.playersClass.players[index].total = this.calcLower(index) + this.playersClass.players[index].upperTotal;
		
		if (this.isGameCompleted())
			this.showCompleted();
	}
	
	showCompleted() {
		let popover = this.popoverCtrl.create(PopoverEndGamePage);
		popover.present();
		this.updateGameStats();
		this.playersClass.save();
	}
	
	updateGameStats() {
		for(var i=0;i<this.playersClass.players.length;i++) {
			if (this.playersClass.players[i].isInGame) {
				this.playersClass.players[i].games++;
				
				if (this.playersClass.players[i].upperTotal > 0)
					this.playersClass.players[i].upstairs++;
				
				if (this.playersClass.players[i].yatzy > 0)
					this.playersClass.players[i].yatzis++;
				
				this.playersClass.players[i].avgPoints = Math.round((this.playersClass.players[i].avgPoints + this.playersClass.players[i].total) / this.playersClass.players[i].games);
				
				if (this.playersClass.players[i].total > this.playersClass.players[i].bestResult)
					this.playersClass.players[i].bestResult = this.playersClass.players[i].total;
				
				if (this.playersClass.players[i].total < this.playersClass.players[i].worstResult || this.playersClass.players[i].worstResult == 0)
					this.playersClass.players[i].worstResult = this.playersClass.players[i].total;
			}				
		}
	}
	
	include(arr, obj) {
		for(var i=0; i<arr.length; i++) {
			if (arr[i] == obj) return true;
		}
	}
	
	calcLower(index) {
		return this.calcLowerValue(this.playersClass.players[index].pair) +
			this.calcLowerValue(this.playersClass.players[index].twopair) +
			this.calcLowerValue(this.playersClass.players[index].threesome) +
			this.calcLowerValue(this.playersClass.players[index].foursome) +
			this.calcLowerValue(this.playersClass.players[index].sStraight, "sStraight") +
			this.calcLowerValue(this.playersClass.players[index].bStraight, "bStraight") +
			this.calcLowerValue(this.playersClass.players[index].fullhouse) +
			this.calcLowerValue(this.playersClass.players[index].chance) + 
			this.calcLowerValue(this.playersClass.players[index].yatzy);
	}
	
	calcLowerValue(val, straightType: string = ""){
		if (this.include(['-', '', undefined], val))
			return 0;
			
		if (this.include(['X','x'], val) && straightType == "sStraight")
			return 15;
		
		if (this.include(['X','x'], val) && straightType == "bStraight")
			return 20;
		
		return parseInt(val);
	}
	
	calcUpper(index) {
		return this.calcUpperValue(this.playersClass.players[index].ones) +
			this.calcUpperValue(this.playersClass.players[index].twos) +
			this.calcUpperValue(this.playersClass.players[index].threes) +
			this.calcUpperValue(this.playersClass.players[index].fours) +
			this.calcUpperValue(this.playersClass.players[index].fives) +
			this.calcUpperValue(this.playersClass.players[index].sixes);
	}
	
	calcUpperValue(val){
		if (this.include(['-', ''], val))
			return undefined;
		
		if (this.include(['X','x', undefined], val))
				return 0;
		
		return parseInt(val);
	}
	
	getUpperValidationArray(elementName){
		switch(elementName){
			case 'ones': 				
				return ['-','X','x','-1','+1','1','-2','+2','2','0'];
			case 'twos': 
				return ['-','X','x','-2','+2','2','-4','+4','4','0'];
			case 'threes': 
				return ['-','X','x','-3','+3','3','-6','+6','6','0'];
			case 'fours': 
				return ['-','X','x','-4','+4','4','-8','+8','8','0'];
			case 'fives': 
				return ['-','X','x','-5','+5','5','-10','+10','10','0'];
			case 'sixes': 
				return ['-','X','x','-6','+6','6','-12','+12','12','0'];
		}
	}
	
	getLowerValidationArray(elementName){
		switch(elementName){
			case 'pair': 				
				return ['-','0','2','4','6','8','10','12'];
			case 'twopair': 
				return ['-','0','6','8','10','12','14','16','18','20','22'];
			case 'threesome': 
				return ['-','0','3','6','9','12','15','18'];
			case 'foursome': 
				return ['-','0','4','8','12','16','20','24'];
			case 'sStraight': 
				return ['X','x','-','0','15'];
			case 'bStraight': 
				return ['X','x','-','0','20'];
			case 'fullhouse': 
				return ['-','0','7','8','9','11','12','13','14','15','16','17','18','19','21','22','23','24','26','27','28'];
			case 'chance': 
				return ['-','0','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'];
			case 'yatzy': 
				return ['-','0','55','60','65','70','75','80'];
		}
	}
	
	/* removePlayer(player) {
		let alert = this.alertCtrl.create({
		title: 'Confirm removing',
		message: 'Do you want to remove player ' + player.name + ' from this game?',
		buttons: [
		  {
			text: 'Cancel',
			role: 'cancel',
			handler: () => {
			  // console.log('Cancel clicked');
			}
		  },
		  {
			text: 'Remove',
			handler: () => {
			  var index = this.playersClass.exists(player.name);
			  this.players[index].isInGame = false;
			}
		  }
		]
	  });
	  alert.present();
	} */
	
	resetValues() {
		let alert = this.alertCtrl.create({
		message: 'Do you want to reset this game?',
		buttons: [
		  {
			text: 'Cancel',
			role: 'cancel',
			handler: () => {
			}
		  },
		  {
			text: 'Reset',
			handler: () => {
			  this.playersClass.resetGameStats();
			}
		  }
		]
	  });
	  alert.present();
	}
	
	isGameCompleted() {
		for(var i=0; i< this.playersClass.players.length; i++) {
			if (this.playersClass.players[i].isInGame)
				if (this.playersClass.players[i].ones == '' || this.playersClass.playersClass.players[i].ones == undefined ||
					this.playersClass.players[i].twos == '' || this.playersClass.players[i].twos == undefined ||
					this.playersClass.players[i].threes == '' || this.playersClass.players[i].threes == undefined ||
					this.playersClass.players[i].fours == '' || this.playersClass.players[i].fours == undefined ||
					this.playersClass.players[i].fives == '' || this.playersClass.players[i].fives == undefined ||
					this.playersClass.players[i].sixes == '' || this.playersClass.players[i].sixes == undefined ||
					this.playersClass.players[i].pair == '' || this.playersClass.players[i].pair == undefined ||
					this.playersClass.players[i].twopair == '' || this.playersClass.players[i].twopair == undefined ||
					this.playersClass.players[i].threesome == '' || this.playersClass.players[i].threesome == undefined ||
					this.playersClass.players[i].foursome == '' || this.playersClass.players[i].foursome == undefined ||
					this.playersClass.players[i].sStraight == '' || this.playersClass.players[i].sStraight == undefined ||
					this.playersClass.players[i].bStraight == '' || this.playersClass.players[i].bStraight == undefined ||
					this.playersClass.players[i].fullhouse == '' || this.playersClass.players[i].fullhouse == undefined ||
					this.playersClass.players[i].chance == '' || this.playersClass.players[i].chance == undefined ||
					this.playersClass.players[i].yatzy == '' || this.playersClass.players[i].yatzy == undefined)
					return false;
		}
		
		return true;
	}
	
	handleEnter() {
		this.keyboard.close();
	}
}