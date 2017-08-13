import {Injectable} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage';
import {Platform} from 'ionic-angular';

@Injectable()
export class SettingsData {
	
  public settings: {hideTotal: boolean, yatziGameType: number };
  
  constructor(private nativeStorage: NativeStorage, platform: Platform) {
	  this.settings = { hideTotal: false, yatziGameType: 0 }; // 0: nordic traditional, 1: nordic alternative
	  this.load();
  }
  
  load() {
	  this.nativeStorage.getItem('yatzisheetsettings').then((json) => {
			if (json) {
				this.settings = JSON.parse(json);				
			 }
			}, error => console.error('Error loading yatzi settings.', error)
		);
  }
  
  save() {
	  this.nativeStorage.setItem('yatzisheetsettings', JSON.stringify(this.settings)).then(
			() => {},
			error => console.error('Error storing yatzi settings.', error)
		);
  }
}