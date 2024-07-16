import English from "@GG-element/locale/lang/en";
import { configProviderContextKey, type ConfigProviderContext } from "./constants";

import {
	computed,
	getCurrentInstance,
	inject,
	provide,
	ref,
	unref,
	type App,
	type MaybeRef,
	type Ref,
} from "vue";
import { debugWarn } from "@GG-element/utils";
import { merge } from "lodash-es";
import { createI18n, i18nSymbol } from "vue3-i18n";
import type { TranslatePair } from "@GG-element/locale";

const globalConfig = ref<ConfigProviderContext>();

export function useGlobalConfig<
	K extends keyof ConfigProviderContext,
	D extends ConfigProviderContext[K],
>(key: K, defaultValue?: D): Ref<Exclude<ConfigProviderContext[K], void>>;

export function useGlobalConfig(): Ref<ConfigProviderContext>;
export function useGlobalConfig(key?: keyof ConfigProviderContext, defaultValue = void 0) {
	const config = getCurrentInstance()
		? inject(configProviderContextKey, globalConfig)
		: globalConfig;

	return key ? computed(() => config.value?.[key] ?? defaultValue) : config;
}

/**
 * 注入国际化配置
 * @param config 配置项
 * @param app
 * @param global
 * @returns
 */
export function provideGlobalConfig(
	config: MaybeRef<ConfigProviderContext> = { locale: English },
	app?: App,
	global = false
) {
	const insetup = !!getCurrentInstance();
	//app.use 注册全局的 configProvider组件注册
	const oldCfg = insetup ? useGlobalConfig() : void 0;
	const provideFn = app?.provide ?? (insetup ? provide : void 0);

	if (!provideFn) {
		debugWarn("provideGlobalConfig", "请在setup中调用");
		return;
	}

	const context = computed(() => {
		const cfg = unref(config);
		if (!oldCfg?.value) return cfg;
		return merge(oldCfg.value, cfg);
	});
	const i18n = computed(() => _createI18n(context.value));

	// const context = ref(unref(config));
	// watch(
	// 	() => config,
	// 	(val) => {
	// 		const cfg = unref(val);
	// 		if (!oldCfg?.value) return cfg;
	// 		context.value = merge(oldCfg.value, cfg);
	// 	},
	// 	{ deep: true }
	// );

	// const i18n = ref(_createI18n(context.value));
	// watch(
	// 	() => context.value,
	// 	(val) => (i18n.value = _createI18n(val)),
	// 	{ deep: true }
	// );

	console.log("i18n", i18n);

	provideFn(configProviderContextKey, context);
	provideFn(i18nSymbol, i18n);

	if (app) app.use(i18n.value);
	if (global || !globalConfig.value) globalConfig.value = context.value;

	return context;
}

function _createI18n(opts: ConfigProviderContext) {
	const merageMessage = (msg: TranslatePair) => merge(msg, opts.extendsI18nMsg ?? {});

	if (!opts.locale) {
		return createI18n({
			locale: "en",
			messages: merageMessage({
				en: English.el,
			}),
		});
	}

	return createI18n({
		locale: opts.locale.name,
		messages: merageMessage({
			en: English.el,
			[opts.locale.name]: opts.locale.el ?? {},
		}),
	});
}
