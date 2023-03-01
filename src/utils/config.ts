// 获取项目运行环境
export const getEnv = () => {
  return process.env.NODE_ENV;
};

export const IS_DEV = getEnv() === 'development';
