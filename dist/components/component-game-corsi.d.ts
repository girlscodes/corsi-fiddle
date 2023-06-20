import type { Components, JSX } from "../types/components";

interface ComponentGameCorsi extends Components.ComponentGameCorsi, HTMLElement {}
export const ComponentGameCorsi: {
  prototype: ComponentGameCorsi;
  new (): ComponentGameCorsi;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
