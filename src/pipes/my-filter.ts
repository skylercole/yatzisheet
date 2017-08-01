import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'is-in-game-filter',
    pure: false
})

@Injectable()
export class MyFilterPipe implements PipeTransform {
	
	transform(items: any[], args?): any[] {
		return items.filter(item => item.isInGame);
	}
}