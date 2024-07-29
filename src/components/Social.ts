// Specs: https://documentation.mjml.io/#mjml-social
import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeColumn } from './Column';
import { type as typeHero } from './Hero';
import { type as typeSocialElement } from './SocialElement';

export const type = 'mj-social';

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
  editor.Components.addType(type, {
    isComponent: isComponentType(type),

    model: {
      ...coreMjmlModel,
      defaults: {
        name: getName(editor, 'socialGroup'),
        draggable: componentsToQuery([typeColumn, typeHero]),
        droppable: componentsToQuery(typeSocialElement),
        stylable: [
          'align', 'color', 'container-background-color',
          'font-family', 'font-size', 'font-style', 'font-weight',
          'icon-height', 'icon-size', 'icon-padding',
          'line-height', 'text-padding', 'text-decoration',
          'icon-padding', 'icon-padding-top', 'icon-padding-left', 'icon-padding-right', 'icon-padding-bottom',
          'inner-padding', 'inner-padding-top', 'inner-padding-left', 'inner-padding-right', 'inner-padding-bottom',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
          //TODO css-class
        ],
        'style-default': {
          'align': 'center',
          'icon-size': '20px',
          'font-size': '13px',
          'line-height': '22px',
        },
        traits: [
          {
            type: 'select',
            label: 'Mode',
            name: 'mode',
            options: [
              { id: 'horizontal', label: 'Horizontal' },
              { id: 'vertical'  , label: 'Vertical'   }
            ]
          },
          'css-class'
        ],
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'tr',
      attributes: {
        style: 'display: table; width: 100%',
      },

      getMjmlTemplate() {
        return {
          start: `<mjml><mj-body><mj-column>`,
          end: `</mj-column></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl: any) {
        return sandboxEl.querySelector('tr').innerHTML;
      },

      getChildrenSelector() {
        return 'td';
      },

      rerender() {
        coreMjmlView.rerender.call(this);
        this.model.components().models.forEach((item: any) => {
          if (item.attributes.type !== typeSocialElement) {
            return;
          }
          item.view.rerender();
        });
      },

      init() {
        coreMjmlView.init.call(this);
        this.listenTo(this.model.get('components'), 'add remove update', this.render);
      },
    }
  });
};
