export enum CodeEnum {
  /**
   * 成功
   */
  Success = 0,
  /**
   * 错误
   */
  Fail = 1,
  /**
   * 无token
   */
  NoToken = 10001,
  /**
   * token错误
   */
  TokenError = 10002,
}

/** 错误的code文字描述 */
export const CodeMessage = {
  [CodeEnum.Success]: '操作成功',
  [CodeEnum.Fail]: '操作失败',
  [CodeEnum.NoToken]: '你还没登录,请先登录',
  [CodeEnum.TokenError]: '传递的token错误',
};
