/** 状态枚举类型 */
export enum StatusEnum {
  /** 禁用 */
  Forbidden = 0,
  /** 正常 */
  Normal = 1,
}

/** 状态描素 */
export const StatusMessage = {
  [StatusEnum.Forbidden]: '禁用',
  [StatusEnum.Normal]: '正常',
};
