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
                stylable: [
                    'background-color', 'font-family',
                    'icon-align', 'icon-height', 'icon-position', 'icon-width',
                    'border', 'border', 'border-width', 'border-style', 'border-color',
                ],
                'style-default': {},
                traits: [
                    'css-class',
                    'icon-unwrapped-alt',
                    'icon-unwrapped-url',
                    'icon-wrapped-alt',
                    'icon-wrapped-url'
                ],
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
                return sandboxEl.querySelector('tr > td > table > tbody > tr').innerHTML;
            },

            getChildrenSelector() {
                return 'div';
            }
        },
    });
};
