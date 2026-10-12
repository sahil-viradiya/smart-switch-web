import { themeCss } from './index';

/** Injects the generated CSS variables. Render once, inside <head>, in the root layout. */
export function ThemeStyle() {
  return <style id="theme-tokens" dangerouslySetInnerHTML={{ __html: themeCss() }} />;
}
