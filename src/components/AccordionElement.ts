// Specs: https://documentation.mjml.io/#mjml-social
import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeAccordion } from './Accordion';

export const type = 'mj-accordion-element';

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
    editor.Components.addType(type, {
        isComponent: isComponentType(type),

        model: {
            ...coreMjmlModel,
            defaults: {
                name: getName(editor, 'accordionElement'),
                draggable: componentsToQuery(typeAccordion),
                stylable: [],
                'style-default': {},
                traits: [],
            },
        },

        view: {
            ...coreMjmlView,
            tagName: 'tr',
            attributes: {
            },

            getMjmlTemplate() {
                return {
                    start: `<mjml><mj-body><mj-column><mj-accordion>`,
                    end: `</mj-accordion></mj-column></mj-body></mjml>`,
                };
            },

            getTemplateFromEl(sandboxEl: any) {
                console.log(sandboxEl.innerHTML)
                console.log(sandboxEl.querySelector('tr > td > table > tbody > tr').innerHTML)
                return sandboxEl.querySelector('tr > td > table > tbody > tr').innerHTML;
            },

            getChildrenSelector() {
                console.log(this.el.innerHTML)
                console.log(this.el.querySelector('div'))
                return 'div';
            }
        },
    });
};
