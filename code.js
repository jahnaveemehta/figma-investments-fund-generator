"use strict";

const CSV_DATA = `Fund Name,Avg. Annual Returns,Start Date,End Date,Fund Provider,Description,Risk
S&P 500 Tech,+22.44%,10/11/2020,10/11/2025,iShares,Large US tech companies like Apple,High
China Fund,+22.59%,26/06/2020,26/06/2025,HSBC, Chinese companies like Alibaba,High
Blockchain & Crypto,+18.65%,28/06/2020,28/06/2025,Invesco, Global companies engaged in blockchain tech,High
NASDAQ 100,+16.08%,10/11/2020,10/11/2025,iShares, Tech focused US companies,High
Adventurous ESG Fund,+15.98%,10/11/2024,10/11/2025,BlackRock, Higher risk & ethical,Medium
Physical Gold,+15.37%,10/11/2020,10/11/2025,Invesco, Gold held in bank vaults,Medium
FTSE Global All Cap ESG,+15.31%,10/11/2022,10/11/2025,Vanguard, Global ESG companies of all sizes,High
S&P 500,+15.27%,10/11/2020,10/11/2025,Vanguard, The 500 largest US companies,High
FTSE All-World High Dividend,+14.77%,10/11/2020,10/11/2025,Vanguard, Global large mid-sized companies paying icnome,High
UK Large & Mid Cap,+14.77%,10/11/2020,10/11/2025,Legal & General,High
FTSE 100,+14.52%,10/11/2020,10/11/2025,Vanguard,High
MSCI World,+13.60%,10/11/2020,10/11/2025,iShares, Global large-mid sized companies,High
FTSE Developed World,+13.52%,10/11/2020,10/11/2025,Vanguard,High
FTSE All-World,+12.81%,10/11/2020,10/11/2025,HSBC, Global large-mid sized companies,Medium
Physical Silver,+12.85%,27/06/2020,27/06/2025,Invesco, Silver held in bank vaults,High
LifeStrategy 100%,+12.63%,10/11/2020,10/11/2025,Vanguard, 100% shares,Medium
FTSE Global All Cap,+12.18%,10/11/2020,10/11/2025,Vanguard, Global companies of all sizes,Medium
India Fund,+11.85%,10/11/2020,10/11/2025,iShares,Large mid-sized Indian companies,High
AI Fund,+11.72%,27/06/2020,27/06/2025,WisdomTree, Artificial intelligence companies like NVIDIA,High
Asia Pacific ex-Japan Fund,+11.10%,10/11/2020,10/11/2025,iShares, Regions like Taiwan, Australia,High
Europe ex-UK Fund,+11.09%,10/11/2020,10/11/2025,iShares, European comaonies excluding UK,High
S&P 600 Small-Cap,+10.36%,10/11/2020,10/11/2025,iShares, Small US companies,High
Adventurous Fund,+9.60%,10/11/2020,10/11/2025,BlackRock, Higher risk,Medium
LifeStrategy 80%,+9.49%,10/11/2020,10/11/2025,Vanguard, 80% shares,Medium
Global Small Cap,+9.41%,10/11/2020,10/11/2025,Vanguard, Global small companies,High
Automation & Robotics,+8.95%,10/11/2020,10/11/2025,iShares, Automaticion and robotics companies,High
Japan Fund,+8.49%,10/11/2020,10/11/2025,iShares, Japannese companies like Toyota,High
Global Luxury,+8.24%,27/06/2020,27/06/2025,Amundi, Tracking luxury brands like Ferrari,High
Balanced Fund,+7.50%,10/11/2020,10/11/2025,BlackRock, Moderate risk,Medium
Balanced ESG Fund,+7.28%,10/11/2022,10/11/2025,BlackRock, Moderate risk & ethical,Medium
S&P 400 Mid-Cap,+6.28%,10/11/2020,10/11/2025,State Street, Mid-sized US companies,High
FTSE Emerging Markets,+5.96%,10/11/2020,10/11/2025,Vanguard, Regions like China, India,High
Cautious Fund,+5.27%,10/11/2020,10/11/2025,BlackRock, Lower risk,Medium
Megatrends,+4.31%,27/06/2024,27/06/2025,WisdomTree, Global megatrends,High
UK Money Market Fund,+3.00%,10/11/2020,10/11/2025,BlackRock, Tracking the Bank of England cash rate,Low
LifeStrategy 40%,+3.34%,10/11/2020,10/11/2025,Vanguard, 40% shares,Medium
LifeStrategy 60%,+6.41%,10/11/2020,10/11/2025,Vanguard, 60% shares,Medium
Emerging Markets Fund,+1.82%,10/11/2020,10/11/2025,BlackRock,High
US Bond Fund,-0.58%,30/06/2020,30/06/2025,iShares, Low risk US government bonds,Low
Healthcare Innovation,-1.63%,10/11/2020,10/11/2025,iShares, Companies transforming global healthcare,High
Clean Energy,-2.93%,10/11/2020,10/11/2025,iShares, Companies powering the clean energy shift,High
Semiconductor Fund,+40.98%,10/11/2022,10/11/2025,VanEck, Top US semiconductor companies,High
Space Innovators,+65.04%,14/05/2024,14/05/2025,VanEck, Commercial space-age companies,High`;

