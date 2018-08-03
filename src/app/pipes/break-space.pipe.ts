import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breakSpace'
})
export class BreakSpacePipe implements PipeTransform {

  transform(value: any): any {
    let x = value;
    if(value.length >= 16){
      x = value.substr(0, 16);
      x = x+'...';
    }

    return x;
  }

}
