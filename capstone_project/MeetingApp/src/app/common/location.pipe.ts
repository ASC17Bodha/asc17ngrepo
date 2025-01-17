import { Pipe, PipeTransform } from '@angular/core';
import { ILocation } from '../workshops/models/IWorkshop';

@Pipe({
  name: 'location',
  standalone: true
})
export class LocationPipe implements PipeTransform {

  transform(
    location:ILocation,
    format:'short'|'long'='long',
    numChars=40
  ): string {
    let locationstr= `${location.address}, ${location.city}, ${location.state}`;
    if(format==='short'){
      if(locationstr.length>numChars){
        locationstr=locationstr.substring(0,numChars)+'...';
      }
    }
    return locationstr;
  }

}
