import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'contact-list',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
