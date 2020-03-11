const {MVLoaderBase} = require('mvloader');
const DaData = require('dadata-suggestions');

class mvlDadataHandler extends MVLoaderBase {

    static exportConfig = {
        ext: {
            classes: {
                controllers: {
                    mvlDadataBotCMS: require('../controllers/dadatabotcmscontroller'),
                }
            }
        }
    };

    constructor (App, ...config) {
        let localDefaults = {
            apiKey: '',
            secretKey: '',
            limit: 10,
        };
        super(localDefaults, ...config);
        this.App = App;
    }

    async init() {
        return super.init();
    }

    async initFinish() {
        super.initFinish();
    }

    async get (method, query) {
        console.log('DADATA HANDLER. GET. ARGUMENTS: ', arguments);
        let dadata = new DaData(this.config.apiKey, this.config.secretKey);
        if (typeof query === 'string') {
            query = {query};
        }
        query.count = query.count || this.config.limit;
        console.log('DADATA HANDLER. GET. QUERY: ', query);

        return dadata[method](query)
            .then((data) => data.suggestions)
            .catch(e => {console.error; return []});
    }

    async getAddress (query) {
        return this.get('address', query);
    }

}

module.exports = mvlDadataHandler;