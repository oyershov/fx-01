import { Global, css } from "@emotion/react";
import 'flexlayout-react/style/light.css';

/**
 * Global theme for FlexLayout – injected **inside** FlexLayoutHost so App-level
 * components remain oblivious to implementation details.
 */
export function FlexLayoutThemeDefault(): React.ReactElement {
  return (
    <Global
      styles={css`
        /* Reset browser body margin so layout fills full viewport */
        body {
          margin: 0;
        }
        .flexlayout__tabset,
        .flexlayout__tab,
        .flexlayout__border,
        .flexlayout__tab_button,
        .flexlayout__border_button,
        .flexlayout__border_tab {
          background: #0f172a;
          color: #f8fafc;
        }
        .flexlayout__splitter {
          background: #334155;
        }
        .flexlayout__drag_rect,
        .flexlayout__edge_rect {
          border: 2px solid #38bdf8;
        }
      `}
    />
  );
}
