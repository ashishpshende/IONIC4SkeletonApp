import * as moment from "moment-timezone";
export class HelperService {

    static EmptyJSON(){
      return  JSON.parse("{}")
  }
  getUUID() {
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
    static getLocalDate(date: Date | string, format?: string) {

      var localZone = moment.tz.guess();
      if (format) {
        if (moment(date).isValid()) {
          return moment.utc(date).tz(localZone).format(format);
        }
      }
      else {
        if (moment(date).isValid()) {
          return moment.utc(date).tz(localZone);
        }
      }
      return date;
    }
    static  currencyToSymbol(currencyName:string)
    {
      switch(currencyName)
      {
        case "USD": return '$';
                    break;
        case "SGD": return 'S$';
                    break;
        case "INR": return '₹';
                    break;
        case "AUD": return '$';
                    break;
        case "BRL": return 'R$';
                    break;
        case "CAD": return '$';
                    break;
        case "CHF": return '₣';
                    break;
        case "EUR": return '€';
                    break;
        case "HKD": return '$';
                    break;
        case "IDR": return 'Rp';
                    break;
        case "IQD": return 'ع.د	';
                    break;
        case "JPY": return '¥';
                    break;
        case "KWD": return 'د.ك';
                    break;
        case "LKR": return 'Rs';
                    break;
        case "MXN": return '$';
                    break;
        case "NZD": return '$';
                    break;
        case "RUB": return 'р.';
                    break; 
        case "SEK": return 'kr';
                    break;
        case "XAF": return '₣';
                    break;
        case "ZWL": return '$';
                    break;
        case "ZAR": return 'R';
                    break;                                                            
        default:   return '$';
                    break;
      }
    }
}
