// Specs: https://documentation.mjml.io/#mjml-wrapper
import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import {type as typeColumn} from "./Column";
import {type as typeHero} from "./Hero";
import {type as typeCarouselImage} from "./Carouselmage"

export const type = 'mj-carousel';

// Component seems to not render correctly in browser / mail reader,
// event with generated HTML from the official MJML editor

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
    editor.Components.addType(type, {
        isComponent: isComponentType(type),
        model: {
            ...coreMjmlModel,
            defaults: {
                name: getName(editor, 'carousel'),
                draggable: componentsToQuery([typeColumn, typeHero]),
                droppable: componentsToQuery(typeCarouselImage),
                'style-default': {},
            },
        },

        view: {
            ...coreMjmlView,
            tagName: 'tr',
            attributes: {
                style: `width: 100%; height: 100px;`,
            },

            /**
             * Where to render component as is it alone in a mjml document
             */
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
        }
    });
};