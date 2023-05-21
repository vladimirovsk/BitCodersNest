import { Module } from '@nestjs/common';
// import { GoogleSheetModule } from 'nest-google-sheet-connector';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getGoogleSheetsCred } from '../../configs/goggle-sheats.config';
import { GoogleSpreadsheetService } from './google-spreadsheet.service';

@Module({
  imports: [
    ConfigModule,
  ],
  // imports: [
  //   GoogleSheetModule.registerAsync({
  //     imports: [ConfigModule],
  //     inject: [ConfigService],
  //     useFactory: getGoogleSheetsCred,
  //   }),
  // ],
  providers: [GoogleSpreadsheetService],
  exports: [GoogleSpreadsheetService],
})
export class GoogleSpreadsheetModule {}
