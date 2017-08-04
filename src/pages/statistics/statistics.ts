import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayersData } from '../../app/playersdata';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html'
})

export class StatisticsPage {
	players;
	stats1: Array<{name: string, result: number, color: string}>;
	stats2: Array<{name: string, result: number, color: string}>;
	
	@ViewChild('YatziCanvas') yatziCanvas; 
	@ViewChild('UpstairsCanvas') upstairsCanvas; 
    yatziChart: any;
    upstairsChart: any;
	
	constructor(public navCtrl: NavController, public playersData: PlayersData) {
		// Attempt to load data if players array is empty.
		if (playersData.players.length == 0)
			this.playersData.load();
		
		this.players = playersData.players;	
		
		this.stats1 = [];
		this.stats2 = [];
		for(var i = 0; i<this.players.length; i++) {
			if (this.players[i].games > 0) {
				var color = this.getRandomColor();
				this.stats1.push({name:this.players[i].name,result:this.players[i].yatzis/this.players[i].games, color: color});
				this.stats2.push({name:this.players[i].name,result:this.players[i].upstairs/this.players[i].games, color: color});				
			}
		}
	}
	
	ionViewDidLoad() {
		if (this.stats1.length > 0) {
			this.yatziChart = new Chart(this.yatziCanvas.nativeElement, {
				type: 'doughnut',
				data: {
					labels: this.stats1.map(function(a) {return a.name;}),
					datasets: [{
						label: '',
						data: this.stats1.map(function(a) {return a.result;}),
						backgroundColor: this.stats1.map(function(a) {return a.color;}),
						hoverBackgroundColor: this.stats1.map(function(a) {return a.color;}),
					}]
				}
			});
			
			this.upstairsChart = new Chart(this.upstairsCanvas.nativeElement, {	 
				type: 'doughnut',
				data: {
					labels: this.stats2.map(function(a) {return a.name;}),
					datasets: [{
						label: '',
						data: this.stats2.map(function(a) {return a.result;}),
						backgroundColor: this.stats2.map(function(a) {return a.color;}),
						hoverBackgroundColor: this.stats2.map(function(a) {return a.color;}),
					}]
				}
			});
		}
	}
	
	getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}