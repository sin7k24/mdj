import { Pipe, PipeTransform } from '@angular/core';
import { marked } from "marked";
// import * as marked from "marked"; 

@Pipe({
  name: 'marked'
})
export class MarkedPipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    if (value && value.length > 0) {
      return marked.parse(value);
    }
    return value;  }
}
