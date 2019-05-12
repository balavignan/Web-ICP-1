import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'removeExtraComma'
})
export class StrinCleaner implements PipeTransform {
    transform( value: string ): string {
        return value.replace(/(,\s,)|(^,)/, '');
    }
}
