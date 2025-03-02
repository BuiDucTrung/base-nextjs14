export const FIRST_NAME_PATTERN = /^[A-Za-z\s\-]+$/;
export const LAST_NAME_PATTERN = /^[A-Za-z]+$/;
export const PASSWORD_PATTERN = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\W_]{8,40}$/;
export const PASSWORD_PATTERN_CONTAIN_SEQUENCES =
	/^(?!.*(?:012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|ABC|BCD|CDE|DEF|EFG|FGH|GHI|HIJ|IJK|JKL|KLM|LMN|MNO|NOP|OPQ|PQR|QRS|RST|STU|TUV|UVW|VWX|WXY|XYZ))[a-zA-Z\d\W_]+$/;
