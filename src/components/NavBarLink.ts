// Specs: https://documentation.mjml.io/#mj-navbar-link
import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeNavBar } from './NavBar';

export const type = 'mj-navbar-link';

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
  editor.Components.addType(type, {
    isComponent: isComponentType(type),
    extend: 'link',
    model: {
      ...coreMjmlModel,
      defaults: {
        name: getName(editor, 'navLink'),
        draggable: componentsToQuery(typeNavBar),
        highlightable: false,
        stylable: [
          'color', 'font-family', 'font-size', 'font-style', 'font-weight',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'text-decoration', 'text-transform', 'letter-spacing', 'line-height'
          //TODO rel
        ],
        'style-default': {
          'font-size': '13px',
          'padding-top': '25px',
          'padding-bottom': '25px',
          'padding-left': '10px',
          'padding-right': '10px',
          'text-transform': 'uppercase',
        },
        traits: [
          'href',
          {
            id: 'target',
            type: 'select',
            label: 'Target',
            name: 'target',
            default: '_blank',
            options: [
              { id: '_blank', label: 'Blank' },
              { id: '_self', label: 'Self' },
              { id: '_parent', label: 'Parent' },
              { id: '_top', label: 'Top' },
            ],
          },
          'css-class'
        ],
      },
    },


    view: {
      ...coreMjmlView,
      tagName: 'a',
      attributes: {
        style: 'float: none; display: inline-table;',
      },

      getMjmlTemplate() {
        let parentView = this.model.parent()?.view;
        // @ts-ignore
        if (parentView?.getInnerMjmlTemplate) {
          let mjmlNavBar = coreMjmlView.getInnerMjmlTemplate.call(parentView);
          return {
            start: `<mjml><mj-body><mj-column>${mjmlNavBar.start}`,
            end: `${mjmlNavBar.end}</mj-column></mj-body></mjml>`,
          };
        } else {
          return {
            start: `<mjml><mj-body><mj-column><mj-navbar>`,
            end: `</mj-navbar></mj-column></mj-body></mjml>`,
          };
        }
      },

      /**
       * #305 prevent content repeating
       */
      rerender() {
        this.render();
      },

      getTemplateFromEl(sandboxEl: any) {
        return sandboxEl.querySelector('div').innerHTML;
      },

      getChildrenSelector() {
        return 'a,p';
      },
    },
  });
};
