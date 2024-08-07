// Specs: https://documentation.mjml.io/#mjml-social
import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeAccordion } from './Accordion';

export const type = 'mj-accordion-title';

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
    editor.Components.addType(type, {
        extend: 'text',
        isComponent: isComponentType(type),

        model: {
            ...coreMjmlModel,
            defaults: {
                name: getName(editor, 'accordionTitle'),
                draggable: false,
                stylable: [],
                'style-default': {},
                traits: [],
                attributes: {
                    class: 'mj-accordion-title'
                }
            },
        },

        view: {
            ...coreMjmlView,
            tagName: 'div',
            attributes: {},

            getMjmlTemplate() {
              const accordionTag = (this.model.closestType('mj-accordion')?.getView() as any).getInnerMjmlTemplate()
              const accordionElementTag = (this.model.closestType('mj-accordion-element')?.getView() as any).getInnerMjmlTemplate()

              if (accordionElementTag == null) {
                return {
                  start: `<mjml><mj-body><mj-column><mj-accordion><mj-accordion-element>`,
                  end: `</mj-accordion-element></mj-accordion></mj-column></mj-body></mjml>`,
                };
              }


              return {
                start: `<mjml><mj-body><mj-column>${accordionTag.start}${accordionElementTag.start}`,
                end: `${accordionElementTag.end}${accordionTag.end}</mj-column></mj-body></mjml>`,
              };
            },

            getTemplateFromEl(sandboxEl: any) {
                // console.log(sandboxEl.innerHTML)
                // console.log(sandboxEl.querySelector('.mj-accordion-title').innerHTML)
                return sandboxEl.querySelector('.mj-accordion-title').innerHTML;
            },

            getChildrenSelector() {
                // console.log("title selector")
                return 'td';
            }
        },
    });
};
