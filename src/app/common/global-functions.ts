import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Router } from "@angular/router";
//mport moment, { Moment } from "moment";


export class GlobalFunctions {

  constructor() { }

  /**
 * 
 * @param date The date to format
 * @param format The format type
 * @param time the time of the date in string
 * @param formatTime time format type
 * 
 * This funtion return the date format by the type send to the function.
 * The type format must be:
 *   dd-MM-yyyy
 *   dd/MM/yyyy
 *   mm-DD-yyyy
 *   mm/DD/yyyy
 *   yyyy-MM-dd
 *   yyyy/MM/dd
 * 
 * The time format type must be:
 * 
 *   HH:mm:ss
 *   HH:mm 
 */
  static formatDate(date: Date, format: string, time: boolean = false, formatTime: string | null = null): string {
    const symbols = ["-", "/", ":"];
    let dateTimeString = date.toISOString().split("T");
    //console.log(dateTimeString);    
    let stringDate = dateTimeString[0].split("-");
    //console.log(stringDate);    
    let stringTime = dateTimeString[1].substring(0, 8).split(":");
    let formatStringDate: string = "";
    let formatStringTime: string = "";
    for (let symbol of symbols) {
      if (format.includes(symbol)) {
        let format_array = format.split(symbol);
        for (let i = 0; i < format_array.length; i++) {
          if (formatStringDate != "") {
            formatStringDate += symbol;
          }
          let currentFormat = format_array[i];
          if (currentFormat.includes("d") || currentFormat.includes("D")) {
            formatStringDate += stringDate[2].length > 1 ? stringDate[2] : `0${stringDate[2]}`;
          } else if (currentFormat.includes("M") || currentFormat.includes("m")) {
            formatStringDate += stringDate[1].length > 1 ? stringDate[1] : `0${stringDate[1]}`;
          } else {
            formatStringDate += stringDate[0];
          }
        }
      }
    }
    if (time) {
      for (let symbol of symbols) {
        if (formatTime != null) {
          if (formatTime.includes(symbol)) {
            let format_array = formatTime.split(symbol);
            for (let i = 0; i < format_array.length; i++) {
              if (formatStringTime != "") {
                formatStringTime += symbol;
              }
              let currentFormat = format_array[i];
              if (currentFormat.includes("H") || currentFormat.includes("h")) {
                formatStringTime += stringTime[0].length > 1 ? `${parseInt(stringTime[0]) + 1}` : `${(parseInt(stringTime[0]) + 1).toString().length > 1 ? (parseInt(stringTime[0]) + 1) : "0" + (parseInt(stringTime[0]) + 1)}`;
              } else if (currentFormat.includes("M") || currentFormat.includes("m")) {
                formatStringTime += stringTime[1].length > 1 ? stringTime[1] : `0${stringTime[1]}`;
              } else {
                formatStringTime += stringTime[2].length > 1 ? stringTime[1] : `0${stringTime[2]}`;
              }
            }
          }
        }
      }
    }

    return `${formatStringDate} ${formatStringTime}`.trim();
  }

  /**
   * 
   * @param date you can pass any date
   * @returns it returns the time string example: "12:15" (hour:minutes)
   * 
   * this function get the time by the date passed and return the formatted string.
   */
  static getTime(date: Date): string {
    let minutes = date.getMinutes();
    let hour = date.getHours();
    return `${hour.toString().length < 2 ? "0" + hour : hour}:${minutes.toString().length < 2 ? '0' + minutes : minutes}`;
  }

  /**
   * 
   * @param date the date to compare example the birth day
   * @param age the age to compare. For example check the time between now and a determinate date.
   * @returns true or false.
   */


