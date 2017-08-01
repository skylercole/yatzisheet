import { Pipe, PipeTransform } from '@angular/core';
import {Injectable} from '@angular/core';

/**
 * Generated class for the IsInGameFilterPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'is-in-game-filter',
  pure: false
})
@Injectable()
export class IsInGameFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any[], args?): any {
    return value.filter(item => item.isInGame);
  }
}