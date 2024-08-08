// Specs: https://documentation.mjml.io/#mjml-social
import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeAccordion } from './AccordionElement';

export const type = 'mj-accordion-title';

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
    editor.Components.addType(type, {
        extend: 'text',
        isComponent: isComponentType(type),

        model: {
            ...coreMjmlModel,
            defaults: {
                name: getName(editor, 'accordionTitle'),
                draggable: componentsToQuery(typeAccordion),
                stylable: [
                    'background-color', 'color',
                    'font-family', 'font-size',
                    'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top'
                ],
                'style-default': {},
                traits: [
                    'css-class'
                ],
                attributes: {

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
                //console.log(sandboxEl.innerHTML)
                // console.log(sandboxEl.querySelector('.mj-accordion-title').innerHTML)
                // Set class here instead of model.default.attributes to avoid grapesjs putting css in defined class
                let element = document.createElement('div');
                element.className = 'mj-accordion-title'
                element.appendChild(sandboxEl.querySelector('.mj-accordion-title'))
                return element.innerHTML;
            },

            getChildrenSelector() {
                // console.log("title selector")
                return 'td';
            }
        },
    });
};