  static validateDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      //console.log("validate", control.value);
      let value: any = control.value;
      if (value != '' && value != null && value != undefined && value.toString().includes("/")) {
        let sections: string[] = control.value.toString().split("/");
        if (sections.length == 3 || sections.length < 3 && sections.length > 0) {
          for (let section of sections) {
            let n = Number.parseInt(section);
            if (n != NaN) {
              switch (sections.indexOf(section)) {
                case 0:
                  if (n <= 31) {
                    break;
                  } else {
                    return { "validateDate": false, section: "day" };
                  }
                case 1:
                  if (n <= 12) {
                    break;
                  } else {
                    return { "validateDate": false, section: "month" };
                  }
                case 2:
                  if (n <= new Date().getFullYear()) {
                    break;
                  } else {
                    return { "validateDate": false, section: "year" };
                  }
                default:
                  return null;
              }
            } else {
              return { "validateDate": false };
            }
          }
          return null;
        } else {
          return { "validateDate": false, length: sections.length };
        }
      } else {
        return null;
      }
    }
  }

  /**
   * 
   * @returns true or false
   * 
   * This function return if the user is admin or not.
   */
  /* static isAdmin():boolean|null{
    var scope = this.cookie.get('scope');
    if(scope != undefined){
      return scope.includes('admin');
    }else{
      return null;
    }
     
  } */

  /**
   * 
   * @param startDate Meaning the start of the reservation
   * @param endDate Meaning the end of the reservation
   * 
   * this function return the range of the start and the end of the reservation in minutes.
   */
  static getPeriod(startDate: string, endDate: string): any {
    let start = new Date(startDate);
    let end = new Date(endDate);

    let period = (end.getTime() - start.getTime()) / (1000 * 60);
    
    return period;
  }
  static isExpired(checkDate: string, matchDate: string | null = null): boolean {
    let date = new Date(checkDate);
    return date.getTime() < (matchDate != null ? new Date(matchDate).getTime() : new Date().getTime()) ? false : true;
  }

  /**
   * Function to add slash to dates and to prevent date longer than 10 characters
   * 
   * @param value is the value of the form control
   * @param formControl is the control of the form 
   */
  static slashingDate(input: HTMLInputElement, event: any, formControl?: AbstractControl) {

    let value = input.value;
    let lastChar = event.key;
    //console.log("Value length start ==> ", value.length);
    if (lastChar != 'Backspace') {
      if (value.length == 2 || value.length == 5 || value.length == 3 || value.length == 6) {
        if (lastChar == '/') {
          if (value.length == 2 || value.length == 5) {
            input.value = value.slice(0, value.length - 2) + "0" + value.slice(0 + value.length - 2);
          }
        } else {
          if ((value.length == 3 || value.length == 6) && value[value.length - 1] != "/") {
            input.value = `${value.substring(0, value.length == 3 ? 2 : 5)}/${value[value.length - 1]}`;
          }
          if (value.length == 2 || value.length == 5) {
            //console.log('add slash')
            input.value = `${value}/`;
          }
        }
      } else {
        if (value[value.length - 1] == '/') {
          if (lastChar == '/') {
            input.value = value.substring(0, value.length - 1);
          }
        }
        if (value.length == 10) {
          let dateParts = value.split("/");
          let dateObject = new Date(+dateParts[2], (parseInt(dateParts[1]) - 1), +dateParts[0]);
          if(formControl != null && formControl != undefined){
            formControl.patchValue(dateObject);
          }
          
        } else if (value.length > 10) {
          input.value = value.substring(0, value.length - 1);
        }
      }
    } else {
      //console.log("Value length backspace", value.length);
      let lastCharValue = value[value.length - 1];
      if (lastCharValue == '/') {
        input.value = value.substring(0, value.length - 1);
      }
    }
  }

  static capitalize(value: string, onlyFirst: boolean = true): string {
    //console.log("VALUE CAPITALIZE => ", value);
    if (onlyFirst) {
      if (value != '') {
        return value.length > 1 ? `${value[0].toUpperCase()}${value.substring(1, value.length)}` : value.toUpperCase();
      } else {
        return value;
      }
    }
    else {
      return value.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    }

  }
  /**
   * 
   * @param form  the object formGroup
   * @array  formGroup's keys.object with two param {name:"formControlName",type:"type"}  type can be one
   * of these: "eachWord","all","firstLetter","none"
   * 
   */
  static setFormatText(form: FormGroup, keys: any) {
    keys.forEach((el: any) => {
      switch (el.type) {
        case "eachWord":
          form.controls[el.name].valueChanges.subscribe(data => {
            form.controls[el.name].setValue(GlobalFunctions.capitalize(data, false), { emitEvent: false })
          })
          break;
        case "firstLetter":
          form.controls[el.name].valueChanges.subscribe(data => {
            form.controls[el.name].setValue(GlobalFunctions.capitalize(data), { emitEvent: false })
          })
          break;
        case "all":
          form.controls[el.name].valueChanges.subscribe(data => {
            form.controls[el.name].setValue(data.toUpperCase(), { emitEvent: false })
          })
          break;
        case "none":
          break;
        default:
          break;
      }
    })

  }

  static getStatusReservation(status: any, type: string): string {
    switch (type) {
      case 'payment':
        return status == true ? "Effettuato" : "Non Effettuato";
      case 'drive':
        return status == true ? "Effettuata" : "Non Effettuata";
      default:
        return '';
    }
  }

  static setPlaceholder(formGroup: FormGroup | null, control: string, placeholder?: string): string {
    if (FormGroup != null) {
      return formGroup?.controls[control].value;
    } else {
      if (placeholder != undefined) {
        return placeholder;
      } else {
        return "";
      }
    }
  }

  /* static isRedirect(router:Router):boolean{
    let navigation = new GlobalNavigation();
    navigation.setParmas();
    if(!navigation.Navigation.paths[0].includes('home') && navigation.Navigation.paths.findIndex(p => p.includes('home')) == -1 ){
      return true;
    }else{
      return false;
    }
  } */
}

/* export enum IconActivityType{
  esame = 'text_snippet',
  guida = 'drive_eta'
}

export enum IconStatusReservation{
  null = 'remove',
  true = 'done',
  false = 'close'
*/