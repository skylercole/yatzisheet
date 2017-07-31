import {Injectable} from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import {Platform} from 'ionic-angular';

@Injectable()
export class PlayersData {
	
  public players: Array<{name: string, upperTotal: number, total: number,
		ones: string, twos: string, threes: string, fours: string, fives: string, sixes: string,
		pair: string, twopair: string, threesome: string, foursome: string, sStraight: string, bStraight: string, fullhouse: string, chance: string, yatzy:string
	}>;
  
  constructor() {
    this.players = [
			// {name:'Stasho', upperTotal: 0, total: 0, 
				// ones:undefined, twos: undefined, threes: undefined, fours: undefined, fives: undefined, sixes: undefined,
				// pair: undefined, twopair: undefined, threesome: undefined, foursome: undefined, sStraight: undefined, bStraight: undefined, fullhouse: undefined, chance: undefined, yatzy:undefined},
			// {name:'Kati', upperTotal: 0, total: 0, 
				// ones:undefined, twos: undefined, threes: undefined, fours: undefined, fives: undefined, sixes: undefined,
				// pair: undefined, twopair: undefined, threesome: undefined, foursome: undefined, sStraight: undefined, bStraight: undefined, fullhouse: undefined, chance: undefined, yatzy:undefined},	
			// {name:'Heli', upperTotal: 0, total: 0, 
				// ones:undefined, twos: undefined, threes: undefined, fours: undefined, fives: undefined, sixes: undefined,
				// pair: undefined, twopair: undefined, threesome: undefined, foursome: undefined, sStraight: undefined, bStraight: undefined, fullhouse: undefined, chance: undefined, yatzy:undefined},
			// {name:'Kari', upperTotal: 0, total: 0, 
				// ones:undefined, twos: undefined, threes: undefined, fours: undefined, fives: undefined, sixes: undefined,
				// pair: undefined, twopair: undefined, threesome: undefined, foursome: undefined, sStraight: undefined, bStraight: undefined, fullhouse: undefined, chance: undefined, yatzy:undefined}
		];
  }
  
  addNew(nameToAdd, isInGame) {
		if (!isInGame){
			var index = this.exists(nameToAdd);
			if (index > -1) {
				this.players.splice(index, 1);
			}
		}
		else if (isInGame) {
			this.players.push({name:nameToAdd, upperTotal: 0, total: 0, 
				ones:undefined, twos: undefined, threes: undefined, fours: undefined, fives: undefined, sixes: undefined,
				pair: undefined, twopair: undefined, threesome: undefined, foursome: undefined, sStraight: undefined, bStraight: undefined, fullhouse: undefined, chance: undefined, yatzy:undefined});
		}
  }
  
  exists(nameToAdd) {
		for (var index=0; index<this.players.length; index++ ) {
			if (this.players[index].name == nameToAdd ) {
				return index;
			}
		}
		
		return -1;
  }
  
  resetGameStats() {
	  for (var index=0; index<this.players.length; index++ ) {
			this.players[index].upperTotal = this.players[index].total = 0;
			
			this.players[index].ones = this.players[index].twos = this.players[index].threes = this.players[index].fours = this.players[index].fives = this.players[index].sixes =
				this.players[index].pair = this.players[index].twopair = this.players[index].threesome = this.players[index].foursome = this.players[index].sStraight = 
				this.players[index].bStraight = this.players[index].fullhouse = this.players[index].chance = this.players[index].yatzy = '';
		}
  }
  
  renamePlayer(oldName, newName) {
		var index = this.exists(oldName);
		this.players[index].name = newName;
  }
}
  
@Injectable()
export class PlayersBase {
	
  public players: Array<{name: string, isInGame: boolean, games: number}>;
  
  constructor(private nativeStorage: NativeStorage, platform: Platform) {
	this.players = [];
	
    // this.players = [
			  // {name:'Stasho', isInGame: false, games: 15},
			  // {name:'Kati', isInGame: false, games: 10},
			 // {name:'Heli', isInGame: false},
			 // {name:'Kari', isInGame: false}
		// ];
  }
  
  load() {
	  this.nativeStorage.getItem('yatzisheet').then((json) => {
			if (json) {
				this.players = JSON.parse(json);
				
				for(var index=0; index<this.players.length; index++ ) {
					this.players[index].isInGame = false;
				}
			 }
			}, err => console.log(err)
		);
  }
  
  save() {
	  this.nativeStorage.setItem('yatzisheet', JSON.stringify(this.players)).then(
			() => console.log('Stored item!'),
			error => console.error('Error storing item', error)
		);
  }
  
  addNew(nameToAdd) {
		if (this.exists(nameToAdd) == -1) {
			this.players.push({name:nameToAdd, isInGame: true, games: 0});			

			this.save();
		}
  }
  
  exists(nameToAdd) {
		for (var index=0; index<this.players.length; index++ ) {
			if (this.players[index].name == nameToAdd ) {
				return index;
			}
		}
		
		return -1;
  }
  
  deletePlayer(name) {
		var index = this.exists(name);
		if (index > -1) {
			this.players.splice(index, 1);
			
			this.save();
		}
  }
  
  renamePlayer(oldName, newName) {
		var index = this.exists(oldName);
		this.players[index].name = newName;
		
		this.save();
  }
}