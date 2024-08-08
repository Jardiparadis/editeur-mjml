// Specs: https://documentation.mjml.io/#mjml-social
import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeAccordion } from './AccordionElement';

export const type = 'mj-accordion-text';

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
    editor.Components.addType(type, {
        extend: 'text',
        isComponent: isComponentType(type),

        model: {
            ...coreMjmlModel,
            defaults: {
                name: getName(editor, 'accordionText'),
                draggable: componentsToQuery(typeAccordion),
                stylable: [
                    'background-color', 'color',
                    'font-family', 'font-size', 'font-weight',
                    'letter-spacing', 'line-height',
                    'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top',
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
            attributes: {
            },

            getMjmlTemplate() {
                return {
                    start: `<mjml><mj-body><mj-column><mj-accordion><mj-accordion-element>`,
                    end: `</mj-accordion-element></mj-accordion></mj-column></mj-body></mjml>`,
                };
            },

            getTemplateFromEl(sandboxEl: any) {
                // Set class here instead of model.default.attributes to avoid grapesjs putting css in defined class
                let element = document.createElement('div');
                element.className = 'mj-accordion-content'
                element.appendChild(sandboxEl.querySelector('.mj-accordion-content'))
                return element.innerHTML;
                //return sandboxEl.querySelector('.mj-accordion-content').innerHTML;
            },

            getChildrenSelector() {
                return 'td';
            }
        },
    });
};
