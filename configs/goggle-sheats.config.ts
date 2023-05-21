import { ConfigService } from '@nestjs/config';
import GoogleSheetConnectorDto from 'nest-google-sheet-connector/dist/dto/google-sheet-connector.dto';

export const getGoogleSheetsCred = (
  configService: ConfigService,
): GoogleSheetConnectorDto => {
  return {
    type: 'service_account',
    project_id: 'bitcoders',
    private_key_id: String(
      configService.get<string>('GOOGLE__SHEET_PRIVATE_KEY_ID'),
    ),
    private_key: String(configService.get('GOOGLE_SHEET_PRIVATE_KEY')),
    client_email: String(configService.get('GOOGLE_SHEET_CLIENT_EMAIL')),
    client_id: String(configService.get('GOOGLE_SHEET_CLIENT_ID')),
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/developer-user%40bitcoders.iam.gserviceaccount.com',
  };
};
