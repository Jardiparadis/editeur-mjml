// Specs: https://documentation.mjml.io/#mjml-social
import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeColumn } from './Column';
import { type as typeHero } from './Hero';
import { type as typeAccordionElement } from './AccordionElement';
import type {type as typeSocialElement} from "./SocialElement";

export const type = 'mj-accordion';

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
    editor.Components.addType(type, {
        isComponent: isComponentType(type),

        model: {
            ...coreMjmlModel,
            defaults: {
                name: getName(editor, 'accordion'),
                draggable: componentsToQuery([typeColumn]),
                droppable: componentsToQuery(typeAccordionElement),
                stylable: [],
                'style-default': {},
                traits: [],
            },
        },

        view: {
            ...coreMjmlView,
            tagName: 'tr',
            attributes: {},

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
                return 'tbody';
            }
        }
    });
};
