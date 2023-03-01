import developmentConfig from './development';
import productionConfig from './production';

const configs: Record<string, IConfig> = {
  development: developmentConfig,
  production: productionConfig,
};
const env = process.env.NODE_ENV || 'development';

export default configs[env];
