import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagesAWS'
})
export class ImagesAWSPipe implements PipeTransform {

  transform(path: any, noImage: any): string {
    if (path !== '' && path !== null && path !== undefined) {
      return path;
    } else {
      return `./assets/images/${noImage}`;
    }
  }

}
