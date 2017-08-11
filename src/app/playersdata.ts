import {Injectable} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage';
import {Platform} from 'ionic-angular';

@Injectable()
export class PlayersData {
	
  public players: Array<{name: string, 
		upstairs: number, yatzis: number, avgPoints: number, bestResult: number, worstResult: number,
		isInGame: boolean, games: number, upperTotal: number, total: number,
		ones: string, twos: string, threes: string, fours: string, fives: string, sixes: string,
		pair: string, twopair: string, threesome: string, foursome: string, sStraight: string, bStraight: string, fullhouse: string, chance: string, yatzy:string }>;
  
  constructor(private nativeStorage: NativeStorage, platform: Platform) {
	  	this.players = [];
		this.load();
  }
  
  add(name, isInGame) {
	  if (this.exists(name) == -1) {
			this.players.push({name:name, 
				upstairs: 0, yatzis: 0, avgPoints: 0, bestResult: 0, worstResult: 0,
				isInGame: isInGame, games: 0, upperTotal: 0, total: 0, 
				ones:undefined, twos: undefined, threes: undefined, fours: undefined, fives: undefined, sixes: undefined,
				pair: undefined, twopair: undefined, threesome: undefined, foursome: undefined, sStraight: undefined, bStraight: undefined, fullhouse: undefined, chance: undefined, yatzy:undefined});			
			this.save();
		}
  }
  
  exists(name) {
		for (var index=0; index<this.players.length; index++ ) {
			if (this.players[index].name == name ) {
				return index;
			}
		}
		
		return -1;
  }
  
  areInGame() {
	  var group = [];
	  
	  for (var index=0; index<this.players.length; index++ ) {
		  if (this.players[index].isInGame) {
			  group.push(this.players[index]);
		  }
	  }
	  
	  return group;
  }
  
  endGameResults() {
	  var group = [];
	  
	  for (var index=0; index<this.players.length; index++ ) {
		  if (this.players[index].isInGame) {
			  group.push(this.players[index]);
		  }
	  }
	  
	  group.sort(function(a, b) {
			return parseFloat(b.total) - parseFloat(a.total);
		});
	  
	  return group;
  }
  
  resetGameStats() {
	  for (var index=0; index<this.players.length; index++ ) {
		  if (this.players[index].isInGame) {
			this.players[index].upperTotal = this.players[index].total = 0;
			
			this.players[index].ones = this.players[index].twos = this.players[index].threes = this.players[index].fours = this.players[index].fives = this.players[index].sixes =
				this.players[index].pair = this.players[index].twopair = this.players[index].threesome = this.players[index].foursome = this.players[index].sStraight = 
				this.players[index].bStraight = this.players[index].fullhouse = this.players[index].chance = this.players[index].yatzy = '';
		  }
		}
  }
  
  renamePlayer(oldName, newName) {
		var index = this.exists(oldName);
		if (index > -1) {
			this.players[index].name = newName;
			this.save();
		}
  }
  
  deletePlayer(name) {
		var index = this.exists(name);
		if (index > -1) {
			this.players.splice(index, 1);
			this.save();
		}
  }
  
  isAnyPlayerInGame() {
	  for (var i = 0; i < this.players.length; i++) {
		if (this.players[i].isInGame)
			return true;
	  }		  
	  
	  return false;
  }
  
  load() {
	  this.nativeStorage.getItem('yatzisheet').then((json) => {
			if (json) {
				this.players = JSON.parse(json);				
				for(var index=0; index<this.players.length; index++ ) {
					this.players[index].isInGame = false;
					this.players[index].upperTotal = this.players[index].total = 0;			
					this.players[index].ones = this.players[index].twos = this.players[index].threes = this.players[index].fours = this.players[index].fives = this.players[index].sixes =
						this.players[index].pair = this.players[index].twopair = this.players[index].threesome = this.players[index].foursome = this.players[index].sStraight = 
						this.players[index].bStraight = this.players[index].fullhouse = this.players[index].chance = this.players[index].yatzy = '';
					
				}
				this.resetGameStats();
			 }
			}, error => console.error('Error loading players.', error)
		);
  }
  
  save() {
	  this.nativeStorage.setItem('yatzisheet', JSON.stringify(this.players)).then(
			() => {},
			error => console.error('Error storing players.', error)
		);
  }
}