function parseCSV(csv) {
    const rows = csv.trim().split('\n');
    const header = rows.shift(); 
    return rows.map((r) => {
        const sanitizedRow = r.replace('.High', ',High');
        const cols = sanitizedRow.split(',');
        return {
            fundName: (cols[0] || '').trim(),
            avgReturns: (cols[1] || '').trim(),
            startDate: (cols[2] || '').trim(),
            endDate: (cols[3] || '').trim(),
            fundProvider: (cols[4] || '').trim(),
            description: (cols[5] || '').trim(),
            risk: (cols[6] || '').trim() 
        };
    });
}

const allData = parseCSV(CSV_DATA);

function findDescendant(node, name) {
    if (node.name === name) return node;
    if ('children' in node) {
        for (const c of node.children) {
            const f = findDescendant(c, name);
            if (f) return f;
        }
    }
    return null;
}

function findDescendantByPredicate(node, predicate) {
    if (predicate(node)) return node;
    if ('children' in node) {
        for (const c of node.children) {
            const found = findDescendantByPredicate(c, predicate);
            if (found) return found;
        }
    }
    return null;
}

function findAllDescendantsByPredicate(node, predicate, out = []) {
    if (predicate(node)) out.push(node);
    if ('children' in node) {
        for (const c of node.children) {
            findAllDescendantsByPredicate(c, predicate, out);
        }
    }
    return out;
}

async function setText(node, name, text) {
    if (!node) return;
    const t = findDescendant(node, name);
    if (t && t.type === 'TEXT') {
        await figma.loadFontAsync(t.fontName);
        t.characters = text;
    }
}

async function findComponentByName(name) {
    const instance = figma.currentPage.findOne((n) => n.type === 'INSTANCE' && n.name === name);
    if (instance) {
        return await instance.getMainComponentAsync(); 
    }
    const comp = figma.currentPage.findOne((n) => (n.type === 'COMPONENT' || n.type === 'COMPONENT_SET') && n.name === name);
    if (comp) {
        if (comp.type === 'COMPONENT') return comp;
        if (comp.type === 'COMPONENT_SET' && comp.children.length > 0) return comp.children[0];
    }
    return null;
}

figma.showUI(__html__, { width: 320, height: 350 });

setTimeout(() => {
    figma.ui.postMessage({ type: 'init', totalItems: allData.length });
}, 100);

