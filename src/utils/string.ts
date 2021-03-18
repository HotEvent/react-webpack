export function isSplitSymbol(char: string) {
    /**
     * 匹配一个空白字符，包括空格、制表符、换页符和换行符。等价于[ \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]。
     */
    if (char.match(/\s/)) {
        return true;
    } else {
        return false;
    }
}