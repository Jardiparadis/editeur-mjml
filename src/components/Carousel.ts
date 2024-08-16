// Specs: https://documentation.mjml.io/#mjml-wrapper
import type { Editor } from 'grapesjs';
import {componentsToQuery, getName, isComponentType, mjmlConvert} from './utils';
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
                console.log(sandboxEl.querySelector('tr').innerHTML)
                return sandboxEl.querySelector('tr').innerHTML;
            },

            getChildrenSelector() {
                return '.mj-carousel-content';
            },

            /*getTemplateFromMjml(sandboxEl, opt) {
                const mjmlTmpl = this.getMjmlTemplate();
                const innerMjml = this.getInnerMjmlTemplate();
                let mjml = '';
                if (innerMjml.start.includes('mj-carousel')) {
                    console.log('Rendering mj-carousel')
                    mjml = `
          ${mjmlTmpl.start}
            ${innerMjml.start}
              
            ${innerMjml.end}
          ${mjmlTmpl.end}`;
                }
                    // <mj-carousel-image src="https://upload.wikimedia.org/wikipedia/commons/5/53/Shadow_2752.jpg" />
                // <mj-carousel-image src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bloem_geranium_pratense_%27Galactic%27._30-05-2024_%28d.j.b.%29.jpg/1280px-Bloem_geranium_pratense_%27Galactic%27._30-05-2024_%28d.j.b.%29.jpg" />
                else {
                    mjml = `${mjmlTmpl.start}${innerMjml.start}${innerMjml.end}${mjmlTmpl.end}`;
                }

                console.log("==>", mjml)

                const htmlOutput = mjmlConvert(mjml, opt.fonts);
                let html = htmlOutput.html;
                //console.log('==>', html)
                let styleNodeHolders = document.createElement('html')
                styleNodeHolders.innerHTML = html
                html = html.replace(/<body(.*)>/, '<body>');
                let start = html.indexOf('<body>') + 6;
                let end = html.indexOf('</body>');
                html = html.substring(start, end).trim();
                sandboxEl.innerHTML = html;
                //console.log(html)
                if (innerMjml.start.includes('mj-carousel')) {
                    styleNodeHolders.querySelectorAll('style').forEach((styleNode) => {
                        //console.log(styleNode.innerHTML)
                        sandboxEl!.querySelector('tr')!.appendChild(styleNode)
                    })
                }
                //console.log(sandboxEl.innerHTML)
                //console.log(this.getTemplateFromEl(sandboxEl))
                return this.getTemplateFromEl(sandboxEl);
            },*/
        }
    });
};