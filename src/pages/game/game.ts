import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayersData } from '../../app/playersdata';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../../pages/popover/popover';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})

export class GamePage {
	players;
	playersClass;
	
	constructor(public navCtrl: NavController, private alertCtrl: AlertController, public playersData: PlayersData, public popoverCtrl: PopoverController) {
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
		
		var index = this.players.findIndex(x => x.name == player.name);
		
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
	}
	
	onChangeLowerSide(data, player, elementName){
		var name = player.name + '[' + elementName + ']';
		
		if (data != "" && !this.include(this.getLowerValidationArray(elementName), data)) {
			data = undefined;										
			document.getElementById(name).style.border = "thin solid red";
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
		
		var index = this.players.findIndex(x => x.name == player.name);		
		this.players[index].total = this.calcLower(index) + this.players[index].upperTotal;
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
	
	removePlayer(player) {
		let alert = this.alertCtrl.create({
		// title: 'Confirm removing',
		message: 'Do you want to remove player from this game?',
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
			  this.playersClass.addNew(player.name, false);
			}
		  }
		]
	  });
	  alert.present();
	}
	
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
}