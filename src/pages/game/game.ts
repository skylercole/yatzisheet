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
	players;
	playersClass;
	
	constructor(public navCtrl: NavController, private alertCtrl: AlertController, public playersData: PlayersData, public popoverCtrl: PopoverController,
		private keyboard: Keyboard) {
			
		// Attempt to load data if players array is empty.
		if (playersData.players.length == 0)
			this.playersData.load();
		
		this.players = playersData.players;
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
			if (this.players[index].ones != undefined && 
				this.players[index].twos != undefined &&
				this.players[index].threes != undefined &&
				this.players[index].fours != undefined &&
				this.players[index].fives != undefined &&
				this.players[index].sixes != undefined) {
					
					var val = this.calcUpper(index);					
					
					if (val >= 0) {
						this.players[index].upperTotal = val + 50;
					}
					else {
						this.players[index].upperTotal = 0;
					}
			}			
		}
		else {
				this.players[index].upperTotal = 0;
		}
		
		this.players[index].total = this.calcLower(index) + this.players[index].upperTotal;
		
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
		this.players[index].total = this.calcLower(index) + this.players[index].upperTotal;
		
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
		for(var i=0;i<this.players.length;i++) {
			if (this.players[i].isInGame) {
				this.players[i].games++;
				
				if (this.players[i].upperTotal > 0)
					this.players[i].upstairs++;
				
				if (this.players[i].yatzy > 0)
					this.players[i].yatzis++;
				
				this.players[i].avgPoints = Math.round((this.players[i].avgPoints + this.players[i].total) / this.players[i].games);
				
				if (this.players[i].total > this.players[i].bestResult)
					this.players[i].bestResult = this.players[i].total;
				
				if (this.players[i].total < this.players[i].worstResult || this.players[i].worstResult == 0)
					this.players[i].worstResult = this.players[i].total;
			}				
		}
	}
	
	include(arr, obj) {
		for(var i=0; i<arr.length; i++) {
			if (arr[i] == obj) return true;
		}
	}
	
	calcLower(index) {
		return this.calcLowerValue(this.players[index].pair) +
			this.calcLowerValue(this.players[index].twopair) +
			this.calcLowerValue(this.players[index].threesome) +
			this.calcLowerValue(this.players[index].foursome) +
			this.calcLowerValue(this.players[index].sStraight, "sStraight") +
			this.calcLowerValue(this.players[index].bStraight, "bStraight") +
			this.calcLowerValue(this.players[index].fullhouse) +
			this.calcLowerValue(this.players[index].chance) + 
			this.calcLowerValue(this.players[index].yatzy);
	}
	
	calcLowerValue(val, straightType: string = ""){
		if (this.include(['-', undefined], val))
			return 0;
			
		if (this.include(['X','x'], val) && straightType == "sStraight")
			return 15;
		
		if (this.include(['X','x'], val) && straightType == "bStraight")
			return 20;
		
		return parseInt(val);
	}
	
	calcUpper(index) {
		return this.calcUpperValue(this.players[index].ones) +
			this.calcUpperValue(this.players[index].twos) +
			this.calcUpperValue(this.players[index].threes) +
			this.calcUpperValue(this.players[index].fours) +
			this.calcUpperValue(this.players[index].fives) +
			this.calcUpperValue(this.players[index].sixes);
	}
	
	calcUpperValue(val){
		if (this.include(['X','x', undefined], val))
				return 0;
		
		return parseInt(val);
	}
	
	getUpperValidationArray(elementName){
		switch(elementName){
			case 'ones': 				
				return ['X','x','-1','+1','1','-2','+2','2','0'];
			case 'twos': 
				return ['X','x','-2','+2','2','-4','+4','4','0'];
			case 'threes': 
				return ['X','x','-3','+3','3','-6','+6','6','0'];
			case 'fours': 
				return ['X','x','-4','+4','4','-8','+8','8','0'];
			case 'fives': 
				return ['X','x','-5','+5','5','-10','+10','10','0'];
			case 'sixes': 
				return ['X','x','-6','+6','6','-12','+12','12','0'];
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
		for(var i=0; i< this.players.length; i++) {
			if (this.players[i].isInGame)
				if (this.players[i].ones == '' || this.players[i].ones == undefined ||
					this.players[i].twos == '' || this.players[i].twos == undefined ||
					this.players[i].threes == '' || this.players[i].threes == undefined ||
					this.players[i].fours == '' || this.players[i].fours == undefined ||
					this.players[i].fives == '' || this.players[i].fives == undefined ||
					this.players[i].sixes == '' || this.players[i].sixes == undefined ||
					this.players[i].pair == '' || this.players[i].pair == undefined ||
					this.players[i].twopair == '' || this.players[i].twopair == undefined ||
					this.players[i].threesome == '' || this.players[i].threesome == undefined ||
					this.players[i].foursome == '' || this.players[i].foursome == undefined ||
					this.players[i].sStraight == '' || this.players[i].sStraight == undefined ||
					this.players[i].bStraight == '' || this.players[i].bStraight == undefined ||
					this.players[i].fullhouse == '' || this.players[i].fullhouse == undefined ||
					this.players[i].chance == '' || this.players[i].chance == undefined ||
					this.players[i].yatzy == '' || this.players[i].yatzy == undefined)
					return false;
		}
		
		return true;
	}
	
	handleEnter() {
		this.keyboard.close();
	}
}