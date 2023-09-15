import { Injectable, Logger } from '@nestjs/common';
import { getGoogleSheetsCred } from '../../configs/goggle-sheats.config';
import { ConfigService } from '@nestjs/config';
import { GoogleSpreadsheet } from 'google-spreadsheet';


@Injectable()
export class GoogleSpreadsheetService {
  private logger = new Logger(GoogleSpreadsheetService.name);

  private readonly documentAddress =
    //'https://docs.google.com/spreadsheets/d/1oVaNe72HOowhFLOP7Eh0kv9qKF7-BQpFdoguMdLh-I4/edit#gid=0';
    'https://docs.google.com/spreadsheets/d/1CujqJoBATHfOI1ZdjCAaHas2AN-XQqh2RXMWrWiB2jQ/edit#gid=0';
  private spreadsheetId = '1CujqJoBATHfOI1ZdjCAaHas2AN-XQqh2RXMWrWiB2jQ';

  //

  constructor(
    private configService: ConfigService
  ) {

  }

  async createDoc() {
    // const doc = new GoogleSpreadsheet(this.spreadsheetId);
    // return doc;
  }

  async readDoc() {
    // const doc = new GoogleSpreadsheet(this.spreadsheetId);
    // const config = getGoogleSheetsCred(this.configService)
    // config.private_key = this.configService.get('GOOGLE_SHEET_PRIVATE_KEY').replace(/\\n/g, '\n');
    // await doc.useServiceAccountAuth(getGoogleSheetsCred(this.configService)).catch(err=>{
    //   console.error('CONFIG GOOGLE', err);
    // })
    //
    // const info = await doc.loadInfo();
    // this.logger.log(JSON.stringify(info));

    //await doc.updateProperties({ title: 'Test Table' })
    //const sheet = await doc.sheetsByIndex[0];
    //await doc.addSheet({title:'new sheet'});
    //await sheet.loadCells('A1:E10');
    //console.log(sheet.cellStats)

    //const c6 = sheet.getCellByA1('C1');
    //c6.value = 'TEST';
    //c6.note = 'This is a note';
    //
    //await sheet.saveUpdatedCells();



    // client_email: this.configService.get('GOOGLE_SHEET_CLIENT_EMAIL'),
      // private_key: this.configService.get('GOOGLE_SHEET_PRIVATE_KEY')
    //})


  }


}

