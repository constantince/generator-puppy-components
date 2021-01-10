/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare namespace JSX {
  interface FragmentProperty { Fragment: {}; }
}

interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}
