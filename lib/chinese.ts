/* Look for Chinese characters.
 * https://github.com/sivan/heti/blob/master/js/heti-addon.js
 */

export const getChineseCharNum = (content: string) => {
  const result = content.match(
    /[\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30fa\u30fc-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g,
  );
  return !result ? 0 : result.length;
};

export const getChineseChar = (content: string): string => {
  const result = content.match(
    /[\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30fa\u30fc-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g,
  );
  return !result ? "" : result.join("");
};
