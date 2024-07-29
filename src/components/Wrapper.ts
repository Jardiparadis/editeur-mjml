// Specs: https://documentation.mjml.io/#mjml-wrapper
import type { Editor } from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeBody } from './Body';
import { type as typeSection } from './Section';

export const type = 'mj-wrapper';

export default (editor: Editor, { coreMjmlModel, coreMjmlView }: any) => {
    editor.Components.addType(type, {
        isComponent: isComponentType(type),

        model: {
            ...coreMjmlModel,
            defaults: {
                name: getName(editor, 'wrapper'),
                draggable: componentsToQuery(typeBody),
                droppable: componentsToQuery(typeSection),
                stylable: [
                  'background-color', 'background-repeat', 'background-size', 'background-url',
                  'background-position', 'background-position-x', 'background-position-y',
                  'border', 'border-width', 'border-style', 'border-color', 'border-radius',
                  'border-top', 'border-width-top', 'border-style-top', 'border-color-top',
                  'border-bottom', 'border-width-bottom', 'border-style-bottom', 'border-color-bottom',
                  'border-left', 'border-width-left', 'border-style-left', 'border-color-left',
                  'border-right', 'border-width-right', 'border-style-right', 'border-color-right',
                  'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius',
                  'border-bottom-right-radius',
                  'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
                  'text-align'
                  //TODO background-position, x, y, repeat, size
                ],
                traits:[
                    'id',
                    'title',
                    {
                        type: 'checkbox',
                        label: 'Full width',
                        name: 'full-width',
                        valueTrue: 'full-width',
                        valueFalse: '',
                    },
                    'background-url',
                    'css-class'
                ],
                styles: `.wrapper-default-height { height: 100px; }`,
                'attributes': {
                    class: 'wrapper-default-height'
                }
            },

        },

        view: {
            ...coreMjmlView,
            tagName: 'div',
            attributes: {
                style: 'pointer-events: all; display: table; width: 100%',
            },

            getMjmlTemplate() {
                return {
                    start: `<mjml><mj-body>`,
                    end: `</mj-body></mjml>`,
                };
            },

            getChildrenSelector() {
                if(this.model.getAttributes()['full-width']){
                    return 'table > tbody > tr > td > div > table > tbody > tr > td';
                }else
                    return 'table > tbody > tr > td';
            },

            init() {
                coreMjmlView.init.call(this);
                this.listenTo(this.model.get('components'), 'add remove', () => {
                    this.getChildrenContainer().innerHTML = this.model.get('content')!;
                    this.renderChildren();
                });
            },
        }
    });
};