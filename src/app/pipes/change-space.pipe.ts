import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeSpace'
})
export class ChangeSpacePipe implements PipeTransform {

  transform(value: any): any {
    return value.replace(/-/g,' ');
  }

}
