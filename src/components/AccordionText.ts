// Specs: https://documentation.mjml.io/#mjml-social
import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeAccordion } from './Accordion';

export const type = 'mj-accordion-text';

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
    editor.Components.addType(type, {
        extend: 'text',
        isComponent: isComponentType(type),

        model: {
            ...coreMjmlModel,
            defaults: {
                name: getName(editor, 'accordionText'),
                draggable: false,
                stylable: [],
                'style-default': {},
                traits: [],
                attributes: {
                    class: 'mj-accordion-content'
                }
            },
        },

        view: {
            ...coreMjmlView,
            tagName: 'div',
            attributes: {
            },

            getMjmlTemplate() {
                return {
                    start: `<mjml><mj-body><mj-column><mj-accordion><mj-accordion-element>`,
                    end: `</mj-accordion-element></mj-accordion></mj-column></mj-body></mjml>`,
                };
            },

            getTemplateFromEl(sandboxEl: any) {
                console.log(sandboxEl.innerHTML)
                console.log(sandboxEl.querySelector('.mj-accordion-content').innerHTML)
                return sandboxEl.querySelector('.mj-accordion-content').innerHTML;
            },

            getChildrenSelector() {
                return 'td';
            }
        },
    });
};
