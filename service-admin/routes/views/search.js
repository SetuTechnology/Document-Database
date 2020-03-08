module.exports = async (req, res) => {
    // res.setCookie('abc','abc')
    if(req.query.search) res.send(await getSearchResult(req.query.search, '', req.query.page||1));
    else res.redirect('/');
};

async function getSearchResult(keyword, engine, page){
    // console.log('hi');
    // console.log('ser',services.searchService);
    let data = await services.searchService.search(keyword,engine,page).catch((err) => {
        console.log('error', err);
        return new Error('error occured')});
    // let data = [];
    data.phoneNumber = await services.advCampaignService.getAdvCampaign(keyword).catch((err)=> {console.log(err);});
    data.custom_search_results = await services.customSearchService.getCustomSearchResult(keyword).catch((err)=> {console.log(err);});

    return data;
}
