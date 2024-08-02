// Specs: https://documentation.mjml.io/#mjml-wrapper
import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import {type as typeColumn} from "./Column";
import {type as typeHero} from "./Hero";
import {type as typeCarousel} from "./Carousel"

export const type = 'mj-carousel-image';

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
    editor.Components.addType(type, {
        isComponent: isComponentType(type),

        model: {
            ...coreMjmlModel,
            defaults: {
                name: getName(editor, 'carousel'),
                draggable: componentsToQuery(typeCarousel),
            },
        },

        view: {
            ...coreMjmlView,
            tagName: 'div',
            attributes: {
                style: '',
            },

            getMjmlTemplate() {
                console.log("########## CAROUSEL ITEM ############")
                return {
                    start: `<mjml><mj-body><mj-column><mj-carousel>`,
                    end: `</mj-carousel></mj-column></mj-body></mjml>`,
                };
            },

            getChildrenSelector() {
                return 'input';
            },
        }
    });
};