function configureListItemTimeline(listItem, returnPercentage) {
    try {
        const baseProps = listItem.componentProperties;
        const variantUpdates = {};
        for (const [key, def] of Object.entries(baseProps)) {
            if (def.type !== 'VARIANT') continue;
            switch (key) {
                case 'Lines': variantUpdates[key] = '2'; break;
                case 'Leading Icon': variantUpdates[key] = 'Yes'; break;
                case 'Helper Text': variantUpdates[key] = 'No'; break;
                case 'Divider': variantUpdates[key] = 'Yes'; break;
                case 'State': variantUpdates[key] = 'Enabled'; break;
                case 'Icon': variantUpdates[key] = 'Plus'; break; 
                case 'Size': variantUpdates[key] = 'Regular'; break;
                case 'Circle': variantUpdates[key] = 'Yes'; break;
                case 'Theme': variantUpdates[key] = 'WIP'; break;
                case 'Trailing Title':
                case 'Title': variantUpdates[key] = 'Yes'; break;
                case 'Trailing Status':
                case 'Status': variantUpdates[key] = 'No'; break;
                case 'Trailing Chevron':
                case 'Chevron': variantUpdates[key] = 'Yes'; break;
                case 'Trailing Return':
                case 'Return': variantUpdates[key] = 'Yes'; break;
            }
        }
        if (Object.keys(variantUpdates).length > 0) {
            listItem.setProperties(variantUpdates);
        }
    } catch (err) {
        console.log('configureListItemTimeline: error setting ListItem properties', err);
    }

    try {
        const trailingInst = listItem.findOne((n) => n.type === 'INSTANCE' && n.name === 'TrailingText');
        if (!trailingInst) return;

        const trailingProps = trailingInst.componentProperties;
        const trailingVariantUpdates = {};
        let trailingTextPropKey = null;

        for (const [key, def] of Object.entries(trailingProps)) {
            if (def.type === 'TEXT') {
                trailingTextPropKey = key;
            } else if (def.type === 'VARIANT') {
                switch (key) {
                    case 'Title': trailingVariantUpdates[key] = 'Yes'; break;
                    case 'Status': trailingVariantUpdates[key] = 'No'; break;
                    case 'Chevron': trailingVariantUpdates[key] = 'Yes'; break;
                    case 'Return': trailingVariantUpdates[key] = 'Yes'; break;
                }
            }
        }
        if (Object.keys(trailingVariantUpdates).length > 0) {
            trailingInst.setProperties(trailingVariantUpdates);
        }
        if (trailingTextPropKey) {
            trailingInst.setProperties({
                [trailingTextPropKey]: returnPercentage.replace(/^\+/, ''),
            });
        }
    } catch (err) {
        console.log('configureListItemTimeline: error configuring TrailingText', err);
    }
}

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'generate') {
        const filteredData = allData.filter(item => item.risk === msg.risk);
        const count = Math.min(msg.count, filteredData.length);
        const listType = msg.listType || 'Trailing Text';

        if (filteredData.length === 0) {
             figma.notify(`No ${msg.risk} risk funds available in the dataset.`);
             return;
        }

        if (figma.currentPage.selection.length === 0) {
            figma.notify('Select the ListGroup instance first');
            return;
        }

        const listGroup = figma.currentPage.selection[0];
        if (!('children' in listGroup) || listGroup.name !== 'ListGroup') {
            figma.notify('Please select the ListGroup instance');
            return;
        }

        let category = findDescendantByPredicate(listGroup, (n) => {
            const nl = n.name.toLowerCase();
            return nl.includes('listitem') && (nl.includes('category') || nl.includes('catergory'));
        });

        if (!category) {
            category = figma.currentPage.findOne((n) => n.type === 'INSTANCE' &&
                (n.name === 'ListItemCategory' || n.name === 'ListItemCatergory'));
        }

        let listItemComp = null;
        if (category && 'children' in category) {
            const listItemInst = category.children.find((c) => c.type === 'INSTANCE' &&
                (c.name === 'ListItem (Timeline)' || c.name.includes('ListItem')));
            if (listItemInst) listItemComp = await listItemInst.getMainComponentAsync();
        }

        if (!listItemComp) listItemComp = await findComponentByName('ListItem (Timeline)');

        let categoryComp = null;
        if (category && category.type === 'INSTANCE') categoryComp = await category.getMainComponentAsync();
        
        if (!categoryComp) categoryComp = await findComponentByName('ListItemCategory');

        if (!listItemComp) {
            figma.notify('ListItem (Timeline) component not found. Check design system.');
            return;
        }

        if (!categoryComp) {
            figma.notify('ListItemCategory component not found. Check design system.');
            return;
        }

        if (!category) {
            category = categoryComp.createInstance();
            if (listGroup.type !== 'INSTANCE') {
                try {
                    listGroup.appendChild(category);
                } catch (e) {
                    console.log("Skipping category append: Parent is an instance.", e);
                }
            }
        }

        if (listGroup.type === 'INSTANCE') {
            try {
                const lgInst = listGroup;
                if (lgInst.componentProperties && lgInst.componentProperties['List Items']) {
                    lgInst.setProperties({ 'List Items': String(count) });
                }
            } catch (e) {
                console.log('Could not set ListGroup List Items property:', e);
            }
        }

        await new Promise(r => setTimeout(r, 50)); 

        const allCategories = findAllDescendantsByPredicate(listGroup, (n) => {
            const nl = n.name.toLowerCase();
            return (n.type === 'INSTANCE' &&
                nl.includes('listitem') &&
                (nl.includes('category') || nl.includes('catergory')));
        });

        for (const cat of allCategories) {
            if (cat.type === 'INSTANCE') {
                try { cat.setProperties({ 'List Type': listType }); } catch (e) { }
            }
        }

        let itemIndex = 0;
        for (const categoryNode of allCategories) {
            if (itemIndex >= count) break;

            let categoryItems = [];
            if ('children' in categoryNode) {
                categoryItems = categoryNode.children.filter((n) => n.type === 'INSTANCE' &&
                    (n.name === 'ListItem (Timeline)' || n.name.toLowerCase().includes('listitem')));
            }

            if (categoryItems.length === 0) {
                categoryItems = findAllDescendantsByPredicate(categoryNode, (n) => {
                    return (n.type === 'INSTANCE' &&
                        (n.name === 'ListItem (Timeline)' || n.name.toLowerCase().includes('listitem')));
                });
            }

            if (categoryItems.length > 0) {
                const itemsNeededThisCategory = count - itemIndex;
                const itemsToClone = itemsNeededThisCategory - categoryItems.length;
                
                const template = categoryItems[0];
                const parent = template.parent;

                if (itemsToClone > 0 && parent && parent.type !== 'INSTANCE') {
                    for (let k = 0; k < itemsToClone; k++) {
                        try {
                            const clone = template.clone();
                            parent.appendChild(clone);
                            categoryItems.push(clone);
                        } catch (e) {
                            console.log("Could not clone:", e);
                        }
                    }
                }
            }

            for (let i = 0; i < categoryItems.length && itemIndex < count; i++, itemIndex++) {
                const d = filteredData[itemIndex]; 
                const inst = categoryItems[i];

                if(!d) continue; 

                if (inst && inst.type === 'INSTANCE') {
                    configureListItemTimeline(inst, d.avgReturns || '');
                }

                await setText(inst, 'Title', d.fundName);
                await setText(inst, 'Description', d.description || '');

                const start = new Date(d.startDate.split('/').reverse().join('-'));
                const end = new Date(d.endDate.split('/').reverse().join('-'));
                const years = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365));
                const aarLabel = `${years} yr AAR`;

                await setText(inst, 'Default', aarLabel);

                // ==========================================
                // BRAND NEW LOGIC: Swap the logo!
                // ==========================================
                const iconInstance = findDescendant(inst, 'Icons');
                if (iconInstance && iconInstance.type === 'INSTANCE') {
                    
                    let providerName = d.fundProvider;
                    
                    // Failsafe for the typo in the design system!
                    if (providerName === 'Vanguard') {
                        providerName = 'Vangaurd';
                    }

                    // Look for exactly "ProviderName, Regular" based on your screenshot
                    const targetComponentName = `${providerName}, Regular`;
                    const logoComponent = await findComponentByName(targetComponentName);

                    if (logoComponent) {
                        try {
                            iconInstance.swapComponent(logoComponent);
                        } catch (e) {
                            console.log(`Error swapping component to ${targetComponentName}`, e);
                        }
                    } else {
                        console.log(`Could not find a logo component named "${targetComponentName}" in the file.`);
                    }
                }
                // ==========================================

                const trailingInst = findDescendant(inst, 'TrailingText');
                if (trailingInst) {
                    await setText(trailingInst, 'Return', aarLabel);
                }

                const divider = findDescendant(inst, 'Divider');
                if (divider && 'visible' in divider) {
                    divider.visible = itemIndex < count - 1;
                }
            }
        }
        figma.notify(`Successfully populated ${count} ${msg.risk}-risk items!`);
    }
    
    if (msg.type === 'cancel') figma.closePlugin();
};