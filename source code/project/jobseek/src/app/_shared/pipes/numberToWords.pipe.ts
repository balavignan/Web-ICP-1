import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberToWords'
})
export class NumberToWordsPipe implements PipeTransform {

    a = [
        '',
        'one ',
        'two ',
        'three ',
        'four ',
        'five ',
        'six ',
        'seven ',
        'eight ',
        'nine ',
        'ten ',
        'eleven ',
        'twelve ',
        'thirteen ',
        'fourteen ',
        'fifteen ',
        'sixteen ',
        'seventeen ',
        'eighteen ',
        'nineteen '];

    b = [
        '',
        '',
        'twenty',
        'thirty',
        'forty',
        'fifty',
        'sixty',
        'seventy',
        'eighty',
        'ninety'];

    transform(value: any, args?: any): any {
        if (value) {

            if (value > 9999) {
                return 'Five <br> Thousand+';
            }
            if ((value / 1000) > 0) {
                const val = value / 1000;
                console.log('val: ', Number(val).toFixed());
                return this.a[Number(val).toFixed()];
            }

        } else {
            return 'Nan';
        }
    }

}
