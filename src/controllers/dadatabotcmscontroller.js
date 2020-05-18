const {MVLoaderBase} = require('mvloader');

class mvlDadataBotCMSController extends MVLoaderBase {
    caption = 'mvlDadataBotCMS';

    constructor (App, ...config) {
        let localDefaults = {

        };
        super(localDefaults, ...config);
        this.App = App;
    }

    async initFinish() {
        super.initFinish();
        this.Dadata = this.App.ext.handlers.mvlDadata;
    }

    findCity_act = async (ctx) => {
        let query = ctx.msg;
        let cities = [];
        let response = await this.Dadata.getCity(query);
        // console.log('QUERY: ', query, ' RESPONSE: ', response);
        for (let city of response) {
            cities.push(city.value);
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
        let response = await this.App.ext.handlers.mvlDadata.getCity(query);
        // console.log('QUERY: ', query, ' RESPONSE: ', response);

        for (let city of response) {
            if (city.value === query) {
                return true;
            }
            // if (!this.MT.empty(response[0])) {
            //     return response[0].data.region_with_type + ', ' + response[0].data.city_with_type === query;
            // }
        }
        return false;
    }

}

module.exports = mvlDadataBotCMSController;