// Specs: https://documentation.mjml.io/#mj-image
import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeSection } from './Section';
import { type as typeColumn } from './Column';
import { type as typeHero } from './Hero';

export const type = 'mj-image';

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
  editor.Components.addType(type, {
    isComponent: isComponentType(type),
    extend: 'image',
    model: {
      ...coreMjmlModel,
      defaults: {
        resizable: false,
        highlightable: false,
        name: getName(editor, 'image'),
        draggable: componentsToQuery([typeSection, typeColumn, typeHero]),
        stylable: [
          'width', 'height',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
          'border', 'border-width', 'border-style', 'border-color',
          'border-top', 'border-width-top', 'border-style-top', 'border-color-top',
          'border-bottom', 'border-width-bottom', 'border-style-bottom', 'border-color-bottom',
          'border-left', 'border-width-left', 'border-style-left', 'border-color-left',
          'border-right', 'border-width-right', 'border-style-right', 'border-color-right',
          'container-background-color', 'align', 'name', 'target'
        ],
        'style-default': {
          'padding-top': '10px',
          'padding-bottom': '10px',
          'padding-right': '25px',
          'padding-left': '25px',
          'align': 'center',
        },
        traits: [
          'href',
          'rel',
          'alt',
          'title',
          'name',
          {
            type: 'checkbox',
            label: 'Fluid on mobile',
            name: 'fluid-on-mobile',
            valueTrue: 'true', //TODO should be boolean but follows the rules in Editeur:Checkbox.vue l6
            valueFalse: 'false',
          }
        ],
        void: false,
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'tr',
      attributes: {
        style: 'pointer-events: all; display: table; width: 100%; user-select: none;',
      },

      getMjmlTemplate() {
        return {
          start: `<mjml><mj-body width="auto"><mj-column>`,
          end: `</mj-column></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl: any) {
        return sandboxEl.querySelector('tr').innerHTML;
      },

      getChildrenSelector() {
        return 'img';
      },
    },
  });
};
