import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusProduct'
})
export class StatusProductPipe implements PipeTransform {

  transform(value: any): any {
    return (value.status == 0) ?  null :  value;;
  }

}
