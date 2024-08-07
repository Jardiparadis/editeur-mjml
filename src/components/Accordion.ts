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
                stylable: [
                    'border', 'border-width', 'border-style', 'border-default', 'container-background-color',
                    'font-family', 'icon-align', 'icon-height', 'icon-position', 'icon-unwrapped-alt',
                    'icon-unwrapped-url', 'icon-width', 'icon-wrapped-alt', 'icon-wrapped-url',
                    'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top'
                ],
                'style-default': {},
                traits: [
                    'css-class',
                    'icon-unwrapped-alt',
                    'icon-unwrapped-url',
                    'icon-wrapped-alt',
                    'icon-wrapped-url'
                ],
                //Add accordion CSS manually to allow sandbox to simulate its behavior
                styles: `
                    noinput.mj-accordion-checkbox {
                        display: block !important;
                    }

                    @media yahoo,
                    only screen and (min-width:0) {
                        .mj-accordion-element {
                            display: block;
                        }

                        input.mj-accordion-checkbox,
                        .mj-accordion-less {
                            display: none !important;
                        }

                        input.mj-accordion-checkbox+* .mj-accordion-title {
                            cursor: pointer;
                            touch-action: manipulation;
                            -webkit-user-select: none;
                            -moz-user-select: none;
                            user-select: none;
                        }

                        input.mj-accordion-checkbox+* .mj-accordion-content {
                            overflow: hidden;
                            display: none;
                        }

                        input.mj-accordion-checkbox+* .mj-accordion-more {
                            display: block !important;
                        }

                        input.mj-accordion-checkbox:checked+* .mj-accordion-content {
                            display: block;
                        }

                        input.mj-accordion-checkbox:checked+* .mj-accordion-more {
                            display: none !important;
                        }

                        input.mj-accordion-checkbox:checked+* .mj-accordion-less {
                            display: block !important;
                        }
                    }

                    .moz-text-html input.mj-accordion-checkbox+* .mj-accordion-title {
                        cursor: auto;
                        touch-action: auto;
                        -webkit-user-select: auto;
                        -moz-user-select: auto;
                        user-select: auto;
                    }

                    .moz-text-html input.mj-accordion-checkbox+* .mj-accordion-content {
                        overflow: hidden;
                        display: block;
                    }

                    .moz-text-html input.mj-accordion-checkbox+* .mj-accordion-ico {
                        display: none;
                    }

                    @goodbye {
                        @gmail
                    }
                `
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
                console.log(sandboxEl)
                return sandboxEl.querySelector('tr').innerHTML;
            },

            getChildrenSelector() {
                return 'tbody';
            }
        }
    });
};
