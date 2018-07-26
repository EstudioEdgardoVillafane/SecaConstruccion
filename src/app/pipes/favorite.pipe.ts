import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favorite'
})
export class FavoritePipe implements PipeTransform {

  transform(value: any): any {
    return (value === 0) ? 'star_border' : 'star';
  }

}
