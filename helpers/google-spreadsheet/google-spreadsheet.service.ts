import { Injectable } from '@nestjs/common';
import { getGoogleSheetsCred } from '../../configs/goggle-sheats.config';
import { ConfigService } from '@nestjs/config';
import { GoogleSpreadsheet } from 'google-spreadsheet';


@Injectable()
export class GoogleSpreadsheetService {
  private readonly documentAddress =
    'https://docs.google.com/spreadsheets/d/1oVaNe72HOowhFLOP7Eh0kv9qKF7-BQpFdoguMdLh-I4/edit#gid=0';
  private spreadsheetId = '1oVaNe72HOowhFLOP7Eh0kv9qKF7-BQpFdoguMdLh-I4';

  //

  constructor(
    private configService: ConfigService
  ) {

  }

  async readDoc() {
    const doc = new GoogleSpreadsheet(this.spreadsheetId);
    const config = getGoogleSheetsCred(this.configService)
    config.private_key = this.configService.get('GOOGLE_SHEET_PRIVATE_KEY').replace(/\\n/g, '\n');
    await doc.useServiceAccountAuth(getGoogleSheetsCred(this.configService)).catch(err=>{
      console.error('CONFIG GOOGLE', err);
    })


    await doc.loadInfo();
    await doc.updateProperties({ title: 'Test Table' })

    const sheet = await doc.sheetsByIndex[0];
    //await doc.addSheet({title:'new sheet'});
    await sheet.loadCells('A1:E10');
    console.log(sheet.cellStats)

    const c6 = sheet.getCellByA1('C1');
    c6.value = 'TEST';
    c6.note = 'This is a note';
    //
    await sheet.saveUpdatedCells();



    // client_email: this.configService.get('GOOGLE_SHEET_CLIENT_EMAIL'),
      // private_key: this.configService.get('GOOGLE_SHEET_PRIVATE_KEY')
    //})


  }


}

