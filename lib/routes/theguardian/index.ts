import { Route } from '@/types';
import ofetch from '@/utils/ofetch';
import cache from '@/utils/cache';
import parser from '@/utils/rss-parser';
import { load } from 'cheerio';

export const route: Route = {
    path: '/:edition',
    categories: ['traditional-media'],
    example: '/us',
    parameters: { edition: 'Edition code. Can be `international`, `au`, `europe`, `uk`, or `us`. Default: `international`' },
    name: 'News',
    maintainers: ['canonnizq'],
    handler
}
    
async function handler(ctx) {
    let feed, title, link;
    const { edition = 'international' } = ctx.req.param();

    title = `The Guardian ${edition.toUpperCase()}`;
    feed = await ()

    const items = await Promise.all(
        list.map((item) => 
            cache.tryGet(item.link, async () => {
                const response = await ofetch(`https://www.theguardian.com/${edition}`);
                const $ = load(response);

                return item;
            })
        )
    );

    return {
        title,
        link,
        image: 'https://www.theguardian.com/favicon.ico',
        description: title,
        item: items,
    };
};
    