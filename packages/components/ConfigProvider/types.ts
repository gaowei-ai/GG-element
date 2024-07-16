import type { Language, TranslatePair } from "@GG-element/locale";

export interface ConfigProviderProps {
	locale?: Language;
	/**
	 * 扩展国际化的字段
	 */
	extendsI18nMsg?: TranslatePair;
}
