const {MVLoaderBase} = require('mvloader');

class mvlDadataBotCMSController extends MVLoaderBase {
    caption = 'mvlDadataBotCMS';

    constructor (App, ...config) {
        let localDefaults = {

        };
        super(localDefaults, ...config);
        this.App = App;
    }

    findCity_act = async (ctx) => {
        let query = ctx.msg;
        let queryLow = query.toLowerCase();
        let cities = [];
        let response = await this.App.ext.handlers.mvlDadata.getAddress(query);
        console.log('QUERY: ', query, ' RESPONSE: ', response);
        for (let city of response) {
            if (city.data.city_with_type === null) {
                continue;
            }
            let cityName = city.data.region_with_type + ', ' + city.data.city_with_type;
            if (cityName.toLowerCase().indexOf(queryLow) !== -1 && cities.indexOf(cityName) === -1) {
                cities.push(cityName);
            }
        }
        let parcel = new this.App.ext.handlers.BotHandler.Bot.config.classes.Parcel();
        parcel.message = ctx.lexicon('common.msg.cityChooseFromListOrEnter');
        let kb = new this.App.ext.handlers.BotHandler.Bot.config.classes.Keyboard(ctx);
        for (let name of cities) {
            kb.addBtn(name);
        }
        parcel.keyboard = kb.addBtnMenuMain().build();
        ctx.reply(parcel);
    };

    findCity_vld = async (ctx) => {
        let query = ctx.msg;
        let queryLow = query.toLowerCase();
        let cities = [];
        let response = await this.App.ext.handlers.mvlDadata.getAddress(query);
        console.log('QUERY: ', query, ' RESPONSE: ', response);

        if (!this.MT.empty(response[0])) {
            return response[0].data.region_with_type + ', ' + response[0].data.city_with_type === query;
        }
        return false;
    }

}

module.exports = mvlDadataBotCMSController;