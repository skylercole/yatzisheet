import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})

export class GamePage {
	players: Array<{name: string, upperTotal: number, 
		ones: string, twos: string, threes: string, fours: string, fives: string, sixes: string,
		}>;
	
	constructor(public navCtrl: NavController) {
		this.players = [
			{name:'Stasho', upperTotal: 0, 
				ones:undefined, twos: undefined, threes: undefined, fours: undefined, fives: undefined, sixes: undefined},
			{name:'Kati', upperTotal: 0, 
				ones:undefined, twos: undefined, threes: undefined, fours: undefined, fives: undefined, sixes: undefined},	
			{name:'Heli', upperTotal: 0, 
				ones:undefined, twos: undefined, threes: undefined, fours: undefined, fives: undefined, sixes:undefined},
			{name:'Kari', upperTotal: 0, 
				ones:undefined, twos: undefined, threes: undefined, fours: undefined, fives: undefined, sixes: undefined},
		];
	}
  
	onChangeUpperSide(data, player, elementName){
		var name = player.name + '[' + elementName + ']';
		
		if (!this.include(this.getUpperValidationArray(elementName), data)) {
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
	}
	
	include(arr, obj) {
		for(var i=0; i<arr.length; i++) {
			if (arr[i] == obj) return true;
		}
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
		if (this.include(['X','x'], val))
				return 0;
		
		return parseInt(val);
	}
	
	getUpperValidationArray(elementName){
		switch(elementName){
			case 'ones': 				
				return ['X','x','-1','+1','1','-2','+2','2'];
			case 'twos': 
				return ['X','x','-2','+2','2','-4','+4','4'];
			case 'threes': 
				return ['X','x','-3','+3','3','-6','+6','6'];
			case 'fours': 
				return ['X','x','-4','+4','4','-8','+8','8'];
			case 'fives': 
				return ['X','x','-5','+5','5','-10','+10','10'];
			case 'sixes': 
				return ['X','x','-6','+6','6','-12','+12','12'];
		}
	}